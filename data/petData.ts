import { Pet, Owner } from "@/types/pet";

// AIBO - Default demo pet (accessible via ?param=AIBO)
export const aiboInfo: Pet = {
  name: "Aibo",
  species: "Dog",
  breed: "Robotic Companion",
  age: 2,
  gender: "Male",
  color: "White & Silver",
  weight: "2.2 kg",
  description: "Aibo is an intelligent robotic dog companion that brings joy and entertainment to any household. With advanced AI capabilities and adorable behaviors, Aibo responds to touch, voice commands, and loves to play.",
  personality: [
    "Intelligent and responsive",
    "Loves to play and entertain",
    "Learns new tricks",
    "Low maintenance",
    "Great for all ages"
  ],
  medicalInfo: "No medical needs. Requires regular charging and software updates.",
  imageUrls: [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=800&fit=crop"
  ],
  petType: "dog"
};

export const aiboOwner: Owner = {
  name: "Demo Owner",
  email: "demo@petmicrosite.com",
  phone: "+1 (555) 000-0000",
  address: "123 Demo Street, Tech City, TC 00000",
  preferredContact: "Email"
};

// Luna - Sample pet data (kept for backward compatibility)
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
  imageUrls: [
    "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=800&h=800&fit=crop"
  ],
  petType: "dog"
};

export const ownerInfo: Owner = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Pet Street, Pet City, PC 12345",
  preferredContact: "Email"
};
