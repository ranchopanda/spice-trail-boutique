import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Minus, Plus } from "lucide-react";

interface ProductQuickViewProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    originalPrice: string;
    image: string;
    badge: string;
    discount: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-secondary text-secondary-foreground font-semibold">
                {product.badge}
              </Badge>
              <Badge variant="outline" className="bg-primary text-primary-foreground border-none font-semibold">
                {product.discount}
              </Badge>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 lg:p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl lg:text-3xl font-handwritten text-primary mb-2">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(128 reviews)</span>
            </div>

            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                {product.price}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                {product.originalPrice}
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-accent transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[60px] text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-accent transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground ripple-effect"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`${isWishlisted ? 'bg-red-50 border-red-200' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                />
              </Button>
            </div>

            {/* Product Features */}
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">✓</span>
                <span className="text-muted-foreground">100% Organic & Chemical-Free</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">✓</span>
                <span className="text-muted-foreground">Farm Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">✓</span>
                <span className="text-muted-foreground">Free Delivery on Orders Above ₹500</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
