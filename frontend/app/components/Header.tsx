import Link from "next/link";
import Image from "next/image";
import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  // Default navigation items if not configured in Sanity
  const defaultNavigation = [
    { title: "Home", slug: "/", order: 1 },
    { title: "About", slug: "/about", order: 2 },
    { title: "Services", slug: "/services", order: 3 },
    { title: "Products", slug: "/products", order: 4 },
    { title: "Projects", slug: "/projects", order: 5 },
    { title: "Contact", slug: "/contact", order: 6 },
  ];

  // Use navigation from Sanity if available, otherwise use defaults
  const navigation = settings?.navigation as any;
  const navigationItems = navigation?.mainNavigation?.length
    ? navigation.mainNavigation.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : defaultNavigation;

  const businessName = settings?.businessName || settings?.title || "Brainchild Building Solutions";

  return (
    <header className="fixed z-50 h-24 inset-0 bg-white/95 flex items-center backdrop-blur-lg shadow-sm">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-3" href="/">
            {settings?.logo?.asset?.url ? (
              <Image
                src={settings.logo.asset.url}
                alt={settings.logo.alt || `${businessName} logo`}
                width={settings.logo.asset.metadata?.dimensions?.width || 240}
                height={settings.logo.asset.metadata?.dimensions?.height || 120}
                className="h-12 sm:h-16 w-auto object-contain"
                priority
              />
            ) : (
              <span className="text-lg sm:text-2xl font-bold text-gray-900">
                {businessName}
              </span>
            )}
          </Link>

          <nav>
            <ul
              role="list"
              className="flex items-center gap-4 md:gap-6 leading-5 text-xs sm:text-base tracking-tight"
            >
              {navigationItems.map((item: any, index: number) => (
                <li key={item.slug || index}>
                  {item.isExternal ? (
                    <a
                      href={item.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 transition-colors duration-200 font-medium"
                    >
                      {item.title}
                    </a>
                  ) : (
                                      <Link
                    href={item.slug}
                    className="hover:text-blue-500 transition-colors duration-200 font-medium"
                  >
                    {item.title}
                  </Link>
                  )}
                </li>
              ))}

              <li className="sm:before:w-[1px] sm:before:bg-gray-200 before:block flex sm:gap-4 md:gap-6">
                <Link
                  className="rounded-full flex gap-2 items-center bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 py-2 px-4 justify-center sm:py-3 sm:px-6 text-white transition-colors duration-200 text-sm font-medium"
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
        </div>
      </div>
    </header>
  );
}
