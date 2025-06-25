import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const productsQuery = defineQuery(`
  *[_type == "product"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    category,
    description,
    "image": galleryImages[0],
    featured,
    leadTime,
    applications[]
  }
`);

export default async function ProductsPage() {
  const { data: products } = await sanityFetch({
    query: productsQuery,
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Building Components & Materials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality building components from trusted suppliers. From engineered lumber to hardware,
            we supply the materials that make your projects successful.
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {product.image && (
                  <div className="relative h-48 w-full">
                    <Image
                                           src={urlForImage(product.image)?.width(400).height(300).url() || ''}
                     alt={product.image.alt || product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {product.category && (
                    <p className="text-sm text-gray-500 mb-3 capitalize">
                      {product.category.replace('-', ' ')}
                    </p>
                  )}

                  {product.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description}
                    </p>
                  )}

                  {product.leadTime && (
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Lead Time:</strong> {product.leadTime}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/products/${product.slug.current}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    <Link
                      href="/contact"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Get Quote →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No products available yet
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re currently updating our product catalog. Please check back soon or contact us directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        )}

        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Something Specific?
          </h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? We work with multiple suppliers and can source
            custom components for your project needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Products | Building Components & Materials",
  description: "Browse our selection of quality building components and materials from trusted suppliers. Engineered lumber, hardware, and more for your construction projects.",
};
