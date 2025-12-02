export interface Pet {
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  color: string;
  weight: string;
  description: string;
  personality: string[];
  medicalInfo?: string;
  imageUrl: string;
  petType?: 'dog' | 'cat' | 'other'; // Determines default avatar
}

export interface Owner {
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferredContact: string;
}
