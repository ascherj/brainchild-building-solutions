"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface NavigationItem {
  title: string;
  slug: string;
  isExternal?: boolean;
  order?: number;
}

interface MobileMenuProps {
  navigationItems: NavigationItem[];
}

export default function MobileMenu({ navigationItems }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Fallback navigation items if none provided
  const safeNavigationItems = navigationItems && navigationItems.length > 0 ? navigationItems : [
    { title: "Home", slug: "/", order: 1 },
    { title: "About", slug: "/about", order: 2 },
    { title: "Services", slug: "/services", order: 3 },
    { title: "Products", slug: "/products", order: 4 },
    { title: "Projects", slug: "/projects", order: 5 },
    { title: "Contact", slug: "/contact", order: 6 },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-60 p-2 -mr-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : 'mb-1'
          }`} />
          <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-0 scale-0' : ''
          }`} />
          <span className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'mt-1'
          }`} />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel */}
          <div className="fixed inset-x-0 top-20 md:top-24 bottom-0 bg-white z-50 lg:hidden shadow-2xl flex flex-col">
            {/* Menu Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 border-b border-blue-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Navigation</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-[50vh] overflow-y-auto bg-gray-50">
              {/* Navigation Items */}
              <div className="bg-white">
                {safeNavigationItems.map((item: NavigationItem, index: number) => (
                  <div key={item.slug || index} className="border-b border-gray-100 last:border-b-0">
                    {item.isExternal ? (
                      <a
                        href={item.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-6 py-4 text-gray-900 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100 transition-all duration-200"
                        onClick={closeMobileMenu}
                      >
                        <span className="text-lg font-medium">{item.title}</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={item.slug}
                        className="flex items-center justify-between px-6 py-4 text-gray-900 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100 transition-all duration-200 block"
                        onClick={closeMobileMenu}
                      >
                        <span className="text-lg font-medium">{item.title}</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Call to Action Section */}
              <div className="p-6 bg-gray-50">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
                  <h3 className="text-white font-bold text-lg mb-2">Ready to Get Started?</h3>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                    Get a free quote for your building components today. Professional service you can trust.
                  </p>
                  <Link
                    className="w-full rounded-lg flex gap-3 items-center justify-center bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-bold py-4 px-6 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    href="/contact"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Get Free Quote</span>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Call Us</p>
                      <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Service Area</p>
                      <p className="text-sm text-gray-600">MD, DC, VA Region</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 mb-2">Trusted Since 2007</p>
                    <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Licensed
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Insured
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Certified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
