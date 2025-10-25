import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, X, Package } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/components/ui/shared";
import { Button } from "@/components/ui/shared/Button";
import { Badge } from "@/components/ui/shared/Badge";

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCartStore();
  const { success, error: showError } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const shopifyProducts = await fetchProducts(20);
        setProducts(shopifyProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        showError("Failed to fetch products from Shopify");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
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
    
    success(`${product.node.title} added to cart!`);

    // Trigger confetti effect
    const event = new CustomEvent('cart-add-success');
    window.dispatchEvent(event);
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated background decorations */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-bold mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌱 FRESH ORGANIC PRODUCTS
          </motion.div>

          <h2 className="text-5xl font-black text-foreground mb-4">
            Farm Fresh to Your Table
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked organic produce, delivered with care and passion
          </p>
        </motion.div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Start by creating your first product! Just tell me what product you'd like to add.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {products.map((product, index) => {
              const productNode = product.node;
              const firstImage = productNode.images.edges[0]?.node;
              const price = parseFloat(productNode.priceRange.minVariantPrice.amount);
              const currencyCode = productNode.priceRange.minVariantPrice.currencyCode;
              
              return (
                <motion.div
                  key={productNode.id}
                  className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 100
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Product Image with Advanced Hover Effects */}
                  <div className="relative aspect-square overflow-hidden bg-muted/30">
                    <motion.img
                      src={firstImage?.url || '/placeholder.svg'}
                      alt={productNode.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Organic Badge */}
                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge variant="default" className="bg-primary/90 backdrop-blur-sm">
                        🌱 Organic
                      </Badge>
                    </motion.div>

                    {/* Quick Action Buttons - Slide up on hover */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 flex gap-2"
                      initial={{ y: 100, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        size="sm"
                        className="flex-1 bg-background/90 backdrop-blur-sm hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-background/90 backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Product Info with Enhanced Typography */}
                  <div className="p-6 space-y-4">
                    {/* Product Name */}
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {productNode.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {productNode.description || "Premium organic product"}
                    </p>

                    {/* Price with Gradient Effect */}
                    <div className="flex items-baseline gap-3">
                      <motion.div
                        className="text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                      >
                        {currencyCode} {price.toFixed(2)}
                      </motion.div>
                    </div>

                    {/* Stock Status */}
                    {productNode.variants.edges[0]?.node.availableForSale ? (
                      <motion.div
                        className="flex items-center gap-2 text-sm text-green-600"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium">In Stock</span>
                      </motion.div>
                    ) : (
                      <div className="text-sm text-destructive font-medium">Out of Stock</div>
                    )}

                    {/* Add to Cart Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="w-full group/btn relative overflow-hidden"
                        size="lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={!productNode.variants.edges[0]?.node.availableForSale}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <ShoppingCart className="w-5 h-5 mr-2 relative z-10" />
                        <span className="relative z-10">Add to Cart</span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Product Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={handleAddToCart}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Product Modal Component
const ProductModal = ({ 
  product, 
  onClose,
  onAddToCart 
}: { 
  product: ShopifyProduct; 
  onClose: () => void;
  onAddToCart: (product: ShopifyProduct) => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const productNode = product.node;
  const firstImage = productNode.images.edges[0]?.node;
  const price = parseFloat(productNode.priceRange.minVariantPrice.amount);
  const currencyCode = productNode.priceRange.minVariantPrice.currencyCode;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-background rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden">
            <motion.img
              src={firstImage?.url || '/placeholder.svg'}
              alt={productNode.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <Badge variant="outline" className="mb-3">
                🌱 Organic
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {productNode.title}
              </h2>
              <p className="text-muted-foreground">
                {productNode.description || "Premium organic product"}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <div className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {currencyCode} {price.toFixed(2)}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={!productNode.variants.edges[0]?.node.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductGrid;
