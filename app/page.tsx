import PetProfile from "@/components/PetProfile";
import FoundPetForm from "@/components/FoundPetForm";
import { petInfo, ownerInfo, aiboInfo, aiboOwner } from "@/data/petData";
import { getPetDataById } from "@/lib/getPetData";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
      </div>
    );
  }

  // Check if this is the AIBO demo
  if (petId.toUpperCase() === 'AIBO') {
    const pet = aiboInfo;
    const owner = aiboOwner;

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
      </div>
    );
  }

  const { pet, owner } = data;

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
    </div>
  );
}
