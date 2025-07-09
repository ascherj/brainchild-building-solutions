import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/lib/api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export default function sanityImageLoader({ src, width, quality }) {
  // Handle external URLs (non-Sanity images) - pass through as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // Handle static images from /public directory - pass through as-is
  if (src.startsWith('/images/') || src.startsWith('/')) {
    return src;
  }

  // Handle Sanity image references
  // src can be either a reference string or a full image object
  let imageSource;

  if (typeof src === 'string') {
    // If it's a string, treat it as an asset reference
    imageSource = { asset: { _ref: src } };
  } else if (src && src.asset) {
    // If it's already an image object, use it directly
    imageSource = src;
  } else {
    // Fallback for invalid sources
    console.warn('Invalid image source:', src);
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNEg4MFYzNkg0MFYyNFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2Zz4K';
  }

  const imageUrl = imageBuilder
    .image(imageSource)
    .width(width)
    .quality(quality || 75)
    .auto('format');

  return imageUrl.url();
}
