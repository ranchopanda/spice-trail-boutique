import { motion } from "framer-motion";

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
    {/* Image Skeleton */}
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      {/* Badge Skeletons */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse" />
        <div className="w-12 h-6 bg-red-300 rounded-full animate-pulse" />
      </div>
      <div className="absolute top-3 right-3 w-20 h-6 bg-green-300 rounded-full animate-pulse" />
    </div>

    {/* Content Skeleton */}
    <div className="p-6 relative z-10 bg-white/80 backdrop-blur-sm">
      {/* Category Badge */}
      <div className="w-20 h-5 bg-gray-200 rounded-full animate-pulse mb-3" />

      {/* Title */}
      <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-2" />

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
        <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>

      {/* Price and Button */}
      <div className="flex items-center justify-between">
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-16 h-8 bg-green-200 rounded animate-pulse" />
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

// Video Showcase Skeleton
export const VideoShowcaseSkeleton = () => (
  <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/20">
    <div className="container mx-auto px-4">
      {/* Section Header Skeleton */}
      <div className="text-center mb-12">
        <div className="w-32 h-6 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
        <div className="w-96 h-10 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
        <div className="w-[500px] h-6 bg-gray-200 rounded animate-pulse mx-auto" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Featured Video Skeleton */}
        <div className="lg:col-span-2">
          <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Video Thumbnail Skeleton */}
            <div className="relative aspect-video overflow-hidden bg-gray-200">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              {/* Play Button Skeleton */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/50 rounded-full animate-pulse" />
              </div>
              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4 w-12 h-6 bg-black/50 rounded animate-pulse" />
              {/* Category Badge */}
              <div className="absolute top-4 left-4 w-20 h-6 bg-primary/50 rounded-full animate-pulse" />
            </div>

            {/* Video Info Skeleton */}
            <div className="p-6">
              <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse mb-4" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-24 h-8 bg-primary/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Shorts Grid Skeleton */}
        <div className="space-y-4">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4" />

          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="group relative bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Thumbnail Skeleton */}
                <div className="relative aspect-[9/16] overflow-hidden bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/50 rounded-full animate-pulse" />
                  </div>
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 w-10 h-4 bg-black/50 rounded animate-pulse" />
                  {/* Category Icon */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-primary/50 rounded-full animate-pulse" />
                </div>

                {/* Info Skeleton */}
                <div className="p-3">
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="w-full h-3 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* View More Button Skeleton */}
          <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </section>
);

// Instagram Feed Skeleton
export const InstagramFeedSkeleton = () => (
  <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/20 to-background">
    <div className="container mx-auto px-4">
      {/* Section Header Skeleton */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-pink-200 rounded animate-pulse" />
          <div className="w-40 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="w-48 h-10 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
        <div className="w-[500px] h-6 bg-gray-200 rounded animate-pulse mx-auto" />
      </div>

      {/* Instagram Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-2xl bg-gray-200">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            {/* Timestamp Badge */}
            <div className="absolute top-3 right-3 w-12 h-5 bg-black/50 rounded-full animate-pulse" />
            {/* Product Badge */}
            <div className="absolute bottom-3 right-3 w-16 h-5 bg-primary/50 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Call to Action Skeleton */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-1" />
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="w-40 h-10 bg-pink-200 rounded animate-pulse" />
            <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hashtag Cloud Skeleton */}
      <div className="text-center mt-12">
        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-24 h-6 bg-primary/20 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Testimonials Carousel Skeleton
export const TestimonialsCarouselSkeleton = () => (
  <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/30">
    <div className="container mx-auto px-4">
      {/* Section Header Skeleton */}
      <div className="text-center mb-12">
        <div className="w-32 h-6 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
        <div className="w-80 h-10 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
        <div className="w-[600px] h-6 bg-gray-200 rounded animate-pulse mx-auto" />
      </div>

      {/* Carousel Skeleton */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                {/* Video/Image Section */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/50 rounded-full animate-pulse" />
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 w-12 h-5 bg-black/50 rounded animate-pulse" />
                  {/* Video Icon */}
                  <div className="absolute top-2 left-2 w-16 h-6 bg-red-200 rounded animate-pulse" />
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex-1">
                    <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="w-5 h-5 bg-green-200 rounded-full animate-pulse" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>

                {/* Comment */}
                <div className="space-y-2 mb-4">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Button */}
                <div className="w-24 h-8 bg-primary/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons Skeleton */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Trust Badges Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="text-center">
            <div className="w-20 h-10 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Newsletter Popup Skeleton
export const NewsletterPopupSkeleton = () => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative w-full max-w-lg mx-4">
      {/* Close Button Skeleton */}
      <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-200 rounded-full animate-pulse" />

      {/* Split Layout Skeleton */}
      <div className="grid lg:grid-cols-2 min-h-[500px]">
        {/* Left: Visual Skeleton */}
        <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8 flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-green-200 rounded-full animate-pulse" />
          <div className="absolute top-16 right-12 w-3 h-3 bg-blue-200 rounded-full animate-pulse" />
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-purple-200 rounded-full animate-pulse" />

          {/* Main Visual Skeleton */}
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-full animate-pulse" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-200 rounded-full animate-pulse" />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="w-24 h-10 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>

          {/* Floating Icons */}
          <div className="absolute top-20 left-8 w-6 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="absolute bottom-20 right-8 w-6 h-6 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Right: Form Skeleton */}
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-6">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            <div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse pl-10" />
              </div>
            </div>

            <div className="w-full h-12 bg-green-200 rounded-lg animate-pulse" />
          </div>

          <div className="mt-6 text-center">
            <div className="w-48 h-3 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Generic shimmer loading effect
export const ShimmerLoader = ({ className = "", width = "w-full", height = "h-4" }: {
  className?: string;
  width?: string;
  height?: string;
}) => (
  <div className={`${width} ${height} ${className}`}>
    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded" />
  </div>
);

// Loading dots animation
export const LoadingDots = ({ className = "" }: { className?: string }) => (
  <div className={`flex space-x-1 ${className}`}>
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="w-2 h-2 bg-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: index * 0.2,
        }}
      />
    ))}
  </div>
);
