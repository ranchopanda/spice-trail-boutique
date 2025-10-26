import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, X, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/shared";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/components/ui/shared";
import confetti from "canvas-confetti";

const SimpleCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, createCheckout, isLoading } = useCartStore();
  const { success, error: showError } = useToast();
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    if (items.length === 0) return { amount: '0', currencyCode: 'USD' };
    const total = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
    return {
      amount: total.toFixed(2),
      currencyCode: items[0].price.currencyCode
    };
  };

  // 🎉 Million-Dollar Confetti Celebration
  const triggerConfetti = () => {
    if (hasTriggeredConfetti) return;
    setHasTriggeredConfetti(true);

    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        setHasTriggeredConfetti(false);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left side burst
      confetti({
        particleCount,
        startVelocity: randomInRange(50, 100),
        spread: randomInRange(50, 70),
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: ['#6B8E23', '#FF9933', '#FFD700', '#228B22', '#DAA520'],
        shapes: ['circle', 'square'],
        gravity: randomInRange(0.8, 1.2),
        ticks: randomInRange(100, 200),
      });

      // Right side burst
      confetti({
        particleCount,
        startVelocity: randomInRange(50, 100),
        spread: randomInRange(50, 70),
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#6B8E23', '#FF9933', '#FFD700', '#228B22', '#DAA520'],
        shapes: ['circle', 'square'],
        gravity: randomInRange(0.8, 1.2),
        ticks: randomInRange(100, 200),
      });
    }, 250);
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      await createCheckout();
      const url = useCartStore.getState().checkoutUrl;
      if (url) {
        window.open(url, '_blank');
        success("Redirecting to Shopify checkout...");
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      showError("Unable to create checkout. Please try again.");
    }
  };

  useEffect(() => {
    const handleCartAddSuccess = () => {
      setIsOpen(true);
    };

    window.addEventListener('cart-add-success', handleCartAddSuccess);
    return () => window.removeEventListener('cart-add-success', handleCartAddSuccess);
  }, []);

  return (
    <>
      {/* Floating Cart Button - Mobile Optimized */}
      <motion.button
        onClick={() => {
          setIsOpen(true);
          if (getTotalItems() > 0 && !isMobile) {
            // Only trigger confetti on desktop for performance
            setTimeout(() => triggerConfetti(), 300);
          }
        }}
        className={`fixed z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-2xl transition-transform active:scale-95 ${
          isMobile
            ? 'bottom-6 right-6'
            : 'bottom-6 right-6 hover:scale-110'
        }`}
        whileHover={!isMobile ? { scale: 1.1 } : {}}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: getTotalItems() > 0 && !isMobile ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          repeat: getTotalItems() > 0 && !isMobile ? Infinity : 0,
          repeatDelay: 2,
        }}
      >
        <ShoppingCart className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold ${
              isMobile
                ? 'w-7 h-7 min-h-[28px] min-w-[28px]' // Larger on mobile
                : 'w-6 h-6 min-h-[24px] min-w-[24px]'
            }`}
          >
            {getTotalItems()}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Modal - Fully Responsive */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel - Adaptive Layout */}
            <motion.div
              className={`bg-background shadow-2xl z-50 flex flex-col ${
                isMobile
                  ? 'fixed inset-x-0 bottom-0 rounded-t-xl max-h-[90vh]'
                  : 'fixed top-0 right-0 h-full w-full max-w-md'
              }`}
              initial={{
                ...(isMobile
                  ? { y: "100%" }
                  : { x: "100%" }
                )
              }}
              animate={{
                ...(isMobile
                  ? { y: 0 }
                  : { x: 0 }
                )
              }}
              exit={{
                ...(isMobile
                  ? { y: "100%" }
                  : { x: "100%" }
                )
              }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile Handle */}
              {isMobile && (
                <div className="flex justify-center py-2 pb-4">
                  <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
                </div>
              )}

              {/* Header */}
              <div className={`flex items-center justify-between border-b bg-card ${
                isMobile ? 'px-4 py-3' : 'p-6'
              }`}>
                <div className="flex items-center gap-3">
                  <ShoppingCart className={`text-primary ${
                    isMobile ? 'w-5 h-5' : 'w-6 h-6'
                  }`} />
                  <h2 className={`font-bold ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>Your Cart</h2>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-semibold">
                    {getTotalItems()}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`hover:bg-muted rounded-full transition-colors ${
                    isMobile ? 'p-2' : 'p-2'
                  }`}
                >
                  <X className={`${
                    isMobile ? 'w-5 h-5' : 'w-5 h-5'
                  }`} />
                </button>
              </div>

              {/* Cart Items */}
              <div className={`flex-1 overflow-y-auto ${
                isMobile ? 'px-4 py-2' : 'p-6'
              }`}>
                {items.length === 0 ? (
                  <div className={`flex flex-col items-center justify-center h-full text-center ${
                    isMobile ? 'py-8' : 'py-12'
                  }`}>
                    <ShoppingCart className={`text-muted-foreground mb-4 opacity-50 ${
                      isMobile ? 'w-12 h-12' : 'w-16 h-16'
                    }`} />
                    <p className={`font-semibold text-muted-foreground mb-2 ${
                      isMobile ? 'text-base' : 'text-lg'
                    }`}>Your cart is empty</p>
                    <p className={`text-muted-foreground ${
                      isMobile ? 'text-sm' : 'text-sm'
                    }`}>Add some products to get started!</p>
                  </div>
                ) : (
                  <div className={`space-y-3 ${isMobile ? 'mb-2' : 'space-y-4'}`}>
                    {items.map((item) => {
                      const productNode = item.product.node;
                      const firstImage = productNode.images.edges[0]?.node;

                      return (
                        <motion.div
                          key={item.variantId}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className={`bg-card rounded-lg shadow-sm flex gap-4 ${
                            isMobile ? 'p-3' : 'p-4'
                          }`}
                        >
                          {/* Product Image */}
                          <div className={`bg-muted rounded-lg overflow-hidden shrink-0 ${
                            isMobile ? 'w-16 h-16' : 'w-20 h-20'
                          }`}>
                            {firstImage ? (
                              <img
                                src={firstImage.url}
                                alt={productNode.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-muted-foreground/50" />
                              </div>
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-semibold text-foreground line-clamp-2 ${
                                  isMobile ? 'text-sm leading-tight' : 'text-base'
                                }`}>
                                  {productNode.title}
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.variantId)}
                                className="text-muted-foreground hover:text-destructive transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Quantity Controls - Mobile Optimized */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <button
                                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                  className={`bg-white rounded text-gray-700 hover:bg-gray-50 transition-colors ${
                                    isMobile ? 'w-8 h-8 p-0' : 'w-8 h-8 p-0'
                                  }`}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3'}`} />
                                </button>
                                <span className={`font-medium text-center ${
                                  isMobile ? 'w-10 text-base min-w-[40px]' : 'w-8 text-sm min-w-[32px]'
                                }`}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                  className={`bg-white rounded text-gray-700 hover:bg-gray-50 transition-colors ${
                                    isMobile ? 'w-8 h-8 p-0' : 'w-8 h-8 p-0'
                                  }`}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3'}`} />
                                </button>
                              </div>
                              <span className={`text-muted-foreground font-medium ${
                                isMobile ? 'text-xs' : 'text-xs'
                              }`}>
                                {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Cart Summary - Fixed at Bottom */}
              {getTotalItems() > 0 && (
                <div className={`border-t border-border ${
                  isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'
                } bg-muted/30`}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Items:</span>
                    <span className="font-semibold">{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">
                      {getTotalPrice().currencyCode} {getTotalPrice().amount}
                    </span>
                  </div>

                  <div className={`space-y-2 ${isMobile ? 'space-y-2' : 'space-y-2'}`}>
                    <Button
                      onClick={handleCheckout}
                      className={`w-full font-semibold ${
                        isMobile ? 'py-3 text-base' : 'py-2'
                      }`}
                      size={isMobile ? "lg" : "lg"}
                      disabled={items.length === 0 || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className={`animate-spin ${
                            isMobile ? 'w-5 h-5 mr-2' : 'w-4 h-4 mr-2'
                          }`} />
                          Creating Checkout...
                        </>
                      ) : (
                        <>
                          <ExternalLink className={`${
                            isMobile ? 'w-5 h-5 mr-2' : 'w-4 h-4 mr-2'
                          }`} />
                          Checkout Now
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleCart;
