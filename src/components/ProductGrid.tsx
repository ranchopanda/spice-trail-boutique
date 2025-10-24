import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, Shield, Truck } from "lucide-react";

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

// Simplified product data
const products: Product[] = [
  {
    id: 1,
    name: "Organic Vegetables Mix",
    description: "Fresh farm-picked seasonal vegetables with maximum nutrients",
    price: "₹299",
    originalPrice: "₹399",
    image: "/assets/products-vegetables.jpg",
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
    image: "/assets/products-grains.jpg",
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
    image: "/assets/products-spices.jpg",
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
    image: "/assets/products-vegetables.jpg",
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

  return (
    <>
      <section id="products" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-handwritten text-primary mb-4">
              🛒 Fresh from Farm
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of organic, sustainable produce.
              Directly sourced from trusted local farmers every morning.
            </p>
          </div>

          {/* Professional Product Grid with Advanced Animations */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94], // smooth easing
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                  }
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  rotateX: 5,
                  rotateY: 5,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    borderColor: "rgb(34 197 94 / 0.5)",
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
                  }}
                >
                  {/* Enhanced Image Section */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{
                        scale: 1.15,
                        rotateX: -5,
                        rotateY: -5
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      style={{
                        transformStyle: "preserve-3d"
                      }}
                    />

                    {/* Animated Badges with Stagger */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <motion.div
                        initial={{ scale: 0, rotate: -15, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 10
                        }}
                      >
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-xl border-0 backdrop-blur-sm">
                          {product.badge}
                        </Badge>
                      </motion.div>

                      {product.discount && (
                        <motion.div
                          initial={{ scale: 0, x: -30, opacity: 0 }}
                          animate={{ scale: 1, x: 0, opacity: 1 }}
                          transition={{
                            delay: 0.5 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                          }}
                        >
                          <Badge
                            variant="destructive"
                            className="shadow-xl font-bold border-0 bg-gradient-to-r from-red-500 to-red-600 backdrop-blur-sm"
                          >
                            {product.discount}
                          </Badge>
                        </motion.div>
                      )}
                    </div>

                    {/* Advanced Stock Indicator */}
                    <motion.div
                      className="absolute top-3 right-3"
                      initial={{ scale: 0, rotate: 15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <Badge
                        className={`text-xs px-2 py-1 font-semibold ${
                          product.inStock
                            ? 'bg-green-500/90 text-white border-green-400 backemsil blur-sm'
                            : 'bg-red-500/90 text-white border-red-400 backdrop-blur-sm'
                        } shadow-lg border-2`}
                      >
                        {product.inStock ? '✓ Available' : '✗ Unavailable'}
                      </Badge>
                    </motion.div>

                    {/* Professional Hover Effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={false}
                    />

                    {/* Animated Quick Action Buttons */}
                    <motion.div
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2"
                      initial="hidden"
                      whileHover="visible"
                    >
                      <motion.button
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-white transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Wishlist functionality would go here
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
                      </motion.button>

                      <motion.button
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-white transition-all"
                        whileHover={{
                          scale: 1.1,
                          rotate: -5
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Quick view"
                      >
                        <Eye className="w-5 h-5 text-gray-700" />
                      </motion.button>
                    </motion.div>

                    {/* Pulse Animation for Out of Stock */}
                    {!product.inStock && (
                      <motion.div
                        className="absolute inset-0 bg-red-500/10 backdrop-blur-[1px]"
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    {/* Floating Elements for Visual Interest */}
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />

                    <motion.div
                      className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-15"
                      animate={{
                        y: [-2, 2, -2],
                        x: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    />
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-6 relative z-10 bg-white/80 backdrop-blur-sm">
                    {/* Category Badge */}
                    <Badge variant="outline" className="text-xs mb-3 border-gray-300 hover:border-primary">
                      {product.category}
                    </Badge>

                    {/* Product Title with Animation */}
                    <motion.h3
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight"
                      layoutId={`title-${product.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    >
                      {product.name}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      className="text-sm text-gray-600 mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                    >
                      {product.description}
                    </motion.p>

                    {/* Star Rating Animation */}
                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.2 + index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star, starIndex) => (
                          <motion.div
                            key={star}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 1.3 + index * 0.1 + starIndex * 0.1,
                              type: "spring",
                              stiffness: 300,
                              damping: 10
                            }}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= product.rating
                                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                                  : 'text-gray-300'
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        ({product.reviewCount})
                      </span>
                    </motion.div>

                    {/* Price Section */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-baseline gap-2">
                        <motion.span
                          className="text-2xl font-black text-gray-900"
                          layoutId={`price-${product.id}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {product.price}
                        </motion.span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through font-medium">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Enhanced Add to Cart Button */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg transition-all ${
                            product.inStock
                              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-200'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!product.inStock}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (product.inStock) {
                              alert(`🎉 ${product.name} added to cart successfully!`);
                            }
                          }}
                        >
                          <motion.div
                            className="flex items-center gap-2"
                            whileHover={{
                              gap: 6,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{product.inStock ? 'Add' : 'Sold Out'}</span>
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                      className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                    >
                      <motion.div
                        className="flex items-center gap-1 text-xs text-gray-500 cursor-default"
                        whileHover={{
                          scale: 1.1,
                          color: "#10b981"
                        }}
                      >
                        <Shield className="w-3 h-3" />
                        <span>Organic</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1 text-xs text-gray-500 cursor-default"
                        whileHover={{
                          scale: 1.1,
                          color: "#3b82f6"
                        }}
                      >
                        <Truck className="w-3 h-3" />
                        <span>Fast Delivery</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
              <span className="text-primary font-medium"> Contact us for custom orders.</span>
            </p>
          </div>
        </div>

        {/* Rich Product Modal */}
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
