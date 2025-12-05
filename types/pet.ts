export interface Pet {
  name: string;
  breed: string;
  age?: string; // Changed to optional string
  gender?: string;
  color?: string;
  weight?: string;
  description?: string;
  personality?: string; // Changed to optional string (comma-separated)
  medicalInfo?: string;
  microchip?: string; // Microchip ID number
  imageUrls: string[]; // Array of image URLs for carousel
  petType: 'dog' | 'cat' | 'bird' | 'other'; // Required, added 'bird' option
  userId: string; // Required - from user auth
}
