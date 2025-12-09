import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy | Pet Information Hub",
  description: "Our terms of service and privacy policy for pet profile services",
};

export default function TermsPrivacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Terms of Service & Privacy Policy
          </h1>
          <p className="text-gray-600 mt-1 text-sm">Last Updated: December 2024</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 shadow-sm p-8 space-y-8">

          {/* Privacy Policy Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Information We Collect</h3>
                <p className="text-gray-700 mb-3">
                  We collect different types of information depending on how you interact with our service:
                </p>

                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">1.1 Pet Profile Information</h4>
                    <p className="text-gray-700">
                      When creating or viewing pet profiles, we collect and display:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 mt-1">
                      <li>Pet name, breed, age, gender, color, weight</li>
                      <li>Pet description and personality traits</li>
                      <li>Medical information and microchip number</li>
                      <li>Pet photos and images</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">1.2 Found Pet Reports</h4>
                    <p className="text-gray-700">
                      When you report finding a pet, we collect:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 mt-1">
                      <li><strong>Your name</strong> - So the pet owner can thank you and verify the report</li>
                      <li><strong>Your phone number</strong> - So the pet owner can contact you directly to arrange pet return</li>
                      <li><strong>Your message</strong> - Details about where and when you found the pet</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      <strong>Why we need this:</strong> This information is essential to reunite lost pets with their owners.
                      Without your contact details, the owner cannot reach you to recover their pet.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">1.3 Service Inquiries</h4>
                    <p className="text-gray-700">
                      When requesting pet services (vet, groomer, trainer), we collect:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 mt-1">
                      <li><strong>Your name</strong> - For service providers to address you personally</li>
                      <li><strong>Your email</strong> - To send service confirmation and follow-ups</li>
                      <li><strong>Your phone number</strong> - For service providers to contact you for appointments</li>
                      <li>Your location and service needs</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      <strong>Why we need this:</strong> Service providers need to contact you to schedule appointments
                      and provide the services you requested.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">1.4 Digital Fingerprint (Anti-Spam Protection)</h4>
                    <p className="text-gray-700">
                      To prevent spam and abuse, we automatically collect:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 mt-1">
                      <li><strong>IP Address</strong> - Your device's internet address</li>
                      <li><strong>Browser Information</strong> - Type and version of your browser (User-Agent)</li>
                      <li><strong>Timestamp</strong> - When you submitted the form</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      <strong>Why we collect this:</strong> We create a secure "digital fingerprint" by combining your
                      IP address and browser information. This helps us:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 mt-1">
                      <li>Prevent spam and fraudulent reports</li>
                      <li>Stop the same device from submitting excessive reports</li>
                      <li>Protect pet owners from malicious submissions</li>
                      <li>Maintain the integrity of our service</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      <strong>Important:</strong> We do NOT use this information to track you across websites or for
                      advertising purposes. This data is used solely for security and spam prevention.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. How We Use Your Information</h3>
                <div className="ml-4 space-y-2">
                  <p className="text-gray-700">We use the collected information for:</p>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li><strong>Service Delivery</strong> - To facilitate pet reunification and connect you with service providers</li>
                    <li><strong>Communication</strong> - To enable pet owners and service providers to contact you</li>
                    <li><strong>Spam Prevention</strong> - To prevent abuse and maintain service quality</li>
                    <li><strong>Legal Compliance</strong> - To comply with legal obligations and protect rights</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Legal Basis for Processing (GDPR)</h3>
                <div className="ml-4 space-y-2">
                  <p className="text-gray-700">We process your personal data under the following legal bases:</p>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li><strong>Consent</strong> - By submitting a form, you consent to us collecting and using your information for the stated purpose</li>
                    <li><strong>Legitimate Interest</strong> (GDPR Article 6(1)(f)) - Digital fingerprinting for spam prevention and security</li>
                    <li><strong>Contractual Necessity</strong> - Contact information is necessary to provide the services you requested</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Data Retention</h3>
                <div className="ml-4 space-y-2">
                  <p className="text-gray-700">We retain your information for:</p>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li><strong>Found Pet Reports</strong> - 90 days or until the pet is reunited with owner</li>
                    <li><strong>Service Inquiries</strong> - 90 days or until service is completed</li>
                    <li><strong>Digital Fingerprint</strong> - 30 minutes (automatically deleted from rate limiting system)</li>
                    <li><strong>Permanent Storage</strong> - Hashed fingerprint stored with report for abuse tracking (cannot identify you)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Data Security</h3>
                <p className="text-gray-700 ml-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mt-2">
                  <li>Encrypted data transmission (HTTPS)</li>
                  <li>Secure cloud database (Appwrite)</li>
                  <li>Hashed digital fingerprints (one-way encryption)</li>
                  <li>Rate limiting to prevent brute force attacks</li>
                  <li>Regular security updates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">6. Your Rights (GDPR)</h3>
                <p className="text-gray-700 ml-4 mb-2">
                  If you are in the European Union, you have the following rights:
                </p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li><strong>Right to Access</strong> - Request a copy of your personal data</li>
                  <li><strong>Right to Rectification</strong> - Request correction of inaccurate data</li>
                  <li><strong>Right to Erasure</strong> - Request deletion of your data</li>
                  <li><strong>Right to Restrict Processing</strong> - Limit how we use your data</li>
                  <li><strong>Right to Object</strong> - Object to processing based on legitimate interest</li>
                  <li><strong>Right to Data Portability</strong> - Receive your data in a structured format</li>
                </ul>
                <p className="text-gray-700 ml-4 mt-2">
                  To exercise these rights, contact us at: [Your Contact Email]
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">7. Cookies and Tracking</h3>
                <p className="text-gray-700 ml-4">
                  <strong>We do NOT use cookies or tracking technologies.</strong> We do not use analytics services,
                  advertising cookies, or any third-party tracking scripts. The only data we collect is what you
                  voluntarily provide through forms and server-side security information (IP address and browser type)
                  for spam prevention.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">8. Third-Party Services</h3>
                <p className="text-gray-700 ml-4 mb-2">
                  We use the following third-party services:
                </p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li><strong>Appwrite</strong> - Cloud database for storing pet profiles and reports (see Appwrite Privacy Policy)</li>
                  <li><strong>Vercel</strong> - Web hosting platform (see Vercel Privacy Policy)</li>
                </ul>
                <p className="text-gray-700 ml-4 mt-2">
                  We do not share your personal information with any other third parties except:
                </p>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>Pet owners (when you submit a found pet report)</li>
                  <li>Service providers (when you request pet services)</li>
                  <li>As required by law</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">9. Children's Privacy</h3>
                <p className="text-gray-700 ml-4">
                  Our service is not directed to children under 13. We do not knowingly collect personal information
                  from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">10. Changes to Privacy Policy</h3>
                <p className="text-gray-700 ml-4">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by
                  updating the "Last Updated" date at the top of this page.
                </p>
              </div>
            </div>
          </section>

          {/* Terms of Service Section */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Service</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h3>
                <p className="text-gray-700 ml-4">
                  By using this service, you agree to these Terms of Service and our Privacy Policy.
                  If you do not agree, please do not use the service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Service Description</h3>
                <p className="text-gray-700 ml-4">
                  We provide a platform for pet owners to create profiles and for finders to report found pets.
                  We also facilitate connections with pet service providers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. User Responsibilities</h3>
                <div className="ml-4 space-y-2">
                  <p className="text-gray-700">You agree to:</p>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Provide accurate and truthful information</li>
                    <li>Not submit false or fraudulent reports</li>
                    <li>Not abuse the service or attempt to circumvent security measures</li>
                    <li>Not use the service for spam or malicious purposes</li>
                    <li>Respect the privacy of pet owners and other users</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Prohibited Conduct</h3>
                <div className="ml-4 space-y-2">
                  <p className="text-gray-700">The following is strictly prohibited:</p>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Submitting false found pet reports</li>
                    <li>Attempting to spam or overload the service</li>
                    <li>Using automated tools to submit forms</li>
                    <li>Harassing pet owners or service providers</li>
                    <li>Attempting to extract or scrape data</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Disclaimer</h3>
                <p className="text-gray-700 ml-4">
                  This service is provided "as is" without warranties. We do not guarantee pet reunification
                  or the quality of third-party service providers. We are not responsible for disputes between
                  users or misuse of contact information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">6. Limitation of Liability</h3>
                <p className="text-gray-700 ml-4">
                  We are not liable for any damages arising from use of this service, including lost pets,
                  failed service connections, or data breaches beyond our reasonable control.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">7. Termination</h3>
                <p className="text-gray-700 ml-4">
                  We reserve the right to terminate or suspend access to users who violate these terms or
                  engage in abusive behavior.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">8. Contact Information</h3>
                <p className="text-gray-700 ml-4">
                  For questions about these Terms or Privacy Policy, or to exercise your data rights,
                  please contact us at:
                </p>
                <div className="ml-4 mt-2 p-4 bg-gray-50 border border-gray-200">
                  <p className="text-gray-700"><strong>Email:</strong> [Your Contact Email]</p>
                  <p className="text-gray-700"><strong>Response Time:</strong> Within 30 days</p>
                </div>
              </div>
            </div>
          </section>

          {/* Summary Box */}
          <section className="pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 Quick Summary</h3>
              <div className="space-y-2 text-blue-900">
                <p><strong>✓ We collect your name and phone</strong> so pet owners can contact you</p>
                <p><strong>✓ We collect digital fingerprint</strong> (IP + browser) to prevent spam</p>
                <p><strong>✓ No cookies, no tracking, no ads</strong></p>
                <p><strong>✓ Your data is deleted after 90 days</strong></p>
                <p><strong>✓ You can request deletion anytime</strong></p>
                <p><strong>✓ GDPR compliant</strong></p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
