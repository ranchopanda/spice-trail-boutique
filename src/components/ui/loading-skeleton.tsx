import { motion } from "framer-motion";

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const ProductSkeleton = () => (
  <motion.div
    className="bg-card rounded-lg shadow-sm border p-4"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Skeleton className="aspect-square w-full rounded-lg mb-4" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3 w-1/2 mb-3" />
    <Skeleton className="h-8 w-full rounded-full" />
  </motion.div>
);

const RecipeSkeleton = () => (
  <motion.div
    className="bg-card rounded-xl overflow-hidden shadow-sm border"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Skeleton className="aspect-video w-full" />
    <div className="p-4">
      <Skeleton className="h-5 w-4/5 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-1" />
      <div className="flex items-center gap-2 mt-3">
        <Skeleton className="h-3 w-6 rounded-full" />
        <Skeleton className="h-3 w-8 rounded-full" />
        <Skeleton className="h-3 w-10 rounded-full" />
      </div>
    </div>
  </motion.div>
);

const CategoryGridSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <motion.div
        key={index}
        className="bg-card rounded-lg p-6 text-center shadow-sm border"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
      >
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
        <Skeleton className="h-4 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-3 w-full" />
      </motion.div>
    ))}
  </div>
);

const VideoGridSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
    {Array.from({ length: 4 }).map((_, index) => (
      <motion.div
        key={index}
        className="aspect-square rounded-lg overflow-hidden border bg-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
      >
        <Skeleton className="w-full h-full" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="bg-white/20 rounded-full p-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-8 h-8 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    ))}
  </div>
);

const InstagramFeedSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
    {Array.from({ length: 6 }).map((_, index) => (
      <motion.div
        key={index}
        className="aspect-square rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
      >
        <Skeleton className="w-full h-full" />
        <div className="absolute top-2 right-2 bg-gray-400/60 text-white rounded-full p-1">
          <div className="w-3 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    ))}
  </div>
);

const HeroSkeleton = () => (
  <section className="relative h-[600px] lg:h-[700px] w-full overflow-hidden">
    <Skeleton className="absolute inset-0" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
    <div className="relative container mx-auto px-4 h-full flex items-center">
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="h-12 w-16" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-12 w-16" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-12 w-16" />
        </div>
      </div>
    </div>
  </section>
);

export {
  Skeleton,
  ProductSkeleton,
  RecipeSkeleton,
  CategoryGridSkeleton,
  VideoGridSkeleton,
  InstagramFeedSkeleton,
  HeroSkeleton,
};
