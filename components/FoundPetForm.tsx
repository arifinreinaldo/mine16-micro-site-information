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
      <div className="bg-white rounded-3xl border-2 border-pink-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b-2 border-pink-200 px-8 py-6 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🐾</span>
            <h2 className="text-3xl font-bold text-pink-900">Found This Pet?</h2>
          </div>
          <p className="text-base text-pink-700 font-medium ml-14">Help reunite {petName} with their owner by submitting a report below!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Finder Name */}
            <div>
              <label htmlFor="finderName" className="block text-base font-semibold text-pink-800 mb-2 flex items-center gap-2">
                <span>👤</span> Your Name
              </label>
              <input
                type="text"
                id="finderName"
                name="finderName"
                value={formData.finderName}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all text-base text-gray-900 bg-pink-50/30"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="finderPhone" className="block text-base font-semibold text-pink-800 mb-2 flex items-center gap-2">
                <span>📱</span> Your Phone
              </label>
              <input
                type="tel"
                id="finderPhone"
                name="finderPhone"
                value={formData.finderPhone}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all text-base text-gray-900 bg-pink-50/30"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-base font-semibold text-pink-800 mb-2 flex items-center gap-2">
                <span>✍️</span> Where did you find {petName}?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-5 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all text-base text-gray-900 bg-pink-50/30"
                placeholder="Provide details about where and when you found the pet..."
              />
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl p-5 shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">✅</span>
                  <div>
                    <p className="text-green-900 font-bold text-base">Report submitted successfully!</p>
                    <p className="text-green-700 text-base mt-1">
                      Thank you for helping reunite {petName} with their owner. They'll be contacted soon!
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
                      Please try again or contact support if the issue persists.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === "ratelimit" && (
              <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-2xl p-5 shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">⏰</span>
                  <div>
                    <p className="text-amber-900 font-bold text-base">Please wait a moment</p>
                    <p className="text-amber-800 text-base mt-1">
                      You've reached the submission limit. Please wait {retryAfter} minutes before trying again.
                      This helps prevent spam and ensures all reports are processed properly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-friendly w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 text-center font-bold rounded-full text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span>📮</span>
                    Submit Report
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
