import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery } from "@/sanity/lib/queries";
import CustomPortableText from "@/app/components/PortableText";
import Link from "next/link";
import { type PortableTextBlock } from "next-sanity";

export default async function AboutPage() {
  const { data: aboutData } = await sanityFetch({
    query: aboutPageQuery,
  });

  // Fallback data based on the updated about content
  const fallbackData = {
    title: "About",
    companyStory: [
      {
        _type: "block",
        _key: "company-story-1",
        style: "normal" as const,
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "As a civil engineering graduate from Northeastern University (BS '87), my career evolved from a foundational understanding of large-scale infrastructure to a deep specialization in floor and roof truss systems. This unique path has equipped me with a comprehensive perspective on structural design. Mark has been doing this work since 1989 and founded Brainchild in 2007.",
            marks: [] as string[]
          }
        ]
      },
      {
        _type: "block",
        _key: "company-story-2",
        style: "normal" as const,
        children: [
          {
            _type: "span",
            _key: "span-2",
            text: "I offer dedicated consulting services for high-end custom builders, as well as commercial and multi-family projects, focusing on more than just supplying trusses. My true enjoyment comes from fostering strong relationships with clients, architects, and engineers. I'm here to collaboratively value engineer your designs, helping you find the smartest, most economical structural solutions that perfectly align with your project's aesthetic and performance requirements. Let's build efficiently, without compromise.",
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
    markStartedYear: 1989,
    companyEstablishedYear: 2007,
    personalInterests: [
      "Summitted Mount Kilimanjaro (even with altitude sickness!)",
      "Ridden motorcycles off-road in Alaska, Baja, and Nepal",
      "Snowboarded with family in Switzerland and the Rockies",
      "Ran the Boston Marathon",
      "Embracing outdoor adventures that fuel determination"
    ],
    whatSetsMarkApart: [
      "Civil engineering background from Northeastern University",
      "35+ years of experience since 1989",
      "Deep specialization in floor and roof truss systems",
      "Collaborative value engineering approach",
      "Strong relationships with clients, architects, and engineers"
    ]
  };

  const data = aboutData || fallbackData;

  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - (data.markStartedYear || 1989);

  const stats = [
    { number: "350", label: "Satisfied Clients" },
    { number: yearsOfExperience.toString(), label: "Years of Experience" },
    { number: "2,000", label: "Completed Projects" }
  ];

  const personalInterests = data.personalInterests || [
    "Summitted Mount Kilimanjaro (even with altitude sickness!)",
    "Ridden motorcycles off-road in Alaska, Baja, and Nepal",
    "Snowboarded with family in Switzerland and the Rockies",
    "Ran the Boston Marathon",
    "Embracing outdoor adventures that fuel determination"
  ];

  const whatSetsMarkApart = data.whatSetsMarkApart || [
    "Civil engineering background from Northeastern University",
    "35+ years of experience since 1989",
    "Deep specialization in floor and roof truss systems",
    "Collaborative value engineering approach",
    "Strong relationships with clients, architects, and engineers"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {data.title}
            </h1>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16 text-left">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                  {data.missionStatement}
                </h2>
              </div>
              <div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-4 text-yellow-400">
                    Buy from someone you trust.
                  </h3>
                  <div className="text-base md:text-lg leading-relaxed text-white [&>*]:text-white [&_strong]:text-white [&_p]:text-white">
                    {data.companyStory && Array.isArray(data.companyStory) ? (
                      <div className="text-white [&>*]:text-white [&_p]:text-white [&_span]:text-white">
                        <CustomPortableText value={data.companyStory as PortableTextBlock[]} />
                      </div>
                    ) : (
                      <>
                        <p className="mb-4 text-white">
                          <strong className="text-white">Mark Ascher has been in this industry since 1989.</strong> You can have confidence knowing that he comes from a technical civil engineering background.
                        </p>
                        <p className="text-white">
                          Brainchild Building Solutions was founded in 2007 and has been a reliable supplier of trusses and building components for residential and commercial projects in the greater Maryland, D.C. and Virginia area. <strong className="text-white">Why not trust an expert for your next job?</strong>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <p className="text-base md:text-lg text-gray-600 mb-3 uppercase tracking-wide font-medium">Some Cool Facts</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Numbers Speak For Themselves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-3 leading-none">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get to Know Your Supplier */}
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Get to know your supplier:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 leading-tight">
                Beyond the Office
              </h3>
              <ul className="space-y-3">
                {personalInterests.map((interest: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 leading-tight">
                What sets Mark apart...
              </h3>
              <ul className="space-y-3">
                {whatSetsMarkApart.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight">
                Certifications & Credentials
              </h3>
              <ul className="space-y-2 max-w-md mx-auto">
                {data.certifications.map((cert: string, index: number) => (
                  <li key={index} className="text-base md:text-lg text-gray-600 leading-relaxed">
                    • {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="py-12 md:py-16 bg-blue-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
            Let&apos;s work together!
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
