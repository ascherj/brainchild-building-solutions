
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";
import GalleryClient from "./GalleryClient";

const galleryQuery = defineQuery(`
  *[_type == "gallery"] | order(featured desc, displayOrder asc, _createdAt desc) {
    _id,
    title,
    description,
    image{
      ...,
      alt,
      caption
    },
    category,
    featured,
    location,
    dateTaken
  }
`);


export default async function GalleryPage() {
  const { data: photos } = await sanityFetch({
    query: galleryQuery,
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our work through photos of building components, construction sites, and completed projects.
            See the quality materials and craftsmanship that define Brainchild Building Solutions.
          </p>
        </div>

        {/* Gallery Client Component */}
        <GalleryClient photos={photos || []} />

        {/* Call to Action */}
        <div className="bg-green-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-gray-600 mb-6">
            Let us supply the quality components for your next construction project.
            We work with builders across the region to deliver materials that meet the highest standards.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Get Project Quote
          </Link>
        </div>
      </div>

    </div>
  );
}

export const metadata = {
  title: "Photo Gallery | Brainchild Building Solutions",
  description: "Browse our photo gallery showcasing building components, construction projects, and quality materials supplied across Maryland, DC, and Virginia.",
};