import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/shared";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (email: string, name: string) => void;
}

const NewsletterPopup = ({ isOpen, onClose, onSubmit }: NewsletterPopupProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Smart timing triggers
  useEffect(() => {
    if (!isOpen) return;

    const triggers = [
      // After 30 seconds on site (first visit)
      () => {
        const firstVisit = !localStorage.getItem('newsletter-shown');
        if (firstVisit) {
          setTimeout(() => {
            // Show popup after 30 seconds for first-time visitors
          }, 30000);
        }
      },

      // After scrolling 50% down page
      () => {
        const handleScroll = () => {
          const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (scrollPercent > 50 && !localStorage.getItem('newsletter-scroll-shown')) {
            localStorage.setItem('newsletter-scroll-shown', 'true');
            // Show popup
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      },

      // Exit-intent detection
      () => {
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0 && !localStorage.getItem('newsletter-exit-shown')) {
            localStorage.setItem('newsletter-exit-shown', 'true');
            // Show popup
          }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
      }
    ];

    // Don't show if already subscribed
    if (localStorage.getItem('newsletter-subscribed')) {
      return;
    }

    // Check if should show based on triggers
    const shouldShow = triggers.some(trigger => {
      // Logic to determine if trigger should activate
      return false; // Placeholder
    });

    if (shouldShow) {
      // Show popup logic
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store subscription
      localStorage.setItem('newsletter-subscribed', 'true');
      localStorage.setItem('newsletter-email', email);
      localStorage.setItem('newsletter-name', name);

      // Call parent callback
      onSubmit?.(email, name);

      setIsSubmitted(true);

      // Close after success message
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem('newsletter-shown', 'true');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Success State */}
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Gift className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      🎉 Welcome to the Family!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your 10% discount code has been sent to <strong>{email}</strong>
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800 font-medium">
                        ✨ Check your inbox for your exclusive discount code!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse" />
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* Split Layout */}
                    <div className="grid lg:grid-cols-2 min-h-[500px]">
                      {/* Left: Visual */}
                      <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8 flex flex-col justify-center items-center text-center overflow-hidden">
                        {/* Animated Background Elements */}
                        <div className="absolute top-8 left-8 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                        <div className="absolute top-16 right-12 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute bottom-12 left-16 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

                        {/* Main Visual */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                          className="relative mb-6"
                        >
                          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <Sparkles className="w-16 h-16 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                            <Gift className="w-4 h-4 text-yellow-900" />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">
                              10% OFF
                            </div>
                            <p className="text-gray-700 font-medium">
                              Your First Order
                            </p>
                          </div>
                        </motion.div>

                        {/* Floating Icons */}
                        <motion.div
                          className="absolute top-20 left-8 text-2xl"
                          animate={{
                            y: [-10, 10, -10],
                            rotate: [0, 5, 0, -5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          🌱
                        </motion.div>
                        <motion.div
                          className="absolute bottom-20 right-8 text-2xl"
                          animate={{
                            y: [10, -10, 10],
                            rotate: [0, -5, 0, 5, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        >
                          🥕
                        </motion.div>
                      </div>

                      {/* Right: Form */}
                      <div className="p-8 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                              Welcome! 🌱
                            </h2>
                            <p className="text-gray-600">
                              Join our organic community and get <strong>10% off</strong> your first order!
                            </p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name
                              </label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                placeholder="Enter your name"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                  placeholder="your@email.com"
                                  required
                                />
                              </div>
                            </div>

                            <Button
                              type="submit"
                              disabled={isSubmitting || !email || !name}
                              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Subscribing...
                                </div>
                              ) : (
                                'Claim My 10% Discount'
                              )}
                            </Button>
                          </form>

                          <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                              Unsubscribe anytime. We respect your privacy and will never spam you.
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
