import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button, useToast } from "@/components/ui/shared";
import confetti from "canvas-confetti";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
  addedAt: string;
}

const SimpleCart = () => {
  const { success, error } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = localStorage.getItem('spice-trail-cart');
        if (cart) {
          setCartItems(JSON.parse(cart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };

    loadCart();

    // Listen for cart updates from other components
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spice-trail-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cartItems]);

  const getTotalItems = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🎉 Million-Dollar Confetti Celebration
  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
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

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxStock) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('spice-trail-cart');
    setIsOpen(false);
  };

  const handleCheckout = () => {
    // Clear indication that checkout is not implemented yet with proper toast
    success(
      "Checkout system integration in progress",
      <button
        className="text-blue-600 underline hover:text-blue-800"
        onClick={() => window.location.href = '/contact'}
      >
        Contact us for personalized assistance
      </button>
    );
  };

  return (
    <>
      {/* Floating Cart Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="simple-cart bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl hover:shadow-primary/25 transform hover:scale-110 active:scale-95 transition-all"
          onClick={() => {
            setIsOpen(true);
            // 🎉 Trigger confetti when opening cart with items
            if (getTotalItems() > 0) {
              setTimeout(() => triggerConfetti(), 300);
            }
          }}
        >
          <ShoppingCart className="w-6 h-6" />

          {/* Item count badge */}
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center min-w-[24px]">
              {getTotalItems() > 99 ? "99+" : getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Cart Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-primary text-white">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                <h2 className="text-xl font-bold">Your Cart</h2>
                <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
                  {getTotalItems()} items
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">Add some fresh organic products!</p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-sm">
                          {item.name}
                        </h4>
                        <p className="text-primary font-bold text-lg">₹{item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Stock warning */}
                        {item.quantity >= item.maxStock - 1 && (
                          <p className="text-xs text-orange-600 mt-1">
                            Only {item.maxStock} left in stock
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t bg-gray-50 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total: ₹{getTotalPrice().toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">
                    ({getTotalItems()} items)
                  </span>
                </div>

                {/* Note about payment coming soon */}
                <div className="bg-yellow-50 text-yellow-800 px-3 py-2 rounded-lg text-sm">
                  ⚠️ Real Stripe payment integration coming soon
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                    onClick={handleCheckout}
                  >
                    Pay Now • ₹{getTotalPrice().toLocaleString()}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>

                {/* Help text */}
                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout • Free delivery on ₹500+ • 30-day returns
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SimpleCart;
