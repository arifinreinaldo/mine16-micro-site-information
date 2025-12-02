import { Owner } from "@/types/pet";

interface ContactSectionProps {
  owner: Owner;
}

export default function ContactSection({ owner }: ContactSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span>📞</span>
            Contact Owner
          </h2>
          <p className="mt-2 opacity-90">Get in touch with {owner.name}</p>
        </div>

        {/* Contact Information */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <span>👤</span>
                <span>Name</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 pl-6">{owner.name}</p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <span>📧</span>
                <span>Email</span>
              </div>
              <a
                href={`mailto:${owner.email}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800 pl-6 block transition-colors"
              >
                {owner.email}
              </a>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <span>📱</span>
                <span>Phone</span>
              </div>
              <a
                href={`tel:${owner.phone}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800 pl-6 block transition-colors"
              >
                {owner.phone}
              </a>
            </div>

            {/* Preferred Contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <span>⭐</span>
                <span>Preferred Contact</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 pl-6">{owner.preferredContact}</p>
            </div>
          </div>

          {/* Address */}
          {owner.address && (
            <div className="mt-6 p-6 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 text-purple-900 text-sm font-medium mb-2">
                <span>📍</span>
                <span>Address</span>
              </div>
              <p className="text-purple-800 pl-6">{owner.address}</p>
            </div>
          )}

          {/* Contact Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${owner.email}`}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Send Email
            </a>
            <a
              href={`tel:${owner.phone}`}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
