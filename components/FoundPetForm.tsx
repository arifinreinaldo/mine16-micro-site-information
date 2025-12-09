"use client";

import { useState } from "react";

interface FoundPetFormProps {
  petId: string;
  petName: string;
}

export default function FoundPetForm({ petId, petName }: FoundPetFormProps) {
  const [formData, setFormData] = useState({
    finderName: "",
    finderPhone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "ratelimit">("idle");
  const [retryAfter, setRetryAfter] = useState<number>(0);

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
          finderPhone: "",
          message: "",
        });
      } else if (response.status === 429) {
        // Rate limit exceeded
        const data = await response.json();
        setSubmitStatus("ratelimit");
        setRetryAfter(data.retryAfter || 15);
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
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Found This Pet?</h2>
          <p className="text-sm text-gray-500 mt-1">Help reunite {petName} with their owner</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Finder Name */}
            <div>
              <label htmlFor="finderName" className="block text-sm text-gray-500 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="finderName"
                name="finderName"
                value={formData.finderName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="finderPhone" className="block text-sm text-gray-500 mb-1">
                Your Phone
              </label>
              <input
                type="tel"
                id="finderPhone"
                name="finderPhone"
                value={formData.finderPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm text-gray-500 mb-1">
                Description
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="Provide details about where and when you found the pet..."
              />
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-gray-50 border border-gray-200 p-4">
                <p className="text-gray-900 font-medium text-sm">Report submitted successfully</p>
                <p className="text-gray-600 text-sm mt-1">
                  Thank you for helping reunite {petName} with their owner.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-gray-50 border border-gray-200 p-4">
                <p className="text-gray-900 font-medium text-sm">Error submitting report</p>
                <p className="text-gray-600 text-sm mt-1">
                  Please try again or contact support if the issue persists.
                </p>
              </div>
            )}

            {submitStatus === "ratelimit" && (
              <div className="bg-amber-50 border border-amber-200 p-4">
                <p className="text-amber-900 font-medium text-sm">Too many requests</p>
                <p className="text-amber-800 text-sm mt-1">
                  You've reached the submission limit. Please wait {retryAfter} minutes before trying again.
                  This helps prevent spam and ensures all reports are processed properly.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white px-6 py-3 text-center font-medium hover:bg-gray-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
