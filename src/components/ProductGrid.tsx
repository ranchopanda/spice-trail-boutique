import { useState } from "react";
import { ShoppingCart, Heart, Eye, Star, Shield, X } from "lucide-react";
import { Badge, Button, useToast } from "@/components/ui/shared";

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

// Simplified product data - real data would come from API
const products: Product[] = [
  {
    id: 1,
    name: "Organic Vegetables Mix",
    description: "Fresh farm-picked seasonal vegetables",
    price: "₹299",
    originalPrice: "₹399",
    image: "/assets/products-vegetables.jpg",
    badge: "Best Seller",
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
    name: "Premium Rice",
    description: "Organic rice and pulses collection",
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
    category: "Grains",
    variants: ["2kg", "5kg"]
  },
  {
    id: 3,
    name: "Organic Spices",
    description: "Traditional organic spices blend",
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
    category: "Spices",
    variants: ["Small", "Medium", "Large"]
  },
  {
    id: 4,
    name: "Fresh Herbs",
    description: "Pesticide-free aromatic herbs",
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
  const { success, error } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem('spice-trail-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Simplified cart management - just total count for display
  const getCartCount = () => {
    try {
      const cart = localStorage.getItem('spice-trail-cart');
      if (!cart) return 0;
      const items = JSON.parse(cart);
      return items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    } catch {
      return 0;
    }
  };

  const addToCart = (product: Product) => {
    try {
      const cart = localStorage.getItem('spice-trail-cart');
      let cartItems = cart ? JSON.parse(cart) : [];

      // Check if product already in cart
      const existingItem = cartItems.find((item: any) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Add new item
        const price = parseInt(product.price.replace(/[₹,]/g, ''));
        cartItems.push({
          id: product.id,
          name: product.name,
          price: price,
          image: product.image,
          quantity: 1,
          maxStock: product.maxStock,
          addedAt: new Date().toISOString()
        });
      }

      localStorage.setItem('spice-trail-cart', JSON.stringify(cartItems));

      // Update cart count in navigation
      window.dispatchEvent(new CustomEvent('cart-updated', {
        detail: { cartItems: getCartCount() }
      }));

      // Show success toast instead of alert
      success(`${product.name} added to cart!`);

    } catch (err) {
      console.error('Failed to add to cart:', err);
      error('Failed to add item to cart');
    }
  };

  const toggleWishlist = (productId: number) => {
    const newWishlistedIds = wishlistedIds.includes(productId)
      ? wishlistedIds.filter(id => id !== productId)
      : [...wishlistedIds, productId];

    setWishlistedIds(newWishlistedIds);
    localStorage.setItem('spice-trail-wishlist', JSON.stringify(newWishlistedIds));
  };

  const getStockColor = (stockLevel: string) => {
    switch (stockLevel) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="products" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-handwritten text-primary mb-4">
            Fresh from Farm
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of organic, sustainable produce.
            Directly sourced from trusted local farmers.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-primary text-white text-xs font-medium">
                    {product.badge}
                  </Badge>
                  {product.discount && (
                    <Badge variant="destructive" className="text-xs">
                      {product.discount}
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 rounded-full shadow-md ${
                      wishlistedIds.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlistedIds.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 rounded-full shadow-md bg-white text-gray-600 hover:text-primary"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Stock Indicator */}
                <div className="absolute bottom-3 left-3">
                  <Badge className={`text-xs px-2 py-1 ${getStockColor(product.stockLevel)}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <Shield className="w-3 h-3" />
                    <span>Organic</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
            <span className="text-primary font-medium"> Contact us for custom orders.</span>
          </p>
          {/* Note: Search functionality removed until backend is implemented */}
        </div>
      </div>

      {/* Simple Product Detail Modal - No external dependencies */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold">{selectedProduct.price}</span>
                <Button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
