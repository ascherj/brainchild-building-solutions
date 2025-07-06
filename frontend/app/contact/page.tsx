import { sanityFetch } from "@/sanity/lib/live";
import { contactPageQuery, settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function ContactPage() {
  const [{ data: contactPage }, { data: settings }] = await Promise.all([
    sanityFetch({ query: contactPageQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {contactPage?.title || "Get Your Quote Today"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {contactPage?.subtitle || "Ready to start your project? Contact us for a detailed quote on building components and materials. We work with contractors and builders throughout the region."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {contactPage?.formTitle || "Request a Quote"}
            </h2>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-6"
            >
              {/* Netlify form fields */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select project type</option>
                  <option value="residential-single">Residential - Single Family</option>
                  <option value="residential-multi">Residential - Multi-Family</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="components" className="block text-sm font-medium text-gray-700 mb-1">
                  Components Needed
                </label>
                <textarea
                  id="components"
                  name="components"
                  rows={3}
                  placeholder="e.g., roof trusses, floor joists, engineered beams..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (within 2 weeks)</option>
                  <option value="month">Within 1 month</option>
                  <option value="quarter">Within 3 months</option>
                  <option value="flexible">Flexible timing</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Send Quote Request
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {contactPage?.contactInfoTitle || "Contact Information"}
              </h2>

              <div className="space-y-4">
                {settings?.contactInfo?.phone && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a
                        href={`tel:${settings.contactInfo.phone}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {settings.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.contactInfo?.email && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a
                        href={`mailto:${settings.contactInfo.email}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {settings.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.contactInfo?.address && (
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600 whitespace-pre-line">
                        {settings.contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {contactPage?.whyChooseUsTitle || `Why Choose ${settings?.businessName || 'Brainchild Building Solutions'}?`}
              </h3>
              <ul className="space-y-3 text-gray-700">
                {contactPage?.benefits?.length ? (
                  contactPage.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      {benefit}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      Trusted relationships with quality suppliers
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      Competitive pricing and reliable delivery
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      Expert guidance on component selection
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">✓</span>
                      Serving contractors throughout the region
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {contactPage?.callToActionText || "Prefer to browse our offerings first?"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  View Products
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  See Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const { data: contactPage } = await sanityFetch({ query: contactPageQuery });

  return {
    title: contactPage?.seoTitle || "Contact | Get Your Building Components Quote",
    description: contactPage?.seoDescription || "Contact Brainchild Building Solutions for a quote on building components and materials. We serve contractors and builders throughout the region.",
  };
}
