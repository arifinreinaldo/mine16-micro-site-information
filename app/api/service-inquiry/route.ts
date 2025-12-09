import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { createHash } from "crypto";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const SERVICE_INQUIRIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SERVICE_INQUIRIES_COLLECTION_ID || "";

// Rate limiting (server-side only, no client fingerprinting)
const RATE_LIMIT_WINDOW = 30 * 60 * 1000; // 30 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, number[]>();

// Clean up old entries
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((timestamps, key) => {
    const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, validTimestamps);
    }
  });
}, 60000);

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip');

  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP;
  if (cfIP) return cfIP;

  return 'unknown';
}

function createAntiSpamHash(ip: string, userAgent: string): string {
  // Create hash for anti-spam (server-side only, GDPR-compliant)
  return createHash('sha256')
    .update(`${ip}-${userAgent}`)
    .digest('hex')
    .substring(0, 16);
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) || [];
  const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(key, recentTimestamps);
  return false;
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Rate limiting check
  if (isRateLimited(clientIP)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in 30 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const {
      petId,
      petName,
      serviceType,
      inquirerName,
      inquirerEmail,
      inquirerPhone,
      message,
      location
    } = body;

    // Validate required fields
    if (!petId || !petName || !serviceType || !inquirerName || !inquirerEmail || !inquirerPhone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create anti-spam hash (server-side only for security)
    const antiSpamHash = createAntiSpamHash(clientIP, userAgent);

    // Create document in Appwrite
    const document = await databases.createDocument(
      DATABASE_ID,
      SERVICE_INQUIRIES_COLLECTION_ID,
      ID.unique(),
      {
        petId,
        petName,
        serviceType,
        inquirerName,
        inquirerEmail,
        inquirerPhone,
        message,
        location: location || "",
        status: "pending",
        createdAt: new Date().toISOString(),
        _antiSpamHash: antiSpamHash, // Hidden field for abuse prevention
      }
    );

    return NextResponse.json(
      { success: true, inquiryId: document.$id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating service inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
