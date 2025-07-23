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
  navigation{
    mainNavigation[]{
      title,
      slug,
      isExternal,
      order
    }
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
    whatSetsMarkApart,
    serviceArea
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
