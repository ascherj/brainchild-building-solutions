import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function Page() {

  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="relative bg-[url(/images/roof_trusses.jpeg)] bg-cover bg-center bg-no-repeat min-h-[80vh]">
          <div className="bg-black/60 w-full h-full absolute top-0"></div>
          <div className="container">
            <div className="relative min-h-[80vh] mx-auto max-w-4xl pt-20 pb-20 space-y-8 flex flex-col items-center justify-center text-center">
              <div className="text-red-400 text-sm sm:text-base font-semibold uppercase tracking-wider mb-4">
                {settings?.businessName}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Hassle-free roof trusses and building components delivered to your jobsite.
              </h1>
              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
                >
                  GET A QUOTE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Buy from someone you trust.
            </h2>
            <div className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              <p>
                Mark Ascher has been in this industry since 1989. You can have confidence knowing that he comes from a technical, civil engineering background. Brainchild Building Solutions was founded in 2007 and has been a reliable supplier of trusses and building components for residential and commercial projects in the greater Maryland, D.C. and Virginia area. Why not trust an expert for your next job?
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-white py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Professional Building Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From roof trusses to complete building components, we deliver quality materials on time and on budget.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Roof Trusses</h3>
                <p className="text-gray-600">Engineered roof trusses designed for residential and commercial applications.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Building Components</h3>
                <p className="text-gray-600">Complete range of structural building components for your construction needs.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Jobsite Delivery</h3>
                <p className="text-gray-600">Reliable delivery service directly to your construction site when you need it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to get started on your next project?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Contact us today for a quote on roof trusses and building components.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 hover:bg-gray-100 text-lg font-semibold rounded-lg transition-colors duration-200"
              >
                REQUEST QUOTE
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg font-semibold rounded-lg transition-colors duration-200"
              >
                VIEW PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
