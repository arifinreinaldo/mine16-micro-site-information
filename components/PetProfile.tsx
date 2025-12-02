import { Pet } from "@/types/pet";
import Image from "next/image";

interface PetProfileProps {
  pet: Pet;
}

export default function PetProfile({ pet }: PetProfileProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{pet.name}</h1>
          <p className="text-xl opacity-90">{pet.breed} • {pet.species}</p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pet Image */}
            <div className="flex justify-center items-start">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-6xl">🐕</div>
              </div>
            </div>

            {/* Pet Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">About {pet.name}</h2>
                <p className="text-gray-600 leading-relaxed">{pet.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="text-lg font-semibold text-gray-800">{pet.age} years</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="text-lg font-semibold text-gray-800">{pet.gender}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Color</p>
                  <p className="text-lg font-semibold text-gray-800">{pet.color}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Weight</p>
                  <p className="text-lg font-semibold text-gray-800">{pet.weight}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personality Traits */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Personality Traits</h3>
            <div className="flex flex-wrap gap-2">
              {pet.personality.map((trait, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Medical Info */}
          {pet.medicalInfo && (
            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold mb-2 text-green-900 flex items-center gap-2">
                <span>🏥</span>
                Medical Information
              </h3>
              <p className="text-green-800">{pet.medicalInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
