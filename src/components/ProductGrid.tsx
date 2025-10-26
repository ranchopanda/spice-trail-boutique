import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, Shield, Truck, Plus, Minus } from "lucide-react";
import { safeImageUrl, getDemoImage } from "@/lib/demoAssets";

// Simplified components without external dependencies
const Badge = ({ children, className = "", variant }: {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}) => {
  const baseClasses = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`;
  const variantClasses = variant === "destructive" ? "bg-red-100 text-red-800" :
                         variant === "outline" ? "border border-gray-300" :
                         "bg-gray-100 text-gray-800";
  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, className = "", onClick, disabled }: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: any) => void;
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

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  badge: string;
  discount: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockLevel: 'high' | 'medium' | 'low';
  maxStock: number;
  variants?: string[];
  category?: string;
}

// Simplified modal component with rich details
const RichProductModal = ({ product, isOpen, onClose }: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const price = parseInt(product.price.replace(/[₹,]/g, ''));
  const originalPrice = product.originalPrice ? parseInt(product.originalPrice.replace(/[₹,]/g, '')) : 0;
  const savings = originalPrice - price;
  const total = price * quantity;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-50 to-blue-50 border-b p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge className="bg-green-600 text-white">Premium</Badge>
                <Badge className="bg-yellow-500 text-yellow-900">{product.badge}</Badge>
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-1">{product.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-50 rounded-full text-2xl"
            >
              ×
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 bg-white/80 rounded-lg p-3 inline-flex">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
            <span className="text-green-600 font-medium">✓ Verified Organic</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3 text-center">
                <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-xs font-semibold text-green-800">100% Organic</div>
                <div className="text-xs text-green-700">Certified & Verified</div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-3 text-center">
                <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-xs font-semibold text-blue-800">Free Shipping</div>
                <div className="text-xs text-blue-700">₹500+ orders</div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-black text-green-700">
                  ₹{price.toLocaleString()}
                </span>
                {originalPrice > 0 && (
                  <div className="text-center">
                    <span className="text-xl text-gray-500 line-through">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                    <div className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                      SAVE ₹{savings.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
              <p className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? `✅ ${product.stockLevel} stock available` : '❌ Out of stock'}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-gray-400"
                >
                  −
                </button>
                <span className="w-16 text-center font-bold text-xl py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-gray-400"
                >
                  +
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Total: <span className="font-bold text-green-700">₹{total.toLocaleString()}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  alert(`🚀 Added ${quantity}x ${product.name} to cart!\n💰 Total: ₹${total.toLocaleString()}\n\n🌱 Fresh organic delivery coming your way!`);
                  onClose();
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 font-semibold text-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button className="px-6 py-4 border-2 border-gray-300 hover:border-red-400 text-lg">
                <Heart className="w-5 h-5" />
              </Button>

              <Button className="px-6 py-4 border-2 border-gray-300 hover:border-blue-400 text-lg">
                <Eye className="w-5 h-5" />
              </Button>
            </div>

            {/* Rich Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Why Choose This Product?</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    🍃
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800">Sustainable</p>
                    <p className="text-xs text-green-700">Eco-friendly farming</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    🌱
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Nutrient Dense</p>
                    <p className="text-xs text-blue-700">Rich in vitamins</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    🏆
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-800">Premium Quality</p>
                    <p className="text-xs text-orange-700">Handpicked daily</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    🏥
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-purple-800">Health Focused</p>
                    <p className="text-xs text-purple-700">No chemicals added</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                🏆 Certifications & Awards
              </h3>
              <div className="flex gap-3 flex-wrap">
                {['Organic Certified', 'Non-GMO', 'Fair Trade', 'Sustainable'].map((cert, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 font-semibold"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="border-t bg-gray-50 p-6">
          <h2 className="text-2xl font-bold mb-6">🧾 Complete Product Information</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Specs */}
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Product Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-mono font-medium">#{product.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category || 'Organic Produce'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium text-yellow-600">{product.rating}/5 ⭐</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Stock Level:</span>
                  <span className={`font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                    {product.inStock ? `${product.stockLevel}` : 'Depleted'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Review Count:</span>
                  <span className="font-medium">{product.reviewCount} verified reviews</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">🚚 Shipping & Returns</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 mt-1 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Standard Delivery</p>
                    <p className="text-sm text-green-700">2-4 business days • ₹0 on ₹500+</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 mt-1 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Express Delivery</p>
                    <p className="text-sm text-blue-700">1-2 business days • ₹100</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 mt-1 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">30-Day Returns</p>
                    <p className="text-sm text-orange-700">Satisfaction guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage & Storage */}
          <div className="mt-8 bg-white p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-4">💡 Product Care Guide</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">🍽️ How to Use</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Wash thoroughly before consumption</li>
                  <li>Cook with minimal oil for health benefits</li>
                  <li>Combine with complementary herbs and spices</li>
                  <li>Enjoy fresh for maximum nutrition</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">🛡️ Storage Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Keep in refrigerator crisper drawer</li>
                  <li>Use within 7-10 days for freshness</li>
                  <li>Avoid direct sunlight and moisture</li>
                  <li>Store in breathable containers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate demo products with fallback images
const products: Product[] = [
  {
    id: 1,
    name: "Organic Vegetables Mix",
    description: "Fresh farm-picked seasonal vegetables with maximum nutrients",
    price: "₹299",
    originalPrice: "₹399",
    image: safeImageUrl(undefined, getDemoImage("vegetables")), // Fallback to demo image
    badge: "Bestseller",
    discount: "25% OFF",
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    stockLevel: 'high',
    maxStock: 25,
    category: "Vegetables",
    variants: ["1kg", "2kg", "5kg"]
  },
  {
    id: 2,
    name: "Premium Rice & Grains",
    description: "Long-grain organic rice and traditional grains",
    price: "₹449",
    originalPrice: "₹599",
    image: safeImageUrl(undefined, getDemoImage("grains")), // Fallback to demo image
    badge: "Popular",
    discount: "25% OFF",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockLevel: 'medium',
    maxStock: 15,
    category: "Grains"
  },
  {
    id: 3,
    name: "Artisanal Spices",
    description: "Hand-ground traditional spices blend",
    price: "₹349",
    originalPrice: "₹449",
    image: safeImageUrl(undefined, getDemoImage("spices")), // Fallback to demo image
    badge: "New",
    discount: "20% OFF",
    rating: 4.9,
    reviewCount: 67,
    inStock: false,
    stockLevel: 'low',
    maxStock: 8,
    category: "Spices"
  },
  {
    id: 4,
    name: "Fresh Herbs Collection",
    description: "Pesticide-free aromatic herbs for cooking",
    price: "₹199",
    originalPrice: "₹249",
    image: safeImageUrl(undefined, getDemoImage("herbs")), // Fallback to demo image if no herbs category exists
    badge: "Fresh",
    discount: "20% OFF",
    rating: 4.6,
    reviewCount: 45,
    inStock: true,
    stockLevel: 'high',
    maxStock: 20,
    category: "Herbs"
  }
];

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Detect if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, newQuantity)
    }));
  };

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    // Here you would normally dispatch to cart store
    alert(`🛒 Added ${quantity}x ${product.name} to cart!\n💰 Total: ₹${(parseInt(product.price.replace(/[₹,]/g, '')) * quantity).toLocaleString()}`);
  };

  return (
    <>
      <section id="products" className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header - Mobile Optimized */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">
              🛒 Fresh from Farm
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Handpicked organic produce from trusted local farmers.
              Same-day freshness guaranteed.
            </p>
          </div>

          {/* Mobile-First Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
            {products.map((product, index) => {
              const quantity = quantities[product.id] || 1;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: isMobile ? 0 : index * 0.1, // Reduced animation on mobile
                  }}
                  className="bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-lg border border-gray-200 overflow-hidden cursor-pointer active:scale-95 transition-transform"
                  onClick={() => setSelectedProduct(product)} // Open modal on all devices
                >
                  {/* Product Image - Optimized for Mobile */}
                  <div className="relative aspect-square bg-gray-100">
                    {product.discount && (
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 font-bold">
                          {product.discount}
                        </Badge>
                      </div>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Stock Status Overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Badge className="bg-red-600 text-white font-bold">OUT OF STOCK</Badge>
                      </div>
                    )}

                    {/* Quick Action Buttons - Desktop Only */}
                    {!isMobile && (
                      <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          className="bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Wishlist functionality
                          }}
                          aria-label="Add to wishlist"
                        >
                          <Heart className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          className="bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          aria-label="Quick view"
                        >
                          <Eye className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    )}

                    {/* Mobile: Quick View Badge */}
                    {isMobile && (
                      <div className="absolute bottom-2 right-2">
                        <Badge className="bg-primary text-white text-xs font-bold">TAP TO VIEW</Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Content - Mobile Optimized */}
                  <div className="p-3 md:p-4">
                    {/* Category & Badge */}
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs border-gray-300">
                        {product.category}
                      </Badge>
                      {!product.discount && (
                        <Badge className="bg-green-100 text-green-800 text-xs font-medium">
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Product Title - Mobile Friendly */}
                    <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 md:mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Rating - Simplified for Mobile */}
                    <div className="flex items-center gap-1 mb-2 md:mb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 md:w-4 md:h-4 ${
                              star <= product.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviewCount})</span>
                    </div>

                    {/* Mobile: Quick Add to Cart */}
                    {isMobile && product.inStock ? (
                      <div className="space-y-3">
                        {/* Price Display */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg md:text-xl font-black text-gray-900">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Quantity Selector - Mobile Optimized */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(product.id, (quantities[product.id] || 1) - 1);
                              }}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm">
                              {quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(product.id, (quantities[product.id] || 1) + 1);
                              }}
                              className="w-8 h-8 flex items-center justify-center bg-white rounded text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="flex-1 bg-primary text-white py-3 px-4 rounded-lg text-sm font-semibold active:scale-95 transition-transform hover:bg-primary/90 flex items-center justify-center gap-2"
                            aria-label={`Add ${quantity} ${product.name} to cart`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add</span>
                          </button>
                        </div>

                        {/* Mini Trust Badges */}
                        <div className="flex justify-between text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>Organic</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            <span>Free Delivery</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Desktop: Traditional Layout
                      <>
                        {/* Description - Hidden on Mobile */}
                        {!isMobile && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {/* Price & Add to Cart */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                              <span className="text-lg md:text-xl font-black text-gray-900">
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>
                            {isMobile && (
                              <div className="text-xs text-gray-600 mt-1">
                                Tap for details
                              </div>
                            )}
                          </div>

                          {!isMobile && product.inStock && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="ml-3 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all shadow-md"
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Trust Badges - Desktop */}
                        {!isMobile && (
                          <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              <span>Organic</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Truck className="w-3 h-3" />
                              <span>Fast Delivery</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action - Mobile Optimized */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4">
              Need something special?
              <a href="#contact" className="text-primary font-medium hover:underline ml-1">
                Request a custom order
              </a>
            </p>

            {/* Mobile: Scroll to Top */}
            {isMobile && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg active:scale-95 transition-transform"
                aria-label="Scroll to top"
              >
                Back to Top 🔝
              </button>
            )}
          </div>
        </div>

        {/* Mobile-Optimized Product Modal */}
        <RichProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </section>
    </>
  );
};

export default ProductGrid;
