import { useState } from "react";
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

      {/* Video Modal */}
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

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl mx-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{selectedVideo.title}</h3>
                    <p className="text-sm text-gray-600">{selectedVideo.description}</p>
                  </div>
                  <button
                    onClick={closeVideoModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Video Player Area */}
                <div className="relative bg-black">
                  {/* YouTube Video Embed */}
                  <div className={`relative ${
                    selectedVideo.aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16] max-w-sm mx-auto'
                  }`}>
                    <iframe
                      src={`${selectedVideo.videoUrl}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />

                    {/* Custom Play/Pause Overlay */}
                    {!isPlaying && (
                      <motion.button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full">
                          <Play className="w-8 h-8 text-gray-800 fill-current" />
                        </div>
                      </motion.button>
                    )}

                    {/* Custom Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleMute}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                          {selectedVideo.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                          {selectedVideo.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{selectedVideo.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">Comments</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                        <Share className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Navigation for Shorts */}
                  {selectedVideo.aspectRatio === '9:16' && (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={prevShort}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>

                      <span className="text-sm text-gray-600">
                        {currentShortIndex + 1} of {videoShorts.length}
                      </span>

                      <button
                        onClick={nextShort}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoShowcase;
