import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";
import TopBuilders from "./components/TopBuilders";

export default async function Page() {


  const { data: homePage } = await sanityFetch({
    query: homePageQuery,
  });

  console.log('homePage', homePage);

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="relative min-h-[80vh] overflow-hidden">
          {/* Hero Background Image - Optimized for LCP */}
          <Image
            src={homePage?.heroImage ? urlForImage(homePage.heroImage)?.url() || "/images/roof_trusses.jpeg" : "/images/roof_trusses.jpeg"}
            alt={homePage?.heroImage?.alt || "Roof trusses and building components"}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
            unoptimized={!homePage?.heroImage}
          />
          <div className="bg-black/60 w-full h-full absolute top-0 z-10"></div>
          <div className="container">
            <div className="relative min-h-[80vh] mx-auto max-w-4xl pt-20 pb-20 space-y-8 flex flex-col items-center justify-center text-center z-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                {homePage?.heroTitle || "Hassle-free roof trusses and building components delivered to your job site."}
              </h1>
              {homePage?.heroSubtitle && (
                <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                  {homePage.heroSubtitle}
                </p>
              )}
              <div className="pt-8">
                <Link
                  href={homePage?.heroCallToAction?.link || "/contact"}
                  className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
                >
                  {homePage?.heroCallToAction?.text || "GET A QUOTE"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Dynamic Sections */}
      {homePage?.sections?.map((section, index) => (
        <div key={index}>
          {section._type === 'infoSection' && (
            <div className={index % 2 === 0 ? "bg-gray-900 text-white py-20" : "bg-white text-gray-900 py-20"}>
              <div className="container">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  {section.heading && (
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                      {section.heading}
                    </h2>
                  )}
                  {section.subheading && (
                    <p className="text-xl mb-8">
                      {section.subheading}
                    </p>
                  )}
                  {section.content && (
                    <div className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                      {/* TODO: Render rich text content */}
                      <div>Rich text content will be rendered here</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {section._type === 'callToAction' && section.link && (
            <div className="bg-blue-500 text-white py-16">
              <div className="container">
                <div className="max-w-4xl mx-auto text-center">
                  {section.heading && (
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                      {section.heading}
                    </h2>
                  )}
                  {section.text && (
                    <p className="text-xl mb-8 text-blue-100">
                      {section.text}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={section.link?.page ? `/${section.link.page}` : section.link?.post ? `/posts/${section.link.post}` : section.link?.href || '/'}
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold rounded-lg transition-colors duration-200"
                    >
                      {section.buttonText || 'Learn More'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Top Builders Section */}
      <TopBuilders />

      {/* Final CTA Section */}
      <div className="bg-blue-500 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {homePage?.finalCallToAction?.heading || "Ready to get started on your next project?"}
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {homePage?.finalCallToAction?.subtitle || "Contact us today for a quote on roof trusses and building components."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={homePage?.finalCallToAction?.primaryButton?.link || "/contact"}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold rounded-lg transition-colors duration-200"
              >
                {homePage?.finalCallToAction?.primaryButton?.text || "REQUEST QUOTE"}
              </Link>
              <Link
                href={homePage?.finalCallToAction?.secondaryButton?.link || "/products"}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-500 text-lg font-semibold rounded-lg transition-colors duration-200"
              >
                {homePage?.finalCallToAction?.secondaryButton?.text || "VIEW PRODUCTS"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
