import { Pet } from "@/types/pet";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel";

interface PetProfileProps {
  pet: Pet;
}

export default function PetProfile({ pet }: PetProfileProps) {
  // Determine avatar based on petType
  const getAvatar = () => {
    switch (pet.petType) {
      case 'dog':
        return '🐕';
      case 'cat':
        return '🐈';
      case 'bird':
        return '🦜';
      case 'other':
        return '🐾';
      default:
        return '🐕'; // Default to dog
    }
  };

  // Get images array
  const images = pet.imageUrls || [];
  const hasImages = images.length > 0;

  // Parse personality from comma-separated string
  const personalityTraits = pet.personality
    ? pet.personality.split(',').map(trait => trait.trim()).filter(Boolean)
    : [];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="border-b border-gray-200 p-8 bg-white">
          <div className="flex items-baseline gap-3">
            <h1 className="text-4xl font-bold text-gray-900">{pet.name}</h1>
            <span className="text-lg text-gray-500">•</span>
            <p className="text-lg text-gray-600">{pet.breed}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pet Image or Emoji Avatar */}
            <div className="md:col-span-1">
              {hasImages ? (
                <ImageCarousel images={images} petName={pet.name} />
              ) : (
                <div className="relative w-full aspect-square border border-gray-200 bg-gray-50 flex items-center justify-center">
                  <div className="text-8xl opacity-30">{getAvatar()}</div>
                </div>
              )}
            </div>

            {/* Pet Details */}
            <div className="md:col-span-2 space-y-8">
              {/* About Section - Only show if description exists */}
              {pet.description && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">About</h2>
                  <p className="text-gray-700 leading-relaxed text-base">{pet.description}</p>
                </div>
              )}

              {/* Details Section - Only show if at least one detail exists */}
              {(pet.age || pet.gender || pet.color || pet.weight || pet.microchip) && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Details</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {pet.age && (
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="text-base font-medium text-gray-900 mt-1">{pet.age} years</p>
                      </div>
                    )}
                    {pet.gender && (
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="text-base font-medium text-gray-900 mt-1">{pet.gender}</p>
                      </div>
                    )}
                    {pet.color && (
                      <div>
                        <p className="text-sm text-gray-500">Color</p>
                        <p className="text-base font-medium text-gray-900 mt-1">{pet.color}</p>
                      </div>
                    )}
                    {pet.weight && (
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="text-base font-medium text-gray-900 mt-1">{pet.weight}</p>
                      </div>
                    )}
                    {pet.microchip && (
                      <div>
                        <p className="text-sm text-gray-500">Microchip ID</p>
                        <p className="text-base font-medium text-gray-900 mt-1">{pet.microchip}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Personality Traits - Only show if personality has items */}
              {personalityTraits.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Personality</h3>
                  <ul className="space-y-2">
                    {personalityTraits.map((trait, index) => (
                      <li key={index} className="text-base text-gray-700 flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Medical Info - Only show if exists */}
              {pet.medicalInfo && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Medical Information</h3>
                  <p className="text-base text-gray-700 leading-relaxed">{pet.medicalInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
