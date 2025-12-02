import PetProfile from "@/components/PetProfile";
import ContactSection from "@/components/ContactSection";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              🐾 Pet Information Hub
            </h1>
            <p className="text-gray-600 mt-1">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Detected</h2>
            <p className="text-gray-600 mb-6">
              No pet ID parameter found in the URL.
            </p>
            <p className="text-gray-500 text-sm mb-4">
              To view a pet profile, please use a URL with the pet ID parameter:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
              <code className="text-sm text-gray-700">
                https://your-domain.com/?param=YOUR_PET_ID
              </code>
            </div>
            <p className="text-gray-500 text-xs mb-2">
              Contact the pet owner to get the correct link.
            </p>
            <p className="text-blue-600 text-sm font-medium">
              Try the demo: <a href="/?param=AIBO" className="underline hover:text-blue-800">?param=AIBO</a>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              🐾 Pet Information Hub
            </h1>
            <p className="text-gray-600 mt-1">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-800 text-sm">
              <span className="font-semibold">Demo Mode:</span> You're viewing the default Aibo profile.
              This is sample data to demonstrate the microsite features.
            </p>
          </div>
          <PetProfile pet={pet} />
          <ContactSection owner={owner} />
        </main>

        {/* Footer */}
        <footer className="bg-white mt-16 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
            <p className="text-sm">
              Built with Next.js and Tailwind CSS • Ready for Vercel deployment
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Pet Microsite Information System
            </p>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              🐾 Pet Information Hub
            </h1>
            <p className="text-gray-600 mt-1">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pet Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find a pet with the ID: <span className="font-mono font-semibold">{petId}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            🐾 Pet Information Hub
          </h1>
          <p className="text-gray-600 mt-1">Your trusted pet profile and contact resource</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <PetProfile pet={pet} />
        <ContactSection owner={owner} />
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
          <p className="text-sm">
            Built with Next.js and Tailwind CSS • Ready for Vercel deployment
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Pet Microsite Information System
          </p>
        </div>
      </footer>
    </div>
  );
}
