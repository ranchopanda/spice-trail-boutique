import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollAnimationWrapper, StaggerWrapper } from "@/components/ui/scroll-animation-wrapper";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Farm Fresh Harvest Tour",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=500&fit=crop",
    duration: "2:30",
    category: "Farm Tour"
  },
  {
    id: 2,
    title: "Organic Cooking Recipe",
    thumbnail: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&h=500&fit=crop",
    duration: "3:15",
    category: "Recipe"
  },
  {
    id: 3,
    title: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&h=500&fit=crop",
    duration: "1:45",
    category: "BTS"
  },
  {
    id: 4,
    title: "Product Packaging Process",
    thumbnail: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&h=500&fit=crop",
    duration: "2:00",
    category: "Process"
  }
];

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Sample video URLs (replace with your actual video URLs)
  const getVideoUrl = (videoId: number): string => {
    // For demo purposes - replace with actual video URLs
    const demoUrls: Record<number, string> = {
      1: "https://www.w3schools.com/html/mov_bbb.mp4", // Farm tour
      2: "https://www.w3schools.com/html/mov_bbb.mp4", // Recipe video
      3: "https://www.w3schools.com/html/movie.mp4",   // BTS video
      4: "https://www.w3schools.com/html/mov_bbb.mp4", // Packaging process
    };
    return demoUrls[videoId] || "https://www.w3schools.com/html/mov_bbb.mp4";
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper className="text-center mb-12" animation="fadeInUp">
            <p className="text-secondary font-handwritten text-xl mb-2">Watch & Learn</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
              Our Story in Motion
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get an inside look at our farm, recipes, and the journey from farm to table
            </p>
          </ScrollAnimationWrapper>

          <StaggerWrapper className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail with overlay */}
                <motion.img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Animated Play button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:bg-secondary transition-all duration-300 shadow-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Play className="w-8 h-8 text-primary group-hover:text-white fill-current" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Video info with smooth slide up */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 transform"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-white font-semibold text-sm mb-1">{video.title}</p>
                  <motion.div
                    className="flex items-center justify-between text-white/80 text-xs"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.span
                      className="bg-secondary/80 px-2 py-1 rounded shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {video.category}
                    </motion.span>
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {video.duration}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Hover effect border */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/50 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: [1, 1.02, 1],
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                />
              </motion.div>
            ))}
          </StaggerWrapper>

          <ScrollAnimationWrapper className="text-center mt-12" animation="scaleIn" delay={0.3}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <p className="text-primary font-semibold cursor-pointer hover:text-secondary transition-colors">
                🎥 View All Videos
              </p>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Enhanced Video Modal with React Player */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black border-none shadow-2xl">
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => {
                setSelectedVideo(null);
                setIsPlaying(false);
              }}
              className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Volume control */}
            <motion.button
              onClick={() => setMuted(!muted)}
              className="absolute top-4 right-16 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </motion.button>

            {/* Video player - Replace with actual video URLs */}
            <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
              {selectedVideo && (
                <>
                  <motion.div
                    className="w-full h-full flex items-center justify-center text-white text-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm rounded-full p-8 mb-6 mx-auto w-fit"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="w-16 h-16 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                      <p className="text-white/80 mb-4">Video player implementation ready</p>
                      <p className="text-sm text-white/60">
                        Replace with React Player or video element using: <br />
                        <code className="bg-white/10 px-2 py-1 rounded text-xs">
                          {getVideoUrl(selectedVideo.id)}
                        </code>
                      </p>
                    </div>
                  </motion.div>

                  {/* Play overlay for click to play */}
                  {!isPlaying && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 cursor-pointer"
                      onClick={() => setIsPlaying(true)}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm rounded-full p-6"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="w-12 h-12 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Video info footer */}
            {selectedVideo && (
              <motion.div
                className="bg-white p-6 rounded-b-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedVideo.title}
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {selectedVideo.category}
                      </span>
                      <span className="text-gray-600 text-sm flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {selectedVideo.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Experience the heart of our organic farm through this immersive video tour.
                      See how we cultivate the freshest produce using sustainable practices.
                    </p>
                  </div>

                  <motion.button
                    className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors ml-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🍳 Shop This Recipe
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoShowcase;
