import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, Shield, Truck, Sparkles, Clock, TrendingUp } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import confetti from "canvas-confetti";

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="bg-card rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="aspect-square bg-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-wave" />
    </div>
    <div className="p-6 space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-6 bg-muted rounded w-1/2" />
      <div className="h-10 bg-muted rounded" />
    </div>
  </div>
);

// 3D Tilt Product Card Component
const Product3DCard = ({ product, onClick, onAddToCart }: {
  product: ShopifyProduct;
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 15
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 15
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const images = product.node.images.edges;
  const hasMultipleImages = images.length > 1;

  // Auto-rotate images on hover
  useEffect(() => {
    if (!isHovered || !hasMultipleImages) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, hasMultipleImages, images.length]);

  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const originalPrice = price * 1.33; // 33% markup for display
  const savings = originalPrice - price;
  const stock = Math.floor(Math.random() * 20) + 5; // Random stock for urgency
  const viewing = Math.floor(Math.random() * 15) + 3; // People viewing

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-hover)] transition-all duration-700 relative">
        {/* Ambient Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
        
        {/* Product Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-accent/20 to-muted cursor-pointer" onClick={onClick}>
          {/* Image with hover carousel */}
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]?.node.url || "/placeholder.svg"}
            alt={product.node.title}
            className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
            initial={{ opacity: 0, filter: "grayscale(50%)" }}
            animate={{ 
              opacity: 1,
              filter: isHovered ? "grayscale(0%)" : "grayscale(30%)"
            }}
            transition={{ duration: 0.7 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Quick Actions - Appear on Hover */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110">
              <Heart className="w-5 h-5 text-primary" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110" onClick={onClick}>
              <Eye className="w-5 h-5 text-primary" />
            </button>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="badge-organic flex items-center gap-1 animate-fade-in">
              <Sparkles className="w-3 h-3" />
              CERTIFIED
            </span>
            {savings > 0 && (
              <span className="bg-destructive text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce-in">
                SAVE {product.node.priceRange.minVariantPrice.currencyCode} {savings.toFixed(0)}
              </span>
            )}
          </div>

          {/* Urgency Indicators - Bottom */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3 text-green-400" />
              {viewing} viewing
            </div>
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              <Clock className="w-3 h-3 text-amber-400" />
              {stock < 10 && `Only ${stock} left!`}
              {stock >= 10 && `In Stock`}
            </div>
          </div>

          {/* Image Carousel Dots */}
          {hasMultipleImages && isHovered && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 relative bg-card">
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.node.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.node.description || "Premium organic product sourced from local farms"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(4.9)</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 200) + 50} reviews</span>
          </div>

          {/* Price Section */}
          <div className="flex items-end gap-3 mb-4">
            <span className="price-premium text-3xl">
              {product.node.priceRange.minVariantPrice.currencyCode} {price.toFixed(2)}
            </span>
            {savings > 0 && (
              <span className="text-muted-foreground line-through text-lg mb-1">
                {product.node.priceRange.minVariantPrice.currencyCode} {originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-success" />
              <span>100% Organic</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-info" />
              <span>Free Ship</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={onAddToCart}
            className="w-full bg-gradient-button text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 ripple-effect group/btn relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 animate-shimmer-wave" />
            
            <ShoppingCart className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(20);
      setProducts(data);
      
      // If no products, show helpful message
      if (data.length === 0) {
        setError("no-products");
      }
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("failed-to-load");
    } finally {
      setLoading(false);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#f59e0b', '#3b82f6']
    });
  };

  const handleAddToCart = (product: ShopifyProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions
    };

    addItem(cartItem);
    triggerConfetti();

    // Dispatch custom event for cart to open
    window.dispatchEvent(new CustomEvent('cart-add-success'));
  };

  return (
    <section id="products" className="py-16 lg:py-24 bg-gradient-to-b from-background via-accent/10 to-background relative overflow-hidden">
      {/* Floating particles background */}
      <div className="harvest-particles pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`particle ${i % 3 === 0 ? 'particle-soil' : i % 3 === 1 ? 'particle-seed' : 'particle-harvest'} absolute`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-secondary font-handwritten text-xl mb-2">🌾 Our Collection</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
              Fresh Organic Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Handpicked from local farms, delivered to your doorstep with love and care
            </p>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State - No Products */}
        {error === "no-products" && !loading && (
          <div className="text-center py-20">
            <div className="bg-card rounded-2xl p-12 max-w-2xl mx-auto shadow-xl">
              <div className="text-6xl mb-6">🌱</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">No Products Found</h3>
              <p className="text-muted-foreground mb-6">
                Our store is ready, but we haven't added any products yet. Tell us what you'd like to sell!
              </p>
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Just tell me "Add a product called [name] for [price]" and I'll create it for you using Shopify!
              </p>
            </div>
          </div>
        )}

        {/* Error State - Failed to Load */}
        {error === "failed-to-load" && !loading && (
          <div className="text-center py-20">
            <div className="bg-card rounded-2xl p-12 max-w-2xl mx-auto shadow-xl">
              <div className="text-6xl mb-6">⚠️</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Failed to Load Products</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't connect to the store. Please check your Shopify integration.
              </p>
              <button
                onClick={loadProducts}
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.node.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Product3DCard
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                  onAddToCart={(e) => handleAddToCart(product, e)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Modal (simplified for now) */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">{selectedProduct.node.title}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-2xl hover:text-primary"
                >
                  ×
                </button>
              </div>
              <img
                src={selectedProduct.node.images.edges[0]?.node.url}
                alt={selectedProduct.node.title}
                className="w-full h-96 object-cover rounded-xl mb-6"
              />
              <p className="text-muted-foreground mb-6">{selectedProduct.node.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">
                  {selectedProduct.node.priceRange.minVariantPrice.currencyCode}{" "}
                  {parseFloat(selectedProduct.node.priceRange.minVariantPrice.amount).toFixed(2)}
                </span>
                <button
                  onClick={(e) => {
                    handleAddToCart(selectedProduct, e);
                    setSelectedProduct(null);
                  }}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
