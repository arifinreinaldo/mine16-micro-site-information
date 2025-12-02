import { databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from './appwrite';
import { Pet, Owner } from '@/types/pet';

export interface AppwritePetDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  // Pet fields
  petName: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  color: string;
  weight: string;
  description: string;
  personality: string[] | string; // Can be array or comma-separated string
  medicalInfo?: string;
  imageUrl?: string;
  // Owner fields
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAddress?: string;
  preferredContact: string;
}

export interface PetDataResponse {
  pet: Pet;
  owner: Owner;
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

    // Parse personality if it's a string
    let personality: string[] = [];
    if (typeof doc.personality === 'string') {
      try {
        personality = JSON.parse(doc.personality);
      } catch {
        personality = doc.personality.split(',').map(p => p.trim());
      }
    } else {
      personality = doc.personality;
    }

    // Transform Appwrite document to our Pet and Owner types
    const pet: Pet = {
      name: doc.petName,
      species: doc.species,
      breed: doc.breed,
      age: doc.age,
      gender: doc.gender,
      color: doc.color,
      weight: doc.weight,
      description: doc.description,
      personality: personality,
      medicalInfo: doc.medicalInfo,
      imageUrl: doc.imageUrl || '/pet-image.jpg'
    };

    const owner: Owner = {
      name: doc.ownerName,
      email: doc.ownerEmail,
      phone: doc.ownerPhone,
      address: doc.ownerAddress,
      preferredContact: doc.preferredContact
    };

    return { pet, owner };
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

    // Parse personality if it's a string
    let personality: string[] = [];
    if (typeof doc.personality === 'string') {
      try {
        personality = JSON.parse(doc.personality);
      } catch {
        personality = doc.personality.split(',').map(p => p.trim());
      }
    } else {
      personality = doc.personality;
    }

    // Transform Appwrite document to our Pet and Owner types
    const pet: Pet = {
      name: doc.petName,
      species: doc.species,
      breed: doc.breed,
      age: doc.age,
      gender: doc.gender,
      color: doc.color,
      weight: doc.weight,
      description: doc.description,
      personality: personality,
      medicalInfo: doc.medicalInfo,
      imageUrl: doc.imageUrl || '/pet-image.jpg'
    };

    const owner: Owner = {
      name: doc.ownerName,
      email: doc.ownerEmail,
      phone: doc.ownerPhone,
      address: doc.ownerAddress,
      preferredContact: doc.preferredContact
    };

    return { pet, owner };
  } catch (error) {
    console.error('Error fetching pet data from Appwrite:', error);
    return null;
  }
}
