import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const projectsQuery = defineQuery(`
  *[_type == "project"] | order(completedDate desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    clientName,
    location,
    projectType,
    componentsSupplied[],
    "image": images[0],
    completedDate,
    featured
  }
`);

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({
    query: projectsQuery,
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Project Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the quality components we&apos;ve supplied for residential and commercial construction projects.
            From custom homes to large commercial buildings, we deliver materials that meet the highest standards.
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {project.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={urlForImage(project.image)?.width(400).height(300).url() || ''}
                      alt={project.image.alt || project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {project.location && (
                    <p className="text-sm text-gray-500 mb-2">
                      📍 {project.location}
                    </p>
                  )}

                  {project.projectType && (
                    <p className="text-sm text-blue-600 mb-3 capitalize">
                      {project.projectType.replace('-', ' ')}
                    </p>
                  )}

                  {project.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  {project.componentsSupplied && project.componentsSupplied.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Components Supplied:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.componentsSupplied.slice(0, 3).map((component: string, index: number) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {component}
                          </span>
                        ))}
                        {project.componentsSupplied.length > 3 && (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{project.componentsSupplied.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
                    >
                      View Project
                    </Link>
                    <Link
                      href="/contact"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Similar Project →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Project Gallery Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re currently building our project gallery. Check back soon to see examples of our work.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Start Your Project
            </Link>
          </div>
        )}

        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 mb-6">
            Let us supply the quality components for your next construction project.
            We work with builders across the region to deliver on time and on budget.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Get Project Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Projects | Construction Project Gallery",
  description: "View our gallery of successful construction projects. See the quality building components we&apos;ve supplied for residential and commercial construction.",
};
