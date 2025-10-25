import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, X, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/shared/Button";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/components/ui/shared";

const SimpleCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, createCheckout, isLoading } = useCartStore();
  const { success, error: showError } = useToast();

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
      {/* Floating Cart Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: getTotalItems() > 0 ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          repeat: getTotalItems() > 0 ? Infinity : 0,
          repeatDelay: 2,
        }}
      >
        <ShoppingCart className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold"
          >
            {getTotalItems()}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Panel */}
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

            {/* Cart Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-card">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-semibold">
                    {getTotalItems()}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                    <p className="text-lg font-semibold text-muted-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-2">Add some products to get started!</p>
                  </div>
                ) : (
                  items.map((item) => {
                    const productNode = item.product.node;
                    const firstImage = productNode.images.edges[0]?.node;
                    
                    return (
                      <motion.div
                        key={item.variantId}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 bg-card p-4 rounded-xl shadow-sm"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden shrink-0">
                          {firstImage ? (
                            <img 
                              src={firstImage.url} 
                              alt={productNode.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-foreground">{productNode.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <span className="text-xs text-muted-foreground ml-auto">
                              Subtotal: {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border p-6 space-y-4 bg-muted/30">
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

                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                    disabled={items.length === 0 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Checkout...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Checkout with Shopify
                      </>
                    )}
                  </Button>
                  {items.length > 0 && (
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
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

export default SimpleCart;
