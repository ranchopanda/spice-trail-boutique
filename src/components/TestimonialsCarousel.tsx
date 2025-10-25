<<<<<<< HEAD
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
=======
import { Card, CardContent } from "@/components/ui/shared";
>>>>>>> 8655cd6cf10711dafb5577c27fd18daac38b14c2
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
<<<<<<< HEAD
} from "@/components/ui/carousel";
import { Star, Play, Pause, Volume2, VolumeX, X, CheckCircle, Award, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/shared";
=======
} from "@/components/ui/shared";
import { Star } from "lucide-react";
>>>>>>> 8655cd6cf10711dafb5577c27fd18daac38b14c2

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
  isVideo?: boolean;
  videoThumbnail?: string;
  videoDuration?: string;
  verified?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Home Chef",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    comment: "The freshness and quality of vegetables is unmatched! My family loves the taste, and I feel good knowing we're eating truly organic produce.",
    isVideo: true,
    videoThumbnail: "/assets/products-vegetables.jpg",
    videoDuration: "0:45",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    comment: "As someone conscious about nutrition, I appreciate the transparency and quality. The grains and pulses are exceptional!",
    verified: true
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Working Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Convenient delivery and amazing products. The preserves and pickles remind me of my grandmother's recipes. Absolutely authentic!",
    isVideo: true,
    videoThumbnail: "/assets/products-spices.jpg",
    videoDuration: "1:12",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    comment: "We source ingredients for our restaurant from here. The consistency in quality and the farm-fresh taste makes all the difference!",
    verified: true
  },
  {
    id: 5,
    name: "Meera Patel",
    role: "Nutritionist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    rating: 5,
    comment: "I recommend Natural Harvest to all my clients. The nutrient density and quality standards are exactly what we need for optimal health.",
    isVideo: true,
    videoThumbnail: "/assets/products-grains.jpg",
    videoDuration: "2:30",
    verified: true
  }
];

const TestimonialsCarousel = () => {
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const openVideoModal = (testimonial: Testimonial) => {
    if (testimonial.isVideo) {
      setSelectedVideo(testimonial);
      setIsPlaying(false);
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-handwritten text-xl mb-2">What People Say</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
              Customer Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy customers who trust us for their daily organic needs
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-[var(--shadow-hover)] transition-all duration-300 animate-scale-in group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      {/* Video/Image Section */}
                      <div className="relative mb-4">
                        {testimonial.isVideo ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={testimonial.videoThumbnail}
                              alt={`${testimonial.name} testimonial`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <motion.button
                                onClick={() => openVideoModal(testimonial)}
                                className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Play className="w-6 h-6 text-gray-800 fill-current" />
                              </motion.button>
                            </div>
                            {/* Duration Badge */}
                            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
                              {testimonial.videoDuration}
                            </div>
                            {/* Video Icon */}
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                              VIDEO
                            </div>
                          </div>
                        ) : (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full aspect-video object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>

                      {/* Profile Section */}
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-secondary"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            {testimonial.verified && (
                              <CheckCircle className="w-4 h-4 text-green-500" title="Verified Purchase" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        "{testimonial.comment}"
                      </p>

                      {/* Video Play Button for Mobile */}
                      {testimonial.isVideo && (
                        <div className="mt-4 flex justify-center">
                          <Button
                            size="sm"
                            onClick={() => openVideoModal(testimonial)}
                            className="bg-primary hover:bg-primary/90 text-white"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch Video
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex">
              <span>Previous</span>
            </CarouselPrevious>
            <CarouselNext className="hidden md:flex">
              <span>Next</span>
            </CarouselNext>
          </Carousel>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center animate-bounce-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-4xl font-bold font-handwritten text-secondary mb-2">5000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-4xl font-bold font-handwritten text-secondary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">Organic Certified</p>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-4xl font-bold font-handwritten text-secondary mb-2">50+</p>
              <p className="text-sm text-muted-foreground">Farm Partners</p>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: "0.5s" }}>
              <p className="text-4xl font-bold font-handwritten text-secondary mb-2">4.9★</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
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
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
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
                    <h3 className="font-bold text-lg text-gray-900">{selectedVideo.name} - {selectedVideo.role}</h3>
                    <p className="text-sm text-gray-600">Customer Testimonial</p>
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
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <img
                      src={selectedVideo.videoThumbnail}
                      alt={`${selectedVideo.name} testimonial`}
                      className="w-full h-full object-cover"
                    />

                    {/* Play Button */}
                    <motion.button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full">
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-gray-800" />
                        ) : (
                          <Play className="w-8 h-8 text-gray-800 fill-current" />
                        )}
                      </div>
                    </motion.button>

                    {/* Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                          {selectedVideo.videoDuration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                          Customer Testimonial
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Info */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={selectedVideo.image}
                      alt={selectedVideo.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{selectedVideo.name}</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-sm text-gray-600">{selectedVideo.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: selectedVideo.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{selectedVideo.comment}"
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TestimonialsCarousel;
