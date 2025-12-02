import { Owner } from "@/types/pet";

interface ContactSectionProps {
  owner: Owner;
}

export default function ContactSection({ owner }: ContactSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Owner Contact</h2>
          <p className="text-sm text-gray-500 mt-1">Get in touch with {owner.name}</p>
        </div>

        {/* Contact Information */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Name */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="text-base font-medium text-gray-900">{owner.name}</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <a
                href={`mailto:${owner.email}`}
                className="text-base font-medium text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                {owner.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <a
                href={`tel:${owner.phone}`}
                className="text-base font-medium text-gray-900 hover:text-gray-600 underline transition-colors"
              >
                {owner.phone}
              </a>
            </div>

            {/* Preferred Contact */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Preferred Contact Method</p>
              <p className="text-base font-medium text-gray-900">{owner.preferredContact}</p>
            </div>
          </div>

          {/* Address */}
          {owner.address && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="text-base font-medium text-gray-900">{owner.address}</p>
            </div>
          )}

          {/* Contact Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${owner.email}`}
              className="flex-1 bg-gray-900 text-white px-6 py-3 text-center font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              Send Email
            </a>
            <a
              href={`tel:${owner.phone}`}
              className="flex-1 border border-gray-900 text-gray-900 px-6 py-3 text-center font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
