import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const servicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    description,
    benefits[],
    icon,
    image
  }
`);

export default async function ServicesPage() {
  const { data: services } = await sanityFetch({
    query: servicesQuery,
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive building component supply services for contractors and builders.
            From sourcing to delivery, we handle the logistics so you can focus on building.
          </p>
        </div>

        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {service.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlForImage(service.image)?.width(400).height(300).url() || ''}
                      alt={service.image.alt || service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {service.description && (
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                  )}

                  {service.benefits && service.benefits.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</p>
                      <ul className="space-y-1">
                        {service.benefits.slice(0, 3).map((benefit: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2 mt-0.5">✓</span>
                            {benefit}
                          </li>
                        ))}
                        {service.benefits.length > 3 && (
                          <li className="text-sm text-gray-500 italic">
                            +{service.benefits.length - 3} more benefits
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug.current}`}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors duration-200"
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/contact"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Get Started →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Services Information Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re currently updating our services information. Contact us directly to learn about our capabilities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        )}

        <div className="mt-16 bg-purple-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-600 mb-6">
            Every construction project is unique. We work with you to develop custom supply solutions
            that meet your specific timeline, budget, and quality requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors duration-200"
          >
            Discuss Your Needs
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Services | Building Component Supply Services",
  description: "Comprehensive building component supply services for contractors and builders. From sourcing to delivery, we handle the logistics so you can focus on building.",
};
