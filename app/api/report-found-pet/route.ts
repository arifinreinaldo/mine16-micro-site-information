import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const FOUND_PETS_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const FOUND_PETS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID || "";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS_PER_WINDOW = 3; // Maximum 3 submissions per 15 minutes

// In-memory store for rate limiting (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((timestamps, ip) => {
    const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  });
}, 60000); // Clean up every minute

function getClientIP(request: NextRequest): string {
  // Try to get real IP from various headers (useful behind proxies/CDNs)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip'); // Cloudflare

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfIP) {
    return cfIP;
  }

  // Fallback
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps outside the time window
  const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  return false;
}

export async function POST(request: NextRequest) {
  // Rate limiting check
  const clientIP = getClientIP(request);

  if (isRateLimited(clientIP)) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 60000) // Return minutes
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW / 1000)), // Seconds
          'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
          'X-RateLimit-Remaining': '0',
        }
      }
    );
  }

  try {
    const body = await request.json();
    const { petId, petName, finderName, finderPhone, message } = body;

    // Validate required fields
    if (!petId || !petName || !finderName || !finderPhone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create document in Appwrite
    const document = await databases.createDocument(
      FOUND_PETS_DATABASE_ID,
      FOUND_PETS_COLLECTION_ID,
      ID.unique(),
      {
        petID: petId,
        petName,
        finderName,
        finderPhone,
        message,
        status: "pending",
        reportedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json(
      { success: true, documentId: document.$id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating found pet report:", error);
    return NextResponse.json(
      { error: "Failed to submit report" },
      { status: 500 }
    );
  }
}
