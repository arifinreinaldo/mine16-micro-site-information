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
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Need Pet Services?</h2>
          <p className="text-sm text-gray-500 mt-1">Connect with verified vets, groomers, and trainers for {petName}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-sm text-gray-500 mb-1">
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
              >
                <option value="vet">Veterinary Care</option>
                <option value="groomer">Grooming</option>
                <option value="trainer">Training</option>
                <option value="walker">Dog Walking</option>
                <option value="boarding">Pet Boarding</option>
                <option value="other">Other Services</option>
              </select>
            </div>

            {/* Your Name */}
            <div>
              <label htmlFor="inquirerName" className="block text-sm text-gray-500 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="inquirerName"
                name="inquirerName"
                value={formData.inquirerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="inquirerEmail" className="block text-sm text-gray-500 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="inquirerEmail"
                name="inquirerEmail"
                value={formData.inquirerEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="inquirerPhone" className="block text-sm text-gray-500 mb-1">
                Your Phone
              </label>
              <input
                type="tel"
                id="inquirerPhone"
                name="inquirerPhone"
                value={formData.inquirerPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm text-gray-500 mb-1">
                Your Location (Optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="City, State"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm text-gray-500 mb-1">
                Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors text-base text-gray-900"
                placeholder="Describe your needs..."
              />
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-gray-50 border border-gray-200 p-4">
                <p className="text-gray-900 font-medium text-sm">Inquiry submitted successfully</p>
                <p className="text-gray-600 text-sm mt-1">
                  We'll connect you with local service providers shortly.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-gray-50 border border-gray-200 p-4">
                <p className="text-gray-900 font-medium text-sm">Error submitting inquiry</p>
                <p className="text-gray-600 text-sm mt-1">
                  Please try again or contact support.
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
                {isSubmitting ? "Submitting..." : "Request Service"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
