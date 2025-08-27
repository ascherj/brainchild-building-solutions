import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { productQuery, relatedProductsQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { PortableText } from "@portabletext/react";
import ProductGallery from "./ProductGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: product } = await sanityFetch({
    query: productQuery,
    params: resolvedParams,
  });

  if (!product) {
    notFound();
  }

  const { data: relatedProducts = [] } = await sanityFetch({
    query: relatedProductsQuery,
    params: { category: product.category, slug: resolvedParams.slug },
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>→</span>
          <Link href="/products" className="hover:text-gray-700">
            Products
          </Link>
          <span>→</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductGallery 
            images={product.galleryImages || []}
            productName={product.name}
            featured={product.featured}
          />

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.category && (
                <p className="text-lg text-blue-600 capitalize mb-4">
                  {product.category.replace('-', ' ')}
                </p>
              )}
            </div>

            {product.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {product.applications && product.applications.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Common Applications
                </h2>
                <ul className="space-y-1">
                  {product.applications.map((application: string, index: number) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.leadTime && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Lead Time
                </h2>
                <p className="text-gray-600">{product.leadTime}</p>
              </div>
            )}

            {product.suppliers && product.suppliers.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Preferred Suppliers
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.suppliers.map((supplier: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {supplier}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interested in this product?
              </h3>
              <p className="text-gray-600 mb-4">
                Get a detailed quote for your project including delivery timelines and pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Request Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specsRichText && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Specifications & Details
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 prose max-w-none">
              <PortableText value={product.specsRichText} />
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <div
                  key={relatedProduct._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {relatedProduct.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlForImage(relatedProduct.image)?.width(300).height(200).url() || ''}
                        alt={relatedProduct.image.alt || relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    {relatedProduct.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                    )}
                    <Link
                      href={`/products/${relatedProduct.slug.current}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await sanityFetch({
    query: defineQuery(`*[_type == "product" && defined(slug.current)]{
      "slug": slug.current
    }`),
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });

  return products.data?.map((product: any) => ({
    slug: product.slug,
  })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: product } = await sanityFetch({
    query: productQuery,
    params: resolvedParams,
  });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Building Components`,
    description: product.description || `${product.name} - Quality building component from trusted suppliers.`,
  };
}
