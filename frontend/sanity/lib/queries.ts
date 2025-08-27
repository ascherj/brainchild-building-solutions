import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  ...,
  logo{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  businessName,
  contactInfo
}`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage{
    asset->{
      _id,
      url,
      metadata{
        dimensions{
          width,
          height
        }
      }
    },
    alt
  },
  "date": coalesce(date, _updatedAt),
  "author": author->{
    firstName,
    lastName,
    picture{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    }
  },
`;

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    title,
    companyStory,
    missionStatement,
    heroImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    },
    teamMembers[]{
      name,
      role,
      bio,
      image{
        asset->{
          _id,
          url,
          metadata{
            dimensions{
              width,
              height
            }
          }
        },
        alt
      }
    },
    certifications,
    markStartedYear,
    companyEstablishedYear,
    personalInterests,
    whatSetsMarkApart
  }
`);

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    title,
    subtitle,
    formTitle,
    contactInfoTitle,
    whyChooseUsTitle,
    benefits,
    callToActionText,
    heroImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    },
    seoTitle,
    seoDescription
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(featured desc, date desc, _createdAt desc) {
    _id,
    authorName,
    authorTitle,
    quote,
    image{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    },
    rating,
    featured,
    date
  }
`);

export const topBuildersQuery = defineQuery(`
  *[_type == "topBuilder"] | order(order asc, name asc) {
    _id,
    name,
    logo{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    },
    website,
    order
  }
`);

export const productsQuery = defineQuery(`
  *[_type == "product"] | order(category asc, order asc, name asc) {
    _id,
    name,
    slug,
    category,
    description,
    "image": galleryImages[0],
    featured,
    leadTime,
    applications[]
  }
`);

export const galleryQuery = defineQuery(`
  *[_type == "gallery"] | order(_createdAt desc) {
    _id,
    caption,
    image{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    }
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    heroTitle,
    heroSubtitle,
    heroImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      },
      alt
    },
    heroCallToAction{
      text,
      link
    },
    trustSection{
      heading,
      content,
      callToAction{
        text,
        link
      }
    },
    servicesSection{
      heading,
      subtitle,
      services[]{
        title,
        description,
        icon
      }
    },
    finalCallToAction{
      heading,
      subtitle,
      primaryButton{
        text,
        link
      },
      secondaryButton{
        text,
        link
      }
    },
    sections[]{
      ...,
      _type == "callToAction" => {
        heading,
        text,
        buttonText,
        link{
          ...,
          ${linkReference}
        }
      },
      _type == "infoSection" => {
        heading,
        subheading,
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      _type == "featuredProducts" => {
        title,
        products[]->{
          _id,
          title,
          slug,
          description,
          image{
            asset->{
              _id,
              url,
              metadata{
                dimensions{
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      },
      _type == "featuredTestimonials" => {
        title,
        testimonials[]->{
          _id,
          authorName,
          authorTitle,
          quote,
          rating,
          image{
            asset->{
              _id,
              url,
              metadata{
                dimensions{
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      }
    }
  }
`);

// Product queries
export const productQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    category,
    description,
    specsRichText,
    galleryImages[]{
      ...,
      alt,
      caption
    },
    leadTime,
    suppliers[],
    applications[],
    featured
  }
`);

export const relatedProductsQuery = defineQuery(`
  *[_type == "product" && category == $category && slug.current != $slug] | order(order asc, name asc) [0...3] {
    _id,
    name,
    slug,
    category,
    description,
    "image": galleryImages[0]
  }
`);
