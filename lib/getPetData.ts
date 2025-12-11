import { databases, users, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from './appwrite';
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

export interface UserContactData {
  phone?: string;
  membership?: string;
  showContact?: boolean;
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

// Helper function to get user contact data from Appwrite auth table
async function getUserContactData(userId: string): Promise<UserContactData> {
  try {
    const user = await users.get(userId);

    // Get user preferences (key-value pairs)
    const prefs = user.prefs || {};

    // Extract membership and showContact from preferences
    const membership = prefs.membership as string | undefined;
    const showContact_value = prefs.showContact as string | undefined;

    // Convert showContact to boolean (only "1" means true)
    const showContact = showContact_value === "1";

    // DEBUG: Log the values
    console.log('=== DEBUG: User Contact Data ===');
    console.log('userId:', userId);
    console.log('user.phone:', user.phone);
    console.log('prefs.membership:', membership);
    console.log('prefs.showContact:', showContact_value);
    console.log('showContact (converted):', showContact);
    console.log('================================');

    // Return all contact data
    return {
      phone: user.phone || undefined,
      membership,
      showContact
    };
  } catch (error) {
    console.error('Error fetching user contact data from Appwrite:', error);
    // Return safe defaults if fetch fails
    return {
      phone: undefined,
      membership: undefined,
      showContact: false
    };
  }
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

    // Fetch user contact data from auth table
    const userContactData = await getUserContactData(doc.userId);

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
      userId: doc.userId,
      ownerPhone: userContactData.phone,
      membership: userContactData.membership,
      showContact: userContactData.showContact
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

    // Fetch user contact data from auth table
    const userContactData = await getUserContactData(doc.userId);

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
      userId: doc.userId,
      ownerPhone: userContactData.phone,
      membership: userContactData.membership,
      showContact: userContactData.showContact
    };

    return { pet };
  } catch (error) {
    console.error('Error fetching pet data from Appwrite:', error);
    return null;
  }
}
