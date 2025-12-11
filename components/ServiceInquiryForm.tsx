"use client";

import { useState } from "react";

interface ServiceInquiryFormProps {
  petId: string;
  petName: string;
}

export default function ServiceInquiryForm({ petId, petName }: ServiceInquiryFormProps) {
  const [formData, setFormData] = useState({
    serviceType: "vet",
    inquirerName: "",
    inquirerEmail: "",
    inquirerPhone: "",
    message: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/service-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petId,
          petName,
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          serviceType: "vet",
          inquirerName: "",
          inquirerEmail: "",
          inquirerPhone: "",
          message: "",
          location: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b-2 border-blue-200 px-8 py-6 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🐕‍🦺</span>
            <h2 className="text-3xl font-bold text-blue-900">Need Pet Services?</h2>
          </div>
          <p className="text-base text-blue-700 font-medium ml-14">Connect with verified vets, groomers, and trainers for {petName}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-base font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>🔧</span> Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-blue-50/30"
              >
                <option value="vet">🏥 Veterinary Care</option>
                <option value="groomer">✂️ Grooming</option>
                <option value="trainer">🎓 Training</option>
                <option value="walker">🚶 Dog Walking</option>
                <option value="boarding">🏠 Pet Boarding</option>
                <option value="other">🌟 Other Services</option>
              </select>
            </div>

            {/* Your Name */}
            <div>
              <label htmlFor="inquirerName" className="block text-base font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>👤</span> Your Name
              </label>
              <input
                type="text"
                id="inquirerName"
                name="inquirerName"
                value={formData.inquirerName}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-blue-50/30"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="inquirerEmail" className="block text-base font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>📧</span> Your Email
              </label>
              <input
                type="email"
                id="inquirerEmail"
                name="inquirerEmail"
                value={formData.inquirerEmail}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-blue-50/30"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="inquirerPhone" className="block text-base font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>📱</span> Your Phone
              </label>
              <input
                type="tel"
                id="inquirerPhone"
                name="inquirerPhone"
                value={formData.inquirerPhone}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-blue-50/30"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-base font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>📍</span> Your Location <span className="text-sm font-normal text-blue-600">(Optional)</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-blue-50/30"
                placeholder="City, State"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-base font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>✍️</span> Tell us what you need
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-5 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-base text-gray-900 bg-blue-50/30"
                placeholder="Describe your needs..."
              />
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl p-5 shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">✅</span>
                  <div>
                    <p className="text-green-900 font-bold text-base">Inquiry submitted successfully!</p>
                    <p className="text-green-700 text-base mt-1">
                      We'll connect you with local service providers shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-300 rounded-2xl p-5 shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">❌</span>
                  <div>
                    <p className="text-red-900 font-bold text-base">Oops! Something went wrong</p>
                    <p className="text-red-700 text-base mt-1">
                      Please try again or contact support.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-5">
              <div className="flex items-start gap-2">
                <span className="text-xl">🔒</span>
                <p className="text-sm text-purple-900">
                  By submitting this form, you consent to us collecting your contact information to connect you with
                  service providers. We also collect your IP address and browser information to prevent spam.
                  Your data will be deleted after 90 days. Read our{" "}
                  <a
                    href="/terms-privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 underline hover:text-purple-900 font-semibold decoration-2"
                  >
                    Terms & Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-friendly w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-center font-bold rounded-full text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span>📨</span>
                    Request Service
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
