import { databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from './appwrite';
import { Pet } from '@/types/pet';

export interface AppwritePetDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  // Pet fields
  petName: string;
  breed: string;
  age?: string;
  gender?: string;
  color?: string;
  weight?: string;
  description?: string;
  personality?: string | string[]; // Can be string or array from Appwrite
  medicalInfo?: string;
  microchip?: string; // Microchip ID number
  imageUrls: string[] | string; // Array of image URLs or JSON stringified array
  petType: 'dog' | 'cat' | 'bird' | 'other'; // Required
  userId: string; // Required - from user auth
}

export interface PetDataResponse {
  pet: Pet;
}

// Helper function to parse imageUrls from Appwrite
function parseImageUrls(doc: AppwritePetDocument): string[] {
  if (Array.isArray(doc.imageUrls)) {
    return doc.imageUrls;
  }
  // If it's a string, try to parse as JSON
  if (typeof doc.imageUrls === 'string') {
    try {
      const parsed = JSON.parse(doc.imageUrls);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // If JSON parse fails, treat as comma-separated
      return doc.imageUrls.split(',').map(url => url.trim()).filter(url => url);
    }
  }
  // Return empty array if no valid imageUrls
  return [];
}

export async function getPetDataByCode(code: string): Promise<PetDataResponse | null> {
  try {
    // Query Appwrite database for the document with matching code
    const response = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      [
        // You can use Appwrite queries here
        // Example: Query.equal('code', code)
      ]
    );

    // If no documents found, return null
    if (response.documents.length === 0) {
      return null;
    }

    // Get the first matching document
    const doc = response.documents[0] as unknown as AppwritePetDocument;

    // Transform Appwrite document to our Pet type
    const pet: Pet = {
      name: doc.petName,
      breed: doc.breed,
      age: doc.age,
      gender: doc.gender,
      color: doc.color,
      weight: doc.weight,
      description: doc.description,
      personality: doc.personality,
      medicalInfo: doc.medicalInfo,
      microchip: doc.microchip,
      imageUrls: parseImageUrls(doc),
      petType: doc.petType,
      userId: doc.userId
    };

    return { pet };
  } catch (error) {
    console.error('Error fetching pet data from Appwrite:', error);
    return null;
  }
}

export async function getPetDataById(documentId: string): Promise<PetDataResponse | null> {
  try {
    // Get document by ID
    const doc = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      documentId
    ) as unknown as AppwritePetDocument;

    // Transform Appwrite document to our Pet type
    const pet: Pet = {
      name: doc.petName,
      breed: doc.breed,
      age: doc.age,
      gender: doc.gender,
      color: doc.color,
      weight: doc.weight,
      description: doc.description,
      personality: doc.personality,
      medicalInfo: doc.medicalInfo,
      microchip: doc.microchip,
      imageUrls: parseImageUrls(doc),
      petType: doc.petType,
      userId: doc.userId
    };

    return { pet };
  } catch (error) {
    console.error('Error fetching pet data from Appwrite:', error);
    return null;
  }
}
