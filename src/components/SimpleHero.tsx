import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

// Enhanced components with premium effects
const Button = ({ children, className = "", onClick, disabled }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Video Background Component
const VideoBackground = ({ videoUrl, fallbackImage }: { videoUrl?: string; fallbackImage: string }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  if (videoUrl) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{ opacity: isVideoLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={fallbackImage}
        alt="Farm background"
        className="w-full h-full object-cover"
      />
      {/* Enhanced overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-amber-900/20 to-gold-900/40" />
    </div>
  );
};

const SimpleHero = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 🎯 Cursor-following spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden luxury-hero">
      {/* 🌟 LUXURY BACKDROP - Multi-layered visual poetry */}
      <div className="absolute inset-0">
        {/* Video Background with fallback */}
        <VideoBackground
          videoUrl="https://player.vimeo.com/external/371433849.sd.mp4?s=12345" // Real farm video
          fallbackImage="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1920&h=1080&fit=crop&crop=center"
        />

        {/* Farm Heritage Patterns */}
        <div className="absolute inset-0 pattern-farm-grid opacity-20" />
        <div className="absolute inset-0 pattern-harvest-dots opacity-10" />

        {/* 🎯 Advanced Cursor-Following Spotlight Effect */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.08) 40%,
              rgba(255, 255, 255, 0.02) 70%,
              transparent 100%)`,
            opacity: isHovering ? 1 : 0.7
          }}
        />

        {/* Enhanced Multi-Layer Spotlight for Hero Area */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px,
              rgba(251, 191, 36, 0.1) 0%,
              rgba(251, 191, 36, 0.05) 50%,
              transparent 100%)`,
            opacity: isHovering ? 0.8 : 0.4
          }}
        />

        {/* Premium Inner Glow Effect */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(200px circle at ${cursorPos.x}px ${cursorPos.y}px,
              rgba(251, 191, 36, 0.2) 0%,
              rgba(251, 191, 36, 0.08) 30%,
              transparent 60%)`,
            opacity: isHovering ? 0.6 : 0.2
          }}
        />

        {/* Enhanced Floating Luxury Particles */}
        <div className="absolute inset-0 harvest-particles">
          {/* More particles for premium feel */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`particle ${i % 3 === 0 ? 'particle-soil' : i % 3 === 1 ? 'particle-seed' : 'particle-harvest'}
                absolute opacity-60`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Seasonal Color Overlay */}
        <div className="absolute inset-0 season-overlay-summer opacity-30" />

        {/* Subtle Golden Rays */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-yellow-100/20" />
      </div>

      {/* 🎭 MAIN CONTENT - Dramatic Storytelling */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">

          {/* 🏆 PRESTIGE BADGE */}
          <div className="mb-8 animate-fade-in">
            <div className="prestige-border inline-block">
              <div className="prestige-content px-6 py-3 rounded-xl">
                <div className="text-luxury-gold font-luxury-accent text-xs tracking-wider">
                  ⭐ HERITAGE FARM COLLECTIVE ⭐
                </div>
              </div>
            </div>
          </div>

          {/* 🏛️ DRAMATIC HEADLINE */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-luxury-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-none">
              <span className="block text-luxury-terra mb-4">
                FROM OUR
              </span>
              <span className="block text-luxury-gold font-black relative">
                FAMILY FARMS
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-60"></div>
              </span>
              <span className="block text-2xl md:text-3xl font-luxury-body text-luxury-sage mt-4 font-normal tracking-wide">
                to your table in hours, not days
              </span>
            </h1>
          </motion.div>

          {/* 📖 COMPANION STORY */}
          <motion.div
            className="mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="font-luxury-body text-xl md:text-2xl text-luxury-terra leading-relaxed mb-6">
              We bridge the sacred gap between soil and soul, delivering tomorrow's harvest today.
              Every basket tells a story of dedication, every seed carries ancestral wisdom.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-luxury-sage">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                <span className="font-luxury-accent">0 CHEMICALS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-organic-emerald rounded-full"></div>
                <span className="font-luxury-accent">LOCAL FARMERS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-harvest-gold rounded-full"></div>
                <span className="font-luxury-accent">SEASONAL PEAK</span>
              </div>
            </div>
          </motion.div>

          {/* 🎯 LUXURY CTA BUTTONS */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                className="btn-luxury-primary text-white px-12 py-6 text-lg font-luxury-accent rounded-2xl min-w-[280px] group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: `radial-gradient(circle at ${isHovering ? '60% 40%' : '50% 50%'}, hsl(var(--primary)), hsl(var(--harvest-copper)))`
                }}
              >
                {/* Magnetic glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="flex items-center gap-3 relative z-10">
                  <motion.span
                    className="text-xl"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🌾
                  </motion.span>
                  <span className="font-bold tracking-wide">DISCOVER OUR HARVEST</span>
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform"
                    animate={{
                      x: [0, 3, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    →
                  </motion.span>
                </span>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-500 origin-center" />
                </div>
              </motion.button>

              <motion.button
                className="luxury-badge-farm text-white px-10 py-6 text-lg font-luxury-accent rounded-2xl border-2 border-luxury-gold hover:border-luxury-gold/80 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px hsl(var(--luxury-gold) / 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <span>👨‍🌾</span>
                  <span>MEET OUR FARMERS</span>
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* 📊 HERITAGE METRICS */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <div className="trust-badge bg-gradient-to-br from-luxury-ivory to-white p-6 rounded-xl border border-luxury-gold/20">
              <div className="quality-meter mb-3"></div>
              <div className="text-3xl font-black text-luxury-terra mb-1 font-luxury-display">100%</div>
              <div className="text-sm font-luxury-accent text-luxury-sage uppercase tracking-wider">Organic Certified</div>
            </div>

            <div className="trust-badge bg-gradient-to-br from-luxury-ivory to-white p-6 rounded-xl border border-luxury-gold/20">
              <div className="quality-meter mb-3"></div>
              <div className="text-3xl font-black text-luxury-terra mb-1 font-luxury-display">25+</div>
              <div className="text-sm font-luxury-accent text-luxury-sage uppercase tracking-wider">Farm Families</div>
            </div>

            <div className="trust-badge bg-gradient-to-br from-luxury-ivory to-white p-6 rounded-xl border border-luxury-gold/20">
              <div className="quality-meter mb-3"></div>
              <div className="text-3xl font-black text-luxury-terra mb-1 font-luxury-display">2K+</div>
              <div className="text-sm font-luxury-accent text-luxury-sage uppercase tracking-wider">Happy Customers</div>
            </div>

            <div className="trust-badge bg-gradient-to-br from-luxury-ivory to-white p-6 rounded-xl border border-luxury-gold/20">
              <div className="quality-meter mb-3"></div>
              <div className="text-3xl font-black text-luxury-terra mb-1 font-luxury-display">5★</div>
              <div className="text-sm font-luxury-accent text-luxury-sage uppercase tracking-wider">Customer Rating</div>
            </div>
          </motion.div>

          {/* 🌟 PRESTIGE MEMBERSHIP TEASE */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <div className="ribbon-seasonal text-white px-8 py-3 rounded-full inline-flex items-center gap-4 shadow-lg">
              <span className="text-sm font-luxury-accent">👑</span>
              <span className="text-sm font-luxury-accent">Early Harvest Club: Exclusive access to peak-season produce</span>
              <span className="text-sm font-luxury-accent">👑</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🎠 LUXURY SCROLL INDICATOR */}
      <motion.div
        className="scroll-luxury absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin opacity-80"></div>
      </motion.div>
    </section>
  );
};

export default SimpleHero;
