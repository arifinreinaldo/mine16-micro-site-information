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
}

export interface Owner {
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferredContact: string;
}
