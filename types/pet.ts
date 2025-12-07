export interface Pet {
  name: string;
  breed: string;
  age?: string; // Optional string
  gender?: string;
  color?: string;
  weight?: string;
  description?: string;
  personality?: string | string[]; // Can be comma-separated string OR array from Appwrite
  medicalInfo?: string;
  microchip?: string; // Microchip ID number
  imageUrls: string[]; // Array of image URLs for carousel
  petType: 'dog' | 'cat' | 'bird' | 'other'; // Required, determines avatar
  userId: string; // Required - from user auth
}
