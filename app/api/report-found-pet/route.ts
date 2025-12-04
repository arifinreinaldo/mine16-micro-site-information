import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const FOUND_PETS_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
const FOUND_PETS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FOUND_PETS_COLLECTION_ID || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { petId, petName, finderName, finderEmail, finderPhone, location, message } = body;

    // Validate required fields
    if (!petId || !petName || !finderName || !finderEmail || !finderPhone || !location) {
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
        petId,
        petName,
        finderName,
        finderEmail,
        finderPhone,
        location,
        message: message || "",
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
