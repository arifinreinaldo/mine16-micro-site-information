import PetProfile from "@/components/PetProfile";
import FoundPetForm from "@/components/FoundPetForm";
import { aiboInfo } from "@/data/petData";
import { getPetDataById } from "@/lib/getPetData";
import type { Metadata } from "next";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Helper function to format phone number for WhatsApp (remove spaces, dashes, parentheses)
function formatPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, '');
}

// Create WhatsApp URL with pre-filled message
function getWhatsAppUrl(phone: string, petName: string): string {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const message = `Hi I have found ${petName}`;
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <header className="bg-gradient-to-r from-orange-100 to-amber-100 border-b-4 border-orange-200 shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-orange-900 flex items-center gap-3">
              🐾 Pet Information Hub
            </h1>
            <p className="text-orange-700 mt-2 text-base font-medium">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl border-2 border-orange-200 shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-bold text-orange-900 mb-4">No Pet ID Provided</h2>
            <p className="text-gray-700 mb-6 text-lg">
              No pet ID parameter found in the URL.
            </p>
            <p className="text-gray-600 text-base mb-4">
              To view a pet profile, please use a URL with the pet ID parameter:
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6 mb-6 inline-block">
              <code className="text-base text-gray-800 font-mono font-semibold">
                https://your-domain.com/?param=YOUR_PET_ID
              </code>
            </div>
            <p className="text-gray-600 text-base mb-4">
              Contact the pet owner to get the correct link.
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-amber-400 text-white px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <span className="text-xl">🐶</span>
              Try the demo: <a href="/?param=AIBO" className="underline decoration-2">?param=AIBO</a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-orange-100 to-amber-100 border-t-4 border-orange-200 mt-auto shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <a
              href="/terms-privacy"
              className="text-base text-orange-800 hover:text-orange-900 font-medium underline decoration-2 decoration-orange-300 hover:decoration-orange-500 transition-all"
            >
              📄 Terms & Privacy Policy
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
          <div className="mb-6 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-2xl p-5 text-center shadow-md">
            <p className="text-amber-900 text-base flex items-center justify-center gap-2 flex-wrap">
              <span className="text-2xl">🎮</span>
              <span className="font-bold">Demo Mode:</span> You're viewing the default Aibo profile.
              This is sample data to demonstrate the microsite features.
            </p>
          </div>
          <PetProfile pet={pet} />

          {/* Owner Contact Information - For Non-Pro Members */}
          {pet.ownerPhone && pet.membership !== "pro" && (
            <div className="mt-8 mb-8 w-full max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center shadow-lg">
                <a
                  href={getWhatsAppUrl(pet.ownerPhone, pet.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-friendly inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Contact Owner on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* Owner Contact Information - For Pro Members with show_contact=1 */}
          {pet.ownerPhone && pet.membership === "pro" && pet.showContact && (
            <div className="mt-8 mb-8 w-full max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200 rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3 animate-bounce-soft">🎉</div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">Found This Pet?</h2>
                  <p className="text-blue-700 text-lg">Get in touch with the owner right away!</p>
                </div>
                <div className="text-center">
                  <a
                    href={getWhatsAppUrl(pet.ownerPhone, pet.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-friendly inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl"
                  >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Contact Owner on WhatsApp
                </a>
                </div>
              </div>
            </div>
          )}

          {/* Found Pet Form - Only for Pro Members */}
          {pet.membership === "pro" && (
            <FoundPetForm petId="AIBO" petName={pet.name} />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-orange-100 to-amber-100 border-t-4 border-orange-200 mt-auto shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <a
              href="/terms-privacy"
              className="text-base text-orange-800 hover:text-orange-900 font-medium underline decoration-2 decoration-orange-300 hover:decoration-orange-500 transition-all"
            >
              📄 Terms & Privacy Policy
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <header className="bg-gradient-to-r from-orange-100 to-amber-100 border-b-4 border-orange-200 shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-orange-900 flex items-center gap-3">
              🐾 Pet Information Hub
            </h1>
            <p className="text-orange-700 mt-2 text-base font-medium">Your trusted pet profile and contact resource</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl border-2 border-red-200 shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">😿</div>
            <h2 className="text-3xl font-bold text-red-900 mb-4">Pet Not Found</h2>
            <p className="text-gray-700 mb-6 text-lg">
              We couldn't find a pet with the ID: <span className="font-mono font-bold text-red-700 bg-red-50 px-3 py-1 rounded-lg">{petId}</span>
            </p>
            <p className="text-gray-600 text-base">
              Please check the ID and try again, or contact the pet owner for the correct link.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-orange-100 to-amber-100 border-t-4 border-orange-200 mt-auto shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center">
            <a
              href="/terms-privacy"
              className="text-base text-orange-800 hover:text-orange-900 font-medium underline decoration-2 decoration-orange-300 hover:decoration-orange-500 transition-all"
            >
              📄 Terms & Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    );
  }

  const { pet } = data;

  // DEBUG: Log pet data to check values
  console.log('=== DEBUG: Pet Data ===');
  console.log('pet.ownerPhone:', pet.ownerPhone);
  console.log('pet.membership:', pet.membership);
  console.log('pet.showContact:', pet.showContact);
  console.log('========================');

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

        {/* Owner Contact Information - For Non-Pro Members: Simple WhatsApp Button */}
        {pet.ownerPhone && pet.membership !== "pro" && (
          <div className="mt-8 mb-8 w-full max-w-5xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 p-4 text-center">
              <a
                href={getWhatsAppUrl(pet.ownerPhone, pet.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors shadow-md hover:shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact Owner on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Owner Contact Information - For Pro Members with show_contact=1: Fancy "Found This Pet?" Section */}
        {pet.ownerPhone && pet.membership === "pro" && pet.showContact && (
          <div className="mt-8 mb-8 w-full max-w-5xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">Found This Pet?</h2>
              <a
                href={getWhatsAppUrl(pet.ownerPhone, pet.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors shadow-md hover:shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact Owner on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Found Pet Form - Only for Pro Members */}
        {pet.membership === "pro" && (
          <FoundPetForm petId={petId} petName={pet.name} />
        )}
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
