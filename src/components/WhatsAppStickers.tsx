import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Heart, Star, Gift, Sparkles } from "lucide-react";

interface Sticker {
  id: number;
  emoji: string;
  name: string;
  category: 'celebration' | 'love' | 'food' | 'nature' | 'organic';
  animation: string;
  color: string;
}

const stickers: Sticker[] = [
  { id: 1, emoji: '🌾', name: 'Fresh Harvest', category: 'nature', animation: 'bounce', color: 'text-green-500' },
  { id: 2, emoji: '🥕', name: 'Organic Carrot', category: 'food', animation: 'wiggle', color: 'text-orange-500' },
  { id: 3, emoji: '🍅', name: 'Ripe Tomato', category: 'food', animation: 'pulse', color: 'text-red-500' },
  { id: 4, emoji: '🌱', name: 'New Growth', category: 'nature', animation: 'float', color: 'text-green-400' },
  { id: 5, emoji: '👨‍🌾', name: 'Happy Farmer', category: 'nature', animation: 'wave', color: 'text-yellow-500' },
  { id: 6, emoji: '🌟', name: 'Premium Quality', category: 'celebration', animation: 'sparkle', color: 'text-yellow-400' },
  { id: 7, emoji: '💚', name: 'Organic Love', category: 'love', animation: 'heartbeat', color: 'text-green-500' },
  { id: 8, emoji: '🎉', name: 'Fresh Delivery', category: 'celebration', animation: 'bounce', color: 'text-purple-500' },
  { id: 9, emoji: '🍎', name: 'Farm Fresh', category: 'food', animation: 'rotate', color: 'text-red-400' },
  { id: 10, emoji: '✨', name: 'Premium', category: 'celebration', animation: 'twinkle', color: 'text-blue-400' },
];

const FloatingStickers = () => {
  const [activeStickers, setActiveStickers] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly show 2-4 stickers
      const count = Math.floor(Math.random() * 3) + 2;
      const randomStickers = stickers
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .map(s => s.id);

      setActiveStickers(randomStickers);

      // Hide after 3 seconds
      setTimeout(() => {
        setActiveStickers([]);
      }, 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {activeStickers.map((stickerId, index) => {
          const sticker = stickers.find(s => s.id === stickerId);
          if (!sticker) return null;

          return (
            <motion.div
              key={`${stickerId}-${Date.now()}`}
              className={`absolute text-4xl ${sticker.color}`}
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`,
              }}
              initial={{
                scale: 0,
                rotate: 0,
                opacity: 0,
                y: 100
              }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [0, 10, -10, 0],
                opacity: [0, 1, 1, 0],
                y: [100, -50, -100],
              }}
              exit={{
                scale: 0,
                opacity: 0,
                y: -200,
                rotate: 360
              }}
              transition={{
                duration: 3,
                ease: "easeOut",
                times: [0, 0.3, 0.7, 1]
              }}
            >
              {sticker.emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const StickerPicker = ({ onStickerSelect }: { onStickerSelect: (sticker: Sticker) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Sticker Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Sticker Picker Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sticker Grid */}
            <motion.div
              className="fixed bottom-20 right-6 bg-white rounded-2xl shadow-2xl p-4 z-50 w-80"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">🌾 Farm Stickers</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {stickers.map((sticker) => (
                  <motion.button
                    key={sticker.id}
                    className={`text-3xl p-2 rounded-lg hover:bg-gray-100 transition-colors ${sticker.color}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      onStickerSelect(sticker);
                      setIsOpen(false);
                    }}
                  >
                    {sticker.emoji}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Share the farm love! 🌱
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const StickerAnimation = ({ sticker, onComplete }: {
  sticker: Sticker;
  onComplete: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`text-8xl ${sticker.color}`}
        initial={{
          scale: 0,
          rotate: -180,
          opacity: 0
        }}
        animate={{
          scale: [0, 1.5, 1.2, 1],
          rotate: [-180, -90, 0, 10, -10, 0],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
          times: [0, 0.3, 0.6, 1]
        }}
        onAnimationComplete={onComplete}
      >
        {sticker.emoji}
      </motion.div>
    </motion.div>
  );
};

export { FloatingStickers, StickerPicker, StickerAnimation };
export type { Sticker };
