import PetProfile from "@/components/PetProfile";
import ContactSection from "@/components/ContactSection";
import { petInfo, ownerInfo } from "@/data/petData";

export default function Home() {
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
        <PetProfile pet={petInfo} />
        <ContactSection owner={ownerInfo} />
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
