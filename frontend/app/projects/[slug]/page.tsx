import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    clientName,
    location,
    projectType,
    componentsSupplied[],
    images[]{
      ...,
      alt,
      caption
    },
    completedDate,
    featured,
    testimonial->{
      _id,
      name,
      title,
      company,
      testimonialText,
      rating
    }
  }
`);

const relatedProjectsQuery = defineQuery(`
  *[_type == "project" && projectType == $projectType && slug.current != $slug] | order(completedDate desc) [0...3] {
    _id,
    title,
    slug,
    description,
    location,
    projectType,
    "image": images[0],
    completedDate
  }
`);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: project } = await sanityFetch({
    query: projectQuery,
    params: resolvedParams,
  });

  if (!project) {
    notFound();
  }

  const { data: relatedProjects = [] } = await sanityFetch({
    query: relatedProjectsQuery,
    params: { projectType: project.projectType, slug: resolvedParams.slug },
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
          <Link href="/projects" className="hover:text-gray-700">
            Projects
          </Link>
          <span>→</span>
          <span className="text-gray-900">{project.title}</span>
        </nav>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {project.location && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </span>
                )}
                {project.completedDate && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Completed {new Date(project.completedDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            {project.featured && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Featured Project
              </span>
            )}
          </div>

          {project.projectType && (
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
              {project.projectType.replace('-', ' ')}
            </div>
          )}
        </div>

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={urlForImage(project.images[0])?.width(600).height(400).url() || ''}
                  alt={project.images[0].alt || project.title}
                  fill
                  className="object-cover"
                />
              </div>
              {project.images[1] && (
                <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={urlForImage(project.images[1])?.width(600).height(400).url() || ''}
                    alt={project.images[1].alt || `${project.title} view 2`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {project.images.length > 2 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {project.images.slice(2, 6).map((image: any, index: number) => (
                  <div key={index} className="relative h-24 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={urlForImage(image)?.width(200).height(150).url() || ''}
                      alt={image.alt || `${project.title} view ${index + 3}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {project.description && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>
            )}

            {project.componentsSupplied && project.componentsSupplied.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Components Supplied
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.componentsSupplied.map((component: string, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 flex items-center"
                    >
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-800 font-medium">{component}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Client Testimonial
                </h2>
                <blockquote className="text-gray-700 italic mb-4 text-lg">
                  &ldquo;{project.testimonial.testimonialText}&rdquo;
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {project.testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {project.testimonial.title}
                      {project.testimonial.company && `, ${project.testimonial.company}`}
                    </p>
                  </div>
                  {project.testimonial.rating && (
                    <div className="ml-auto flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < project.testimonial.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Project Details
              </h3>
              <div className="space-y-3">
                {project.clientName && (
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="text-gray-900 font-medium">{project.clientName}</p>
                  </div>
                )}
                {project.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">{project.location}</p>
                  </div>
                )}
                {project.projectType && (
                  <div>
                    <p className="text-sm text-gray-500">Project Type</p>
                    <p className="text-gray-900 font-medium capitalize">
                      {project.projectType.replace('-', ' ')}
                    </p>
                  </div>
                )}
                {project.completedDate && (
                  <div>
                    <p className="text-sm text-gray-500">Completion Date</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(project.completedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Similar Project in Mind?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Get in touch to discuss how we can supply components for your next project.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Similar Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject: any) => (
                <div
                  key={relatedProject._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {relatedProject.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={urlForImage(relatedProject.image)?.width(300).height(200).url() || ''}
                        alt={relatedProject.image.alt || relatedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {relatedProject.title}
                    </h3>
                    {relatedProject.location && (
                      <p className="text-sm text-gray-500 mb-2">
                        📍 {relatedProject.location}
                      </p>
                    )}
                    {relatedProject.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {relatedProject.description}
                      </p>
                    )}
                    <Link
                      href={`/projects/${relatedProject.slug.current}`}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      View Project →
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
  const projects = await sanityFetch({
    query: defineQuery(`*[_type == "project" && defined(slug.current)]{
      "slug": slug.current
    }`),
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });

  return projects.data?.map((project: any) => ({
    slug: project.slug,
  })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: project } = await sanityFetch({
    query: projectQuery,
    params: resolvedParams,
  });

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Construction Projects`,
    description: project.description || `${project.title} - A construction project showcasing our building component supply services.`,
  };
}
