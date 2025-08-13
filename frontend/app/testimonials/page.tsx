import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

export default async function TestimonialsPage() {
  const { data: testimonials } = await sanityFetch({
    query: testimonialsQuery,
  });


  // Fallback testimonials data
  const fallbackTestimonials = [
    {
      _id: "1",
      authorName: "John Smith",
      authorTitle: "General Contractor - Smith Construction",
      quote: "Brainchild Building Solutions has been our go-to supplier for trusses for over 5 years. Mark's expertise and reliability have saved us time and money on countless projects. His engineering background really shows in the quality of his recommendations.",
      rating: 5,
      featured: true,
      date: "2024-01-15"
    },
    {
      _id: "2",
      authorName: "Sarah Johnson",
      authorTitle: "Project Manager - Elite Builders",
      quote: "Working with Mark has been a game-changer for our custom home projects. His value engineering approach helps us optimize designs while staying within budget. The quality of components is consistently excellent.",
      rating: 5,
      featured: false,
      date: "2024-02-20"
    },
    {
      _id: "3",
      authorName: "Mike Rodriguez",
      authorTitle: "Owner - Rodriguez Commercial Construction",
      quote: "For our multi-family and commercial projects, Brainchild delivers exactly what we need, when we need it. Mark's technical knowledge and attention to detail give us confidence in every delivery.",
      rating: 5,
      featured: false,
      date: "2024-03-10"
    }
  ];

  const testimonialData = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const featuredTestimonials = testimonialData.filter((t: any) => t.featured);
  const regularTestimonials = testimonialData.filter((t: any) => !t.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Client Testimonials
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto">
              See what our clients say about working with Brainchild Building Solutions
            </p>
            <div className="text-base md:text-lg text-blue-200">
              Trusted by contractors across Maryland, D.C., and Virginia
            </div>
          </div>
        </div>
      </div>

      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <div className="py-16 md:py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Featured Reviews
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Highlighted feedback from our valued clients
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTestimonials.map((testimonial: any) => (
                <div key={testimonial._id} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg border-l-4 border-blue-600">
                  <div className="flex items-center mb-6">
                    {testimonial.image?.asset?.url && (
                      <div className="w-16 h-12 rounded-lg overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                        <Image
                          src={testimonial.image.asset.url}
                          alt={testimonial.image.alt || testimonial.authorName}
                          width={64}
                          height={48}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {testimonial.authorName}
                      </h3>
                      {testimonial.authorTitle && (
                        <p className="text-sm text-gray-600">
                          {testimonial.authorTitle}
                        </p>
                      )}
                      {testimonial.rating && (
                        <div className="flex mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                  <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  {testimonial.date && (
                    <div className="text-sm text-gray-500 mt-4">
                      {new Date(testimonial.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Testimonials */}
      <div className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              What Our Clients Say
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Real feedback from contractors who trust us with their projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularTestimonials.map((testimonial: any) => (
              <div key={testimonial._id} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {testimonial.image?.asset?.url && (
                    <div className="w-12 h-9 rounded-lg overflow-hidden mr-3 bg-gray-100 flex-shrink-0">
                      <Image
                        src={testimonial.image.asset.url}
                        alt={testimonial.image.alt || testimonial.authorName}
                        width={48}
                        height={36}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {testimonial.authorName}
                    </h3>
                    {testimonial.authorTitle && (
                      <p className="text-sm text-gray-600">
                        {testimonial.authorTitle}
                      </p>
                    )}
                  </div>
                </div>

                {testimonial.rating && (
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                )}

                <blockquote className="text-sm md:text-base text-gray-700 leading-relaxed italic mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {testimonial.date && (
                  <div className="text-xs text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Trusted by Professionals
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                350+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Satisfied Clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                35+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                2,000+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                98%
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 md:py-20 bg-blue-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Ready to join our satisfied clients?
          </h2>
          <p className="text-lg md:text-xl text-blue-200 mb-8 leading-relaxed">
            Get a quote for your next project and experience the Brainchild difference
          </p>
          <Link
            href="/contact"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            GET YOUR QUOTE
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Client Testimonials - Brainchild Building Solutions",
  description: "Read what our clients say about working with Brainchild Building Solutions. Trusted by contractors across Maryland, D.C., and Virginia for reliable building components.",
};
