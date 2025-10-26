// Demo assets utility for fallback images and videos
// Ensures app works when admin doesn't provide URLs

export const DEMO_ASSETS = {
  images: {
    hero: "/assets/hero-farm.jpg",
    grains: "/assets/products-grains.jpg",
    spices: "/assets/products-spices.jpg",
    vegetables: "/assets/products-vegetables.jpg",
    placeholder: "/placeholder.svg"
  },
  videos: {
    farmTour: "https://player.vimeo.com/external/371433849.sd.mp4?s=12345"
  }
} as const;

export type AssetCategory = keyof typeof DEMO_ASSETS.images;

/**
 * Get fallback image based on category or use hero image as default
 */
export const getDemoImage = (category?: string): string => {
  if (!category) return DEMO_ASSETS.images.hero;

  const categoryKey = category.toLowerCase();
  if (categoryKey in DEMO_ASSETS.images) {
    return DEMO_ASSETS.images[categoryKey as AssetCategory];
  }

  return DEMO_ASSETS.images.hero;
};

/**
 * Get sequence of demo images for cycling through products
 */
export const getProductImages = (): string[] => [
  DEMO_ASSETS.images.vegetables,
  DEMO_ASSETS.images.grains,
  DEMO_ASSETS.images.spices
];

/**
 * Cycle through product images based on index
 */
export const getProductImageByIndex = (index: number): string => {
  const productImages = getProductImages();
  return productImages[index % productImages.length];
};

/**
 * Get fallback video for hero/farm content
 */
export const getDemoVideo = (): string | undefined => {
  return DEMO_ASSETS.videos.farmTour;
};

/**
 * Get YouTube-style thumbnail fallback
 */
export const getDemoVideoThumbnail = (category: string = 'farm'): string => {
  return getDemoImage(category);
};

/**
 * Safe image loading with fallback
 */
export const safeImageUrl = (url: string | undefined, fallback: string): string => {
  return url || fallback;
};

/**
 * Safe video loading with fallback
 */
export const safeVideoUrl = (url: string | undefined): string | undefined => {
  return url || getDemoVideo();
};

/**
 * Get testimonial thumbnail with proper fallback logic
 */
export const getTestimonialThumbnail = (
  videoThumbnail: string | undefined,
  image: string | undefined
): string => {
  return videoThumbnail || image || DEMO_ASSETS.images.hero;
};

/**
 * Get Instagram post images - cycle through demo images
 */
export const getInstagramDemoImages = (): string[] => [
  DEMO_ASSETS.images.hero,
  DEMO_ASSETS.images.vegetables,
  DEMO_ASSETS.images.grains,
  DEMO_ASSETS.images.spices
];
