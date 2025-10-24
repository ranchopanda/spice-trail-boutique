import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye, Star, Package, Truck, Shield } from "lucide-react";
import vegetablesImg from "@/assets/products-vegetables.jpg";
import spicesImg from "@/assets/products-spices.jpg";
import grainsImg from "@/assets/products-grains.jpg";

import { ScrollAnimationWrapper } from "@/components/ui/scroll-animation-wrapper";

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
  variants?: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Organic Mixed Vegetables",
    description: "Fresh farm-picked seasonal vegetables",
    price: "₹299",
    originalPrice: "₹399",
    image: vegetablesImg,
    badge: "Bestseller",
    discount: "25% OFF",
    rating: 4.9,
    reviewCount: 128,
    inStock: true,
    stockLevel: 'high',
    variants: ["1kg", "2kg", "5kg"]
  },
  {
    id: 2,
    name: "Artisanal Preserves Collection",
    description: "Honey, pickles & traditional jams",
    price: "₹549",
    originalPrice: "₹699",
    image: spicesImg,
    badge: "New",
    discount: "20% OFF",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    stockLevel: 'medium',
    variants: ["Small Jar", "Large Jar", "Gift Set"]
  },
  {
    id: 3,
    name: "Premium Rice & Grains",
    description: "Organic rice and pulses variety pack",
    price: "₹449",
    originalPrice: "₹599",
    image: grainsImg,
    badge: "Popular",
    discount: "25% OFF",
    rating: 4.9,
    reviewCount: 203,
    inStock: false,
    stockLevel: 'low',
    variants: ["2kg Pack", "5kg Pack", "10kg Pack"]
  }
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Record<number, string>>({});
  const [recentlyAdded, setRecentlyAdded] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlistedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (productId: number) => {
    setRecentlyAdded(prev => [...prev, productId]);
    setTimeout(() => {
      setRecentlyAdded(prev => prev.filter(id => id !== productId));
    }, 2000);
  };

  const getStockColor = (stockLevel: string) => {
    switch (stockLevel) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper animation="fadeInUp">
          <div className="text-center mb-12">
            <p className="text-secondary font-handwritten text-xl mb-2">Handpicked for You</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved organic products, sourced directly from sustainable farms
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: product.id * 0.1,
                ease: "easeOut"
              }}
            >
              <motion.div
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 bg-white/50 backdrop-blur-sm rounded-lg cursor-pointer"
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm">
                  {/* Image Section */}
                  <div className="relative overflow-hidden aspect-square rounded-t-lg">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Animated Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <Badge className="bg-secondary text-secondary-foreground font-semibold shadow-lg">
                          {product.badge}
                        </Badge>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0, x: -20 }}
                        animate={{ scale: 1, x: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-primary text-primary-foreground border-none font-semibold shadow-lg"
                        >
                          {product.discount}
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Quick Action Buttons */}
                    <motion.div
                      className="absolute top-4 right-4 flex gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        onClick={() => toggleWishlist(product.id)}
                        className={`bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all ${
                          wishlistedIds.includes(product.id) ? 'bg-red-500 text-white' : 'hover:bg-secondary hover:text-white'
                        }`}
                        aria-label="Add to wishlist"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{ scale: wishlistedIds.includes(product.id) ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Heart className={`w-5 h-5 ${wishlistedIds.includes(product.id) ? 'fill-current' : ''}`} />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-secondary hover:text-white transition-all shadow-lg hover:shadow-xl"
                        aria-label="Quick view"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </motion.div>

                    {/* Stock Indicator */}
                    <motion.div
                      className={`absolute bottom-4 left-4 px-2 py-1 rounded-full text-xs font-medium ${getStockColor(product.stockLevel)}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {product.inStock ? `${product.stockLevel} stock` : 'Out of stock'}
                    </motion.div>

                    {/* Size/Variant Selector on Hover */}
                    {product.variants && (
                      <motion.div
                        className="absolute bottom-4 right-4 flex gap-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {product.variants.slice(0, 3).map((variant) => (
                          <motion.button
                            key={variant}
                            className={`px-2 py-1 text-xs rounded-md bg-white/90 backdrop-blur-sm hover:bg-secondary hover:text-white transition-all ${
                              selectedVariants[product.id] === variant ? 'bg-secondary text-white' : ''
                            }`}
                            onClick={() => setSelectedVariants(prev => ({ ...prev, [product.id]: variant }))}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {variant}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <motion.div layout className="space-y-3">
                      <motion.h3
                        className="text-xl font-semibold text-foreground"
                        layoutId={`title-${product.id}`}
                      >
                        {product.name}
                      </motion.h3>
                      <p className="text-muted-foreground text-sm">
                        {product.description}
                      </p>

                      {/* Rating with Review Count */}
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                            >
                              <Star className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-secondary text-secondary' : 'text-gray-300'}`} />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.rating}) • {product.reviewCount} reviews
                        </span>
                      </motion.div>

                      {/* Price */}
                      <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.span
                          className="text-2xl font-bold text-primary"
                          layoutId={`price-${product.id}`}
                        >
                          {product.price}
                        </motion.span>
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Footer Section */}
                  <div className="p-6 pt-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button
                        className={`w-full font-semibold transition-all relative overflow-hidden ${
                          recentlyAdded.includes(product.id)
                            ? 'bg-green-600 hover:bg-green-700'
                            : product.inStock
                              ? 'bg-secondary hover:bg-secondary/90'
                              : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        size="lg"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <motion.div
                          className="flex items-center justify-center gap-2"
                          initial={false}
                          animate={recentlyAdded.includes(product.id) ? {
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {recentlyAdded.includes(product.id) ? (
                            <>
                              <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                ✓
                              </motion.div>
                              Added to Cart!
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-5 h-5" />
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </>
                          )}
                        </motion.div>

                        {/* Ripple Effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-md"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            transformOrigin: 'center'
                          }}
                        />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Trust Badges */}
                  <motion.div
                    className="flex justify-center gap-3 pb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Package className="w-3 h-3" />
                      <span>Fresh</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Truck className="w-3 h-3" />
                      <span>Fast Delivery</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Shield className="w-3 h-3" />
                      <span>Certified</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="font-semibold px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Products
            </Button>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};

export default FeaturedProducts;
