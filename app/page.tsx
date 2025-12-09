import PetProfile from "@/components/PetProfile";
import FoundPetForm from "@/components/FoundPetForm";
import { aiboInfo } from "@/data/petData";
import { getPetDataById } from "@/lib/getPetData";
import type { Metadata } from "next";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const params = await searchParams;
  const petId = params.param as string | undefined;

  // No parameter provided
  if (!petId) {
    return {
      title: "Pet Information Hub",
      description: "Your trusted pet profile and contact resource.",
    };
  }

  // AIBO demo mode
  if (petId.toUpperCase() === 'AIBO') {
    return {
      title: `Pet Information Hub | ${aiboInfo.name}'s Profile`,
      description: `Welcome to ${aiboInfo.name}'s pet profile. Get to know our ${aiboInfo.breed} and find owner contact information.`,
      keywords: ["pet", "dog", aiboInfo.breed.toLowerCase(), "pet profile", "contact owner"],
    };
  }

  // Fetch real pet data
  const data = await getPetDataById(petId);

  // Pet not found
  if (!data) {
    return {
      title: "Pet Not Found | Pet Information Hub",
      description: "The requested pet profile could not be found.",
    };
  }

  // Dynamic metadata for the pet
  const { pet } = data;
  return {
    title: `Pet Information Hub | ${pet.name}'s Profile`,
    description: `Welcome to ${pet.name}'s pet profile. Get to know our ${pet.breed} and find owner contact information.`,
    keywords: ["pet", pet.petType.toLowerCase(), pet.breed.toLowerCase(), "pet profile", "contact owner"],
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const petId = params.param as string | undefined;

  // Show "no data" message if no parameter is provided
  if (!petId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Pet Information Hub
            </h1>
            <p className="text-gray-600 mt-1 text-sm">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white border border-gray-200 shadow-sm p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Pet ID Provided</h2>
            <p className="text-gray-600 mb-6">
              No pet ID parameter found in the URL.
            </p>
            <p className="text-gray-500 text-sm mb-4">
              To view a pet profile, please use a URL with the pet ID parameter:
            </p>
            <div className="bg-gray-50 border border-gray-200 p-4 mb-6 inline-block">
              <code className="text-sm text-gray-700 font-mono">
                https://your-domain.com/?param=YOUR_PET_ID
              </code>
            </div>
            <p className="text-gray-500 text-sm mb-3">
              Contact the pet owner to get the correct link.
            </p>
            <p className="text-gray-900 text-sm font-medium">
              Try the demo: <a href="/?param=AIBO" className="underline hover:text-gray-600">?param=AIBO</a>
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <a
              href="/terms-privacy"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Terms & Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    );
  }

  // Check if this is the AIBO demo
  if (petId.toUpperCase() === 'AIBO') {
    const pet = aiboInfo;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Pet Information Hub
            </h1>
            <p className="text-gray-600 mt-1 text-sm">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12 pb-16">
          <div className="mb-6 bg-amber-50 border border-amber-200 p-4 text-center">
            <p className="text-amber-900 text-sm">
              <span className="font-semibold">Demo Mode:</span> You're viewing the default Aibo profile.
              This is sample data to demonstrate the microsite features.
            </p>
          </div>
          <PetProfile pet={pet} />
          <FoundPetForm petId="AIBO" petName={pet.name} />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <a
              href="/terms-privacy"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Terms & Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    );
  }

  // Fetch data from Appwrite
  const data = await getPetDataById(petId);

  // If pet not found, show error message
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Pet Information Hub
            </h1>
            <p className="text-gray-600 mt-1 text-sm">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white border border-gray-200 shadow-sm p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Pet Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find a pet with the ID: <span className="font-mono font-semibold text-gray-900">{petId}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Please check the ID and try again, or contact the pet owner for the correct link.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <a
              href="/terms-privacy"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Terms & Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    );
  }

  const { pet } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Pet Information Hub
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Your trusted pet profile and contact resource</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-16">
        <PetProfile pet={pet} />
        <FoundPetForm petId={petId} petName={pet.name} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <a
            href="/terms-privacy"
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Terms & Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
