import Link from "next/link";
import Image from "next/image";
import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import MobileMenu from "@/app/components/MobileMenu";

// Static navigation items
const navigationItems = [
  { title: "Home", slug: "/" },
  { title: "About", slug: "/about" },
  { title: "Products", slug: "/products" },
  { title: "Projects", slug: "/projects" },
  { title: "Testimonials", slug: "/testimonials" },
  { title: "Contact", slug: "/contact" },
];

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  const businessName = settings?.businessName || settings?.title || "Brainchild Building Solutions";

  return (
    <header className="fixed z-50 h-20 md:h-24 inset-x-0 top-0 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link className="flex items-center gap-3 z-60" href="/">
            {settings?.logo?.asset?.url ? (
              <Image
                src={settings.logo.asset.url}
                alt={settings.logo.alt || `${businessName} logo`}
                width={settings.logo.asset.metadata?.dimensions?.width || 240}
                height={settings.logo.asset.metadata?.dimensions?.height || 120}
                className="h-10 sm:h-12 md:h-16 w-auto object-contain"
                priority
              />
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                {businessName}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8 text-base font-medium">
              {navigationItems.map((item, index) => (
                <li key={item.slug || index}>
                  <Link
                    href={item.slug}
                    className="hover:text-blue-600 transition-colors duration-200 py-2"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="rounded-full flex gap-2 items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 py-3 px-6 text-white transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                  href="/contact"
                >
                  <span className="whitespace-nowrap">Get Quote</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Component */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
