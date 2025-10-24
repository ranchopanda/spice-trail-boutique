import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [willingToShareRecipe, setWillingToShareRecipe] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds of user interaction
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 3000);

    // Show on exit intent (when mouse moves toward close button)
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 10 && !isOpen) {
        const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
        if (!hasSeenPopup) {
          setIsOpen(true);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isOpen]);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      localStorage.setItem("newsletter-popup-seen", "true");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("newsletter-popup-seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Popup */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-2xl shadow-2xl max-w-md w-full p-8 mx-4 border-2 border-accent/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Header with floating animation */}
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-handwritten">
                  🌱 Join Our Farm Family!
                </h3>
                <p className="text-gray-600">
                  Get exclusive recipes, farm updates, and special offers
                </p>
              </motion.div>

              {/* Benefits */}
              <motion.div
                className="space-y-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <Flower2 className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-gray-700">🌽 Seasonal farm recipes</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-700">🎁 10% off your first order</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-gray-700">📝 Weekly organic tips</span>
                </motion.div>
              </motion.div>

              {isSubscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <motion.div
                    className="text-5xl mb-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 10, 0]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    🎉
                  </motion.div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">
                    Welcome to the Family! 🌿
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Check your inbox for your 10% discount code
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleClose}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Continue Shopping
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 border-primary/30 focus:border-primary"
                  />

                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="recipe-share"
                      checked={willingToShareRecipe}
                      onCheckedChange={setWillingToShareRecipe}
                      className="border-primary"
                    />
                    <label htmlFor="recipe-share" className="text-sm text-gray-600 leading-4">
                      I enjoy sharing recipes and cooking tips!
                    </label>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleSubscribe}
                      disabled={!email.trim()}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 font-semibold py-3"
                    >
                      🌱 Join Our Organic Community
                    </Button>
                  </motion.div>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    No spam! Unsubscribe anytime. 🥕
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
