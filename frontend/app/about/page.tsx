import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import CustomPortableText from "@/app/components/PortableText";
import Link from "next/link";
import { type PortableTextBlock } from "next-sanity";

const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    title,
    companyStory,
    missionStatement,
    teamMembers[]{
      name,
      role,
      bio,
      image{
        asset,
        alt
      }
    },
    certifications,
    yearsInBusiness,
    serviceArea
  }
`);

export default async function AboutPage() {
  const { data: aboutData } = await sanityFetch({
    query: aboutPageQuery,
  });

  // Fallback data based on the old website content
  const fallbackData = {
    title: "About Us",
    companyStory: [
      {
        _type: "block",
        _key: "company-story-1",
        style: "normal" as const,
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "Mark Ascher has been in this industry since 1989. You can have confidence knowing that he comes from a technical civil engineering background. Brainchild Building Solutions was founded in 2007 and has been a reliable supplier of trusses and building components for residential and commercial projects in the greater Maryland, D.C. and Virginia area. Why not trust an expert for your next job?",
            marks: [] as string[]
          }
        ]
      }
    ],
    missionStatement: "Better, more efficient designs, that save you money.",
    teamMembers: [
      {
        name: "Mark Ascher",
        role: "Founder & Owner",
        bio: "Civil engineer with over 30 years of experience in the building industry. Mark founded Brainchild Building Solutions in 2007 with a mission to provide reliable, efficient building components to contractors throughout the region."
      }
    ],
    certifications: ["Civil Engineering", "Building Component Specialist"],
    yearsInBusiness: 17,
    serviceArea: "Greater Maryland, D.C. and Virginia area"
  };

  const data = aboutData || fallbackData;

  const stats = [
    { number: "350", label: "Satisfied Clients" },
    { number: "32", label: "Years of Experience" },
    { number: "2,000", label: "Completed Projects" }
  ];

  const personalInterests = [
    "Riding his motorcycle",
    "Snowboarding",
    "Running marathons & triathlons (well...back in the day!)",
    "Hiking",
    "Enjoying the presence of his family and friends"
  ];

  const whatSetsMarkApart = [
    "His civil engineering background",
    "His 30 years of experience navigating this industry",
    "His repeat client rate",
    "His competitive rates & multiple supply options"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {data.title}
            </h1>
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {data.missionStatement}
                </h2>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">
                  Buy from someone you trust.
                </h3>
                                 <div className="text-lg leading-relaxed">
                   {data.companyStory && Array.isArray(data.companyStory) ? (
                     <CustomPortableText value={data.companyStory as PortableTextBlock[]} />
                   ) : (
                     <p>
                       Mark Ascher has been in this industry since 1989. You can have confidence knowing that he comes from a technical civil engineering background. Brainchild Building Solutions was founded in 2007 and has been a reliable supplier of trusses and building components for residential and commercial projects in the greater Maryland, D.C. and Virginia area. Why not trust an expert for your next job?
                     </p>
                   )}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-2">Some Cool Facts</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Numbers Speak For Themselves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get to Know Your Supplier */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Get to know your supplier:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                While Mark is not hard at work he enjoys...
              </h3>
              <ul className="space-y-3">
                {personalInterests.map((interest, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                What sets Mark apart...
              </h3>
                             <ul className="space-y-3">
                 {whatSetsMarkApart.map((item: string, index: number) => (
                   <li key={index} className="flex items-start">
                     <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                     <span className="text-gray-700">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Service Area & Certifications */}
      <div className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Service Area
              </h3>
              <p className="text-lg text-gray-600">
                {data.serviceArea}
              </p>
            </div>

            {data.certifications && data.certifications.length > 0 && (
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Certifications & Credentials
                </h3>
                                 <ul className="space-y-2">
                   {data.certifications.map((cert: string, index: number) => (
                     <li key={index} className="text-lg text-gray-600">
                       • {cert}
                     </li>
                   ))}
                 </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-blue-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Let&apos;s work together!
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "About Us - Brainchild Building Solutions",
  description: "Learn about Mark Ascher and Brainchild Building Solutions. Since 1989, providing reliable building components to contractors in Maryland, D.C. and Virginia.",
};
