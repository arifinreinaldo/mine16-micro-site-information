import { Pet, Owner } from "@/types/pet";

export const petInfo: Pet = {
  name: "Luna",
  species: "Dog",
  breed: "Golden Retriever",
  age: 3,
  gender: "Female",
  color: "Golden",
  weight: "28 kg",
  description: "Luna is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. She's great with kids and other pets, making her the perfect family companion.",
  personality: [
    "Friendly and social",
    "Loves to play fetch",
    "Great with children",
    "Well-trained",
    "Energetic and playful"
  ],
  medicalInfo: "Up to date on all vaccinations. Spayed. Regular vet check-ups.",
  imageUrl: "/pet-image.jpg"
};

export const ownerInfo: Owner = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Pet Street, Pet City, PC 12345",
  preferredContact: "Email"
};
