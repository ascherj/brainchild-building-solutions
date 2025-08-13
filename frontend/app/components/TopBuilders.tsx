import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { topBuildersQuery } from '@/sanity/lib/queries'
import type { TopBuildersQueryResult } from '@/sanity.types'

export default async function TopBuilders() {
  const builders = await client.fetch<TopBuildersQueryResult>(topBuildersQuery)

  if (!builders || builders.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Top Builders Trust Brainchild
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leading construction companies across the region rely on our quality building components and exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center justify-items-center">
          {builders.map((builder) => (
            <Link
              key={builder._id}
              href={builder.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg bg-white border border-gray-200"
            >
              {builder.logo?.asset?.url && (
                <div className="relative w-24 h-16 md:w-32 md:h-20 lg:w-36 lg:h-24">
                  <Image
                    src={builder.logo.asset.url}
                    alt={builder.logo.alt || `${builder.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 144px"
                  />
                </div>
              )}
              <div className="mt-2 text-center">
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  {builder.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Join these industry leaders. Contact us to become a trusted partner.
          </p>
        </div>
      </div>
    </section>
  )
}