import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, MessageCircle, ChevronUp, Phone, X, Heart, Eye, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/shared";

const FloatingActionButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track cart changes
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('spice-trail-cart') || '[]');
        const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartItemCount(count);
      } catch (error) {
        setCartItemCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);

    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCart = () => {
    const cartButton = document.querySelector('.simple-cart');
    if (cartButton) {
      (cartButton as HTMLElement).click();
    }
  };

  const openWhatsApp = () => {
    const message = "Hi! I'm interested in your organic products. Can you help me?";
    const phoneNumber = "+919876543210"; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const callNow = () => {
    const phoneNumber = "+919876543210"; // Replace with actual phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              onClick={openCart}
              className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                  "0 10px 25px -5px rgba(34, 197, 94, 0.6)",
                  "0 10px 25px -5px rgba(34, 197, 94, 0.4)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <ShoppingCart className="w-6 h-6" />

              {/* Item Count Badge */}
              <motion.span
                className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center min-w-[24px]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartItemCount}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </motion.span>

              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-green-400"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Chat Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={openWhatsApp}
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
            boxShadow: [
              "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
              "0 15px 35px -5px rgba(34, 197, 94, 0.6)",
              "0 10px 25px -5px rgba(34, 197, 94, 0.4)"
            ]
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <MessageCircle className="w-6 h-6" />

          {/* Online Status */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            💬 Chat with us on WhatsApp
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </motion.button>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-xl hover:shadow-2xl border border-gray-200 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick Actions Overlay */}
      <AnimatePresence>
        {showQuickActions && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickActions(false)}
            />

            {/* Quick Actions Panel */}
            <motion.div
              className="fixed bottom-6 right-6 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                <button
                  onClick={() => setShowQuickActions(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Actions */}
              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    setShowQuickActions(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Shop Products</p>
                    <p className="text-sm text-gray-500">Browse our fresh collection</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    callNow();
                    setShowQuickActions(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Call Now</p>
                    <p className="text-sm text-gray-500">Speak with our team</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    openWhatsApp();
                    setShowQuickActions(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp Chat</p>
                    <p className="text-sm text-gray-500">Get instant support</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick Actions Trigger (appears on hover over cart) */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="fixed bottom-6 right-20 z-40 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: showQuickActions ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-4 h-4" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Contact Info (appears after 60 seconds) */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-1/2 right-0 z-40 bg-gradient-to-l from-primary to-primary/90 text-white p-4 rounded-l-2xl shadow-2xl hidden lg:block"
          style={{
            animation: `slideInRight 0.5s ease-out 60s both`
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-center">
              <Phone className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm font-semibold">Call Now</p>
              <p className="text-xs opacity-90">+91 98765 43210</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <MessageCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-sm font-semibold">WhatsApp</p>
              <p className="text-xs opacity-90">24/7 Support</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CSS Animation for slide in */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingActionButtons;
