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

  // Parse personality - handle both string and array formats from Appwrite
  const personalityTraits = (() => {
    if (!pet.personality) return [];

    // If it's already an array, use it directly
    if (Array.isArray(pet.personality)) {
      return pet.personality.filter(Boolean);
    }

    // If it's a string, split by comma
    if (typeof pet.personality === 'string') {
      return pet.personality.split(',').map(trait => trait.trim()).filter(Boolean);
    }

    return [];
  })();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl border-2 border-orange-100 shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className={`border-b-2 p-8 ${pet.membership === "pro" ? "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-purple-100" : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100"}`}>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className={`text-4xl font-bold tracking-tight ${pet.membership === "pro" ? "text-purple-900" : "text-orange-900"}`}>
              Meet {pet.name}! {getAvatar()}
            </h1>
          </div>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {pet.membership === "pro" && (
              <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-200 shadow-sm">
                <span className="text-lg">✨</span>
                <span className="text-xs font-medium text-purple-700">Verified Member</span>
              </div>
            )}
            <div className={`inline-flex items-center gap-2 ${pet.membership === "pro" ? "bg-white/60" : "bg-white/80"} backdrop-blur-sm px-4 py-1.5 rounded-full border ${pet.membership === "pro" ? "border-purple-200" : "border-orange-200"} shadow-sm`}>
              <span className="text-base font-medium text-gray-700">{pet.breed}</span>
            </div>
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
                <div className="relative w-full aspect-square rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center shadow-md">
                  <div className="text-9xl animate-bounce-soft">{getAvatar()}</div>
                </div>
              )}
            </div>

            {/* Pet Details */}
            <div className="md:col-span-2 space-y-8">
              {/* About Section - Only show if description exists */}
              {pet.description && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-orange-100">
                  <h2 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    About {pet.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base">{pet.description}</p>
                </div>
              )}

              {/* Details Section - Only show if at least one detail exists */}
              {(pet.age || pet.gender || pet.color || pet.weight || pet.microchip) && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                  <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    Quick Facts
                  </h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {pet.age && (
                      <div className="bg-white/60 rounded-xl p-3 border border-blue-100">
                        <p className="text-sm text-blue-600 font-medium mb-1">🎂 Age</p>
                        <p className="text-base font-semibold text-gray-800">{pet.age} years</p>
                      </div>
                    )}
                    {pet.gender && (
                      <div className="bg-white/60 rounded-xl p-3 border border-blue-100">
                        <p className="text-sm text-blue-600 font-medium mb-1">⚧ Gender</p>
                        <p className="text-base font-semibold text-gray-800">{pet.gender}</p>
                      </div>
                    )}
                    {pet.color && (
                      <div className="bg-white/60 rounded-xl p-3 border border-blue-100">
                        <p className="text-sm text-blue-600 font-medium mb-1">🎨 Color</p>
                        <p className="text-base font-semibold text-gray-800">{pet.color}</p>
                      </div>
                    )}
                    {pet.weight && (
                      <div className="bg-white/60 rounded-xl p-3 border border-blue-100">
                        <p className="text-sm text-blue-600 font-medium mb-1">⚖️ Weight</p>
                        <p className="text-base font-semibold text-gray-800">{pet.weight}</p>
                      </div>
                    )}
                    {pet.microchip && (
                      <div className="bg-white/60 rounded-xl p-3 border border-blue-100 col-span-2">
                        <p className="text-sm text-blue-600 font-medium mb-1">🔖 Microchip ID</p>
                        <p className="text-base font-semibold text-gray-800 font-mono">{pet.microchip}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Personality Traits - Only show if personality has items */}
              {personalityTraits.length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                  <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    What makes {pet.name} special
                  </h3>
                  <ul className="space-y-3">
                    {personalityTraits.map((trait, index) => (
                      <li key={index} className="text-base text-gray-700 flex items-start bg-white/60 rounded-xl p-3 border border-purple-100">
                        <span className="text-purple-500 mr-3 text-xl">💜</span>
                        <span className="font-medium">{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Medical Info - Only show if exists */}
              {pet.medicalInfo && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
                  <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                    <span className="text-2xl">💚</span>
                    Health Information
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed bg-white/60 rounded-xl p-4 border border-green-100">{pet.medicalInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
