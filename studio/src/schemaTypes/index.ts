import {aboutPage} from './documents/aboutPage'
import {contactPage} from './documents/contactPage'
import {homePage} from './documents/homePage'
import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {product} from './documents/product'
import {project} from './documents/project'
import {service} from './documents/service'
import {testimonial} from './documents/testimonial'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  homePage,
  aboutPage,
  contactPage,
  page,
  product,
  project,
  service,
  testimonial,
  // Legacy documents (can be removed if not needed)
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
]
