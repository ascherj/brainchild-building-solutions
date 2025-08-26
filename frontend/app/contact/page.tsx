import { sanityFetch } from "@/sanity/lib/live";
import { contactPageQuery, settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import ContactForm from "./ContactForm";

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

            <ContactForm />
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
