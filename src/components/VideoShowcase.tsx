import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Heart, MessageCircle, Share, Eye } from "lucide-react";
import { Button } from "@/components/ui/shared";

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  likes: string;
  category: 'farm-tour' | 'recipe' | 'unboxing' | 'harvest' | 'farmer-story';
  aspectRatio: '16:9' | '9:16';
  // Enhanced premium features
  isLive?: boolean;
  comments?: number;
  shares?: number;
  featured?: boolean;
  tags?: string[];
}

// Enhanced video data with real demo videos
const featuredVideo: Video = {
  id: 0,
  title: "From Seed to Harvest: Our Organic Journey",
  description: "Watch how we grow the freshest organic produce using traditional farming methods passed down through generations. Experience the complete farm-to-table process.",
  thumbnail: "https://img.youtube.com/vi/yiw6_JakZFc/maxresdefault.jpg",
  videoUrl: "https://www.youtube.com/embed/yiw6_JakZFc",
  duration: "8:45",
  views: "2.1M",
  likes: "45K",
  comments: 1.2,
  shares: 8.5,
  category: 'farm-tour',
  aspectRatio: '16:9',
  featured: true,
  tags: ['organic', 'farming', 'sustainable', 'harvest'],
  isLive: false
};

const videoShorts: Video[] = [
  {
    id: 1,
    title: "Morning Harvest Fresh",
    description: "Fresh vegetables picked at dawn",
    thumbnail: "https://img.youtube.com/vi/2Vvl9l2o8nE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/2Vvl9l2o8nE",
    duration: "0:58",
    views: "1.2M",
    likes: "25K",
    comments: 456,
    shares: 1.2,
    category: 'harvest',
    aspectRatio: '9:16',
    tags: ['harvest', 'fresh', 'morning'],
    isLive: false
  },
  {
    id: 2,
    title: "5-Minute Healthy Recipe",
    description: "Quick organic salad in 5 minutes",
    thumbnail: "https://img.youtube.com/vi/B5rVFWMn8rY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/B5rVFWMn8rY",
    duration: "4:32",
    views: "890K",
    likes: "18K",
    comments: 234,
    shares: 567,
    category: 'recipe',
    aspectRatio: '9:16',
    tags: ['recipe', 'healthy', 'quick'],
    isLive: false
  },
  {
    id: 3,
    title: "Organic Food Unboxing",
    description: "Fresh delivery reactions",
    thumbnail: "https://img.youtube.com/vi/x7x1r8qY4lA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/x7x1r8qY4lA",
    duration: "12:45",
    views: "567K",
    likes: "12K",
    comments: 189,
    shares: 234,
    category: 'unboxing',
    aspectRatio: '9:16',
    tags: ['unboxing', 'delivery', 'customer'],
    isLive: false
  },
  {
    id: 4,
    title: "Farmer Interview",
    description: "Meet the people behind your food",
    thumbnail: "https://img.youtube.com/vi/8aGhZQkoFbQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/8aGhZQkoFbQ",
    duration: "15:23",
    views: "234K",
    likes: "8.5K",
    comments: 156,
    shares: 89,
    category: 'farmer-story',
    aspectRatio: '9:16',
    tags: ['farmer', 'story', 'interview'],
    isLive: false
  },
  {
    id: 5,
    title: "Sustainable Farming",
    description: "How we protect the environment",
    thumbnail: "https://img.youtube.com/vi/yiw6_JakZFc/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/yiw6_JakZFc",
    duration: "6:18",
    views: "445K",
    likes: "15K",
    comments: 234,
    shares: 156,
    category: 'farm-tour',
    aspectRatio: '9:16',
    tags: ['sustainability', 'environment', 'eco'],
    isLive: false
  }
];

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setIsMuted(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
    setIsMuted(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextShort = () => {
    setCurrentShortIndex((prev) => (prev + 1) % videoShorts.length);
  };

  const prevShort = () => {
    setCurrentShortIndex((prev) => (prev - 1 + videoShorts.length) % videoShorts.length);
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-secondary font-handwritten text-xl mb-2">📹 Our Story</p>
              <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
                Farm to Table Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Experience the passion and care that goes into every product through our video stories
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Featured Video */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.button
                      onClick={() => openVideoModal(featuredVideo)}
                      className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-2xl hover:bg-white transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-8 h-8 text-gray-800 fill-current" />
                    </motion.button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium">
                    {featuredVideo.duration}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    🌾 Featured
                  </div>

                  {/* Live Badge */}
                  {featuredVideo.isLive && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      LIVE
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {featuredVideo.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredVideo.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{featuredVideo.likes} likes</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => openVideoModal(featuredVideo)}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Video Shorts Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📱 Quick Stories</h3>

              <div className="space-y-3">
                {videoShorts.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => openVideoModal(video)}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[9/16] overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Play Button */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                          <Play className="w-5 h-5 text-gray-800 fill-current" />
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>

                      {/* Category Icon */}
                      <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-white p-1 rounded-full text-xs">
                        {video.category === 'harvest' && '🌾'}
                        {video.category === 'recipe' && '👨‍🍳'}
                        {video.category === 'unboxing' && '📦'}
                        {video.category === 'farmer-story' && '👥'}
                        {video.category === 'farm-tour' && '🚜'}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View More */}
              <div className="text-center pt-4">
                <Button variant="outline" className="w-full">
                  View All Videos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideoModal}
            />

            {/* Modal - Adaptive Layout */}
            <motion.div
              className={`bg-white shadow-2xl z-50 flex flex-col ${
                isMobile
                  ? 'fixed inset-x-0 bottom-0 rounded-t-xl max-h-[95vh]'
                  : 'fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-5xl max-h-[95vh]'
              }`}
              initial={{
                ...(isMobile
                  ? { y: "100%" }
                  : { opacity: 0, scale: 0.9, y: 50 }
                )
              }}
              animate={{
                ...(isMobile
                  ? { y: 0 }
                  : { opacity: 1, scale: 1, y: 0 }
                )
              }}
              exit={{
                ...(isMobile
                  ? { y: "100%" }
                  : { opacity: 0, scale: 0.9, y: 50 }
                )
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: isMobile ? 0.4 : 0.5
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Handle */}
              {isMobile && (
                <div className="flex justify-center py-2 pb-4">
                  <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
                </div>
              )}

              {/* Header - Mobile Optimized */}
              <div className={`flex items-center justify-between border-b bg-card ${
                isMobile ? 'px-4 py-2' : 'px-6 py-4'
              }`}>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-gray-900 line-clamp-1 ${
                    isMobile ? 'text-base' : 'text-xl'
                  }`}>
                    {selectedVideo.title}
                  </h3>
                  <p className={`text-gray-600 line-clamp-2 ${
                    isMobile ? 'text-xs leading-tight' : 'text-sm'
                  }`}>
                    {selectedVideo.description}
                  </p>
                </div>
                <button
                  onClick={closeVideoModal}
                  className={`hover:bg-muted rounded-full transition-colors ml-3 ${
                    isMobile ? 'p-2' : 'p-2'
                  }`}
                  aria-label="Close video"
                >
                  <X className={`${
                    isMobile ? 'w-5 h-5' : 'w-6 h-6'
                  }`} />
                </button>
              </div>

              {/* Video Player Area */}
              <div className="flex-1 bg-black relative">
                {/* Loading Skeleton */}
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-primary rounded-full animate-spin"></div>
                  </div>
                )}

                {/* YouTube Video Embed - Responsive Sizing */}
                <div className={`relative w-full h-full ${
                  isMobile ? 'max-h-[50vh]' : 'aspect-video'
                }`}>
                  {/* For horizontal videos (16:9) */}
                  {selectedVideo.aspectRatio === '16:9' && (
                    <iframe
                      src={`${selectedVideo.videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                      className={`w-full h-full ${isMobile ? 'aspect-video' : ''}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={() => setIsLoading(false)}
                    />
                  )}

                  {/* For vertical videos (9:16) - Shorts */}
                  {selectedVideo.aspectRatio === '9:16' && (
                    <div className={`flex items-center justify-center h-full ${
                      isMobile ? 'h-full' : 'max-h-[80vh]'
                    }`}>
                      <iframe
                        src={`${selectedVideo.videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                        className={`${
                          isMobile
                            ? 'w-full aspect-[9/16] max-w-none'
                            : 'w-auto max-w-md aspect-[9/16]'
                        }`}
                        style={{
                          maxHeight: isMobile ? '100%' : 'min(80vh, 600px)',
                        }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsLoading(false)}
                      />
                    </div>
                  )}

                  {/* Custom Controls Overlay - Only on Desktop */}
                  {!isMobile && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleMute}
                          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                          aria-label={isMuted ? "Unmute video" : "Mute video"}
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium">
                          {selectedVideo.duration}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm">
                          {selectedVideo.views} views
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Info & Actions - Bottom */}
              <div className={`border-t border-border ${
                isMobile ? 'p-4 space-y-3' : 'p-6'
              }`}>
                {/* Interaction Buttons */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-3 ${
                    isMobile ? 'gap-4' : 'gap-6'
                  }`}>
                    <button className={`flex items-center gap-2 hover:text-red-500 transition-colors ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      <Heart className={`${
                        isMobile ? 'w-4 h-4' : 'w-5 h-5'
                      }`} />
                      <span>{selectedVideo.likes}</span>
                    </button>
                    <button className={`flex items-center gap-2 hover:text-blue-500 transition-colors ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      <MessageCircle className={`${
                        isMobile ? 'w-4 h-4' : 'w-5 h-5'
                      }`} />
                      <span>Comments</span>
                    </button>
                    <button className={`flex items-center gap-2 hover:text-green-500 transition-colors ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      <Share className={`${
                        isMobile ? 'w-4 h-4' : 'w-5 h-5'
                      }`} />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Mobile Controls */}
                  {isMobile && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="bg-gray-100 p-1.5 rounded-full active:scale-95 transition-transform"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span className="text-xs text-gray-600 font-medium">
                        {selectedVideo.duration}
                      </span>
                    </div>
                  )}
                </div>

                {/* Navigation for Shorts */}
                {selectedVideo.aspectRatio === '9:16' && (
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={prevShort}
                      className={`hover:bg-muted rounded-full transition-colors ${
                        isMobile ? 'p-2' : 'p-2'
                      }`}
                      aria-label="Previous video"
                    >
                      <ChevronLeft className={`text-gray-600 ${
                        isMobile ? 'w-4 h-4' : 'w-5 h-5'
                      }`} />
                    </button>

                    <span className={`text-gray-600 font-medium ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>
                      {currentShortIndex + 1} of {videoShorts.length}
                    </span>

                    <button
                      onClick={nextShort}
                      className={`hover:bg-muted rounded-full transition-colors ${
                        isMobile ? 'p-2' : 'p-2'
                      }`}
                      aria-label="Next video"
                    >
                      <ChevronRight className={`text-gray-600 ${
                        isMobile ? 'w-4 h-4' : 'w-5 h-5'
                      }`} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoShowcase;
