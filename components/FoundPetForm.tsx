"use client";

import { useState } from "react";

interface FoundPetFormProps {
  petId: string;
  petName: string;
}

export default function FoundPetForm({ petId, petName }: FoundPetFormProps) {
  const [formData, setFormData] = useState({
    finderName: "",
    finderEmail: "",
    finderPhone: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/report-found-pet", {
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
          finderName: "",
          finderEmail: "",
          finderPhone: "",
          location: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span>📍</span>
            Found This Pet?
          </h2>
          <p className="mt-2 opacity-90">Help reunite {petName} with their owner</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Finder Name */}
            <div>
              <label htmlFor="finderName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="finderName"
                name="finderName"
                value={formData.finderName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="finderEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="finderEmail"
                  name="finderEmail"
                  value={formData.finderEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="finderPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Phone *
                </label>
                <input
                  type="tel"
                  id="finderPhone"
                  name="finderPhone"
                  value={formData.finderPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location Found *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Street address or area where you found the pet"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Any additional details about the pet's condition, behavior, or circumstances..."
              />
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">✅ Report submitted successfully!</p>
                <p className="text-green-700 text-sm mt-1">
                  Thank you for helping reunite {petName} with their owner. They will be contacted shortly.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">❌ Error submitting report</p>
                <p className="text-red-700 text-sm mt-1">
                  Please try again or contact support if the issue persists.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Found Pet Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
