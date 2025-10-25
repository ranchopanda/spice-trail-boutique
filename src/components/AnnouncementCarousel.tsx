import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Clock, Truck, Leaf } from "lucide-react";

interface Announcement {
  id: number;
  icon: React.ReactNode;
  text: string;
  type: 'promotion' | 'info' | 'urgency' | 'shipping';
  bgColor: string;
  textColor: string;
  action?: {
    text: string;
    onClick: () => void;
  };
}

const announcements: Announcement[] = [
  {
    id: 1,
    icon: <Gift className="w-4 h-4" />,
    text: "🎉 Free Delivery on Orders Above ₹500",
    type: 'promotion',
    bgColor: 'from-green-500 to-green-600',
    textColor: 'text-white',
    action: {
      text: 'Shop Now',
      onClick: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }
  },
  {
    id: 2,
    icon: <Clock className="w-4 h-4" />,
    text: "⏰ Flash Sale: 30% Off Vegetables - 4 Hours Left!",
    type: 'urgency',
    bgColor: 'from-red-500 to-red-600',
    textColor: 'text-white',
    action: {
      text: 'Hurry!',
      onClick: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }
  },
  {
    id: 3,
    icon: <Leaf className="w-4 h-4" />,
    text: "🌱 New: Organic Millets Collection Available",
    type: 'info',
    bgColor: 'from-blue-500 to-blue-600',
    textColor: 'text-white',
    action: {
      text: 'Explore',
      onClick: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }
  },
  {
    id: 4,
    icon: <Truck className="w-4 h-4" />,
    text: "🚀 Same-Day Delivery in Metro Cities",
    type: 'shipping',
    bgColor: 'from-purple-500 to-purple-600',
    textColor: 'text-white',
    action: {
      text: 'Order Now',
      onClick: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }
  },
  {
    id: 5,
    icon: <Gift className="w-4 h-4" />,
    text: "💚 100% Money-Back Guarantee on All Orders",
    type: 'promotion',
    bgColor: 'from-emerald-500 to-emerald-600',
    textColor: 'text-white',
    action: {
      text: 'Shop Safe',
      onClick: () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }
  }
];

const AnnouncementCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate announcements
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, isVisible]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Close banner
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-banner-closed', 'true');
  };

  // Check if banner was previously closed
  useEffect(() => {
    const wasClosed = localStorage.getItem('announcement-banner-closed');
    if (wasClosed) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-50" />
      <div className="absolute inset-0 pattern-farm-grid opacity-10" />

      {/* Main Banner */}
      <div className={`bg-gradient-to-r ${currentAnnouncement.bgColor} relative`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Announcement Content */}
            <div className="flex items-center gap-3 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className={`${currentAnnouncement.textColor} flex-shrink-0`}>
                    {currentAnnouncement.icon}
                  </div>
                  <p className={`${currentAnnouncement.textColor} font-medium text-sm md:text-base flex-1`}>
                    {currentAnnouncement.text}
                  </p>
                  {currentAnnouncement.action && (
                    <button
                      onClick={currentAnnouncement.action.onClick}
                      className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-white/30 transition-all ml-2"
                    >
                      {currentAnnouncement.action.text}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-2 ml-4">
              {/* Dots Indicator */}
              <div className="hidden md:flex gap-1">
                {announcements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-white/80 scale-125'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close announcement"
              >
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Floating Elements */}
        <div className="absolute top-0 right-8 hidden lg:block">
          <div className="relative">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-white/20 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-black/10 relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-blue-400"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? "100%" : "100%" }}
          transition={{
            duration: isPaused ? 0.1 : 4,
            ease: "linear",
            repeat: isPaused ? 0 : Infinity
          }}
          key={currentIndex}
        />
      </div>
    </div>
  );
};

export default AnnouncementCarousel;
