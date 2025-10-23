import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import vegetablesImg from "@/assets/products-vegetables.jpg";
import spicesImg from "@/assets/products-spices.jpg";
import grainsImg from "@/assets/products-grains.jpg";
import ProductQuickView from "./ProductQuickView";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const products = [
  {
    id: 1,
    name: "Organic Mixed Vegetables",
    description: "Fresh farm-picked seasonal vegetables",
    price: "₹299",
    originalPrice: "₹399",
    image: vegetablesImg,
    badge: "Bestseller",
    discount: "25% OFF"
  },
  {
    id: 2,
    name: "Artisanal Preserves Collection",
    description: "Honey, pickles & traditional jams",
    price: "₹549",
    originalPrice: "₹699",
    image: spicesImg,
    badge: "New",
    discount: "20% OFF"
  },
  {
    id: 3,
    name: "Premium Rice & Grains",
    description: "Organic rice and pulses variety pack",
    price: "₹449",
    originalPrice: "₹599",
    image: grainsImg,
    badge: "Popular",
    discount: "25% OFF"
  }
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [wishlistedIds, setWishlistedIds] = useState<number[]>([]);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const toggleWishlist = (id: number) => {
    setWishlistedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-handwritten text-xl mb-2">Handpicked for You</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved organic products, sourced directly from sustainable farms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className={`group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border/50 ${
                isVisible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-secondary text-secondary-foreground font-semibold">
                    {product.badge}
                  </Badge>
                  <Badge variant="outline" className="bg-primary text-primary-foreground border-none font-semibold">
                    {product.discount}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-secondary hover:text-white transition-all ${
                      wishlistedIds.includes(product.id) ? 'bg-red-500 text-white' : ''
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlistedIds.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-secondary hover:text-white transition-all"
                    aria-label="Quick view"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">(4.9)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold transition-all hover:scale-105 ripple-effect"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="font-semibold px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground ripple-effect"
          >
            View All Products
          </Button>
        </div>
      </div>

      <ProductQuickView
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default FeaturedProducts;
