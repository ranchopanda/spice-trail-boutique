import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Award,
  Leaf,
  Zap,
  MessageCircle,
  ThumbsUp,
  Share,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Variant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  helpfulness: number;
  avatar?: string;
}

interface ProductDetailModalProps {
  product: {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    stockLevel: number;
    variants: Variant[];
    images: ProductImage[];
    features: string[];
    category: string;
    tags: string[];
    reviews?: Review[];
    nutritionInfo?: any;
    usage?: string;
    storage?: string;
    origin?: string;
    certifications: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedMedia, setSelectedMedia] = useState<'images' | 'video'>('images');

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]?.id || "");
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product]);

  const currentVariant = product?.variants.find(v => v.id === selectedVariant) || product?.variants[0];
  const displayPrice = currentVariant?.price || product?.price || 0;
  const originalPrice = currentVariant?.originalPrice || product?.originalPrice;
  const savings = originalPrice ? originalPrice - displayPrice : 0;

  if (!product) return null;

  // Rating distribution calculation
  const ratingDistribution = {
    5: 45,
    4: 30,
    3: 15,
    2: 7,
    1: 3
  };

  const totalReviews = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle className="sr-only">{product?.name} - Product Details</DialogTitle>
      </DialogHeader>
      <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-y-auto p-0" aria-describedby="product-details-description">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-saffron rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-sage-green rounded-full"></div>
          </div>

          {/* Product Media Gallery */}
          <div className="relative bg-gradient-to-br from-cream/50 to-lotus-pink/5 p-6">
            {/* Media Type Toggle */}
            <div className="flex justify-center mb-4">
              <div className="bg-white shadow-lg rounded-lg p-1 flex gap-1 border border-warm-earth/20">
                <button
                  onClick={() => setSelectedMedia('images')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    selectedMedia === 'images'
                      ? 'bg-gradient-to-r from-saffron to-burnt-orange text-white shadow-md'
                      : 'text-warm-earth hover:bg-cream'
                  }`}
                >
                  <Star className="w-4 h-4 inline mr-2" />
                  Photos
                </button>
                <button
                  onClick={() => setSelectedMedia('video')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    selectedMedia === 'video'
                      ? 'bg-gradient-to-r from-deep-aqua to-royal-purple text-white shadow-md'
                      : 'text-deep-aqua hover:bg-lotus-pink/10'
                  }`}
                >
                  <Package className="w-4 h-4 inline mr-2" />
                  Demo Video
                </button>
              </div>
            </div>

            {/* Main Media Display */}
            <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-white">
              {selectedMedia === 'images' ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]?.url || "/placeholder.svg"}
                    alt={product.images[selectedImage]?.alt || product.name}
                    className="w-full h-full object-cover cursor-zoom-in"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      // TODO: Implement image zoom modal
                      console.log("Zoom functionality coming soon");
                    }}
                  />
                </AnimatePresence>
              ) : (
                <motion.video
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  controls
                  preload="metadata"
                  poster={product.images[0]?.url || "/placeholder.svg"}
                >
                  <source src="/videos/product-showcase.mp4" type="video/mp4" />
                  <source src="/videos/product-showcase.webm" type="video/webm" />
                  Your browser does not support the video tag. Here is a
                  <a href="/videos/product-showcase.mp4">link to the video</a> instead.
                </motion.video>
              )}

              {/* Media Navigation */}
              {selectedMedia === 'images' && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Sale Badge */}
              {selectedMedia === 'images' && savings > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                  Save ₹{savings}
                </Badge>
              )}

              {/* Video Feature Badge */}
              {selectedMedia === 'video' && (
                <Badge className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white">
                  Product Demo
                </Badge>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {selectedMedia === 'images' && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Video Controls Info */}
            {selectedMedia === 'video' && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  See our {product.name} in action
                </p>
                <p className="text-xs text-gray-500">
                  Watch how our farmers produce this premium organic product
                </p>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="mb-6">
              <motion.p
                className="text-sm text-primary font-medium mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {product.brand} • {product.category}
              </motion.p>

              <motion.h1
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {product.name}
              </motion.h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Write a review
                </button>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{displayPrice.toLocaleString()}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive">
                      Save {Math.round((savings / originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`} />
                <span className={`text-sm font-medium ${
                  product.inStock ? "text-green-700" : "text-red-700"
                }`}>
                  {product.inStock
                    ? `${product.stockLevel} in stock`
                    : "Out of stock"
                  }
                </span>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 mb-6">{product.shortDescription}</p>
            </div>

            {/* Variants Selection */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        selectedVariant === variant.id
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 text-gray-700 hover:border-primary"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 min-w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stock Alert */}
              {quantity > (currentVariant?.stock || product.stockLevel) && (
                <p className="text-sm text-red-600">
                  Only {(currentVariant?.stock || product.stockLevel)} left in stock
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-4"
                size="lg"
                disabled={!product.inStock}
                onClick={() => {
                  // TODO: Add to cart functionality
                  console.log(`Added ${quantity} of ${product.name} to cart`);
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(displayPrice * quantity).toLocaleString()}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className={`p-4 ${isWishlisted ? 'bg-red-50 border-red-200' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                />
              </Button>

              <Button variant="outline" size="lg" className="p-4">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free delivery on orders above ₹500</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4 text-green-600" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>100% Organic Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="w-4 h-4 text-green-600" />
                <span>Freshness Guaranteed</span>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {product.usage && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">How to Use</h3>
                      <p className="text-sm text-gray-600">{product.usage}</p>
                    </div>
                  )}

                  {product.storage && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Storage Instructions</h3>
                      <p className="text-sm text-gray-600">{product.storage}</p>
                    </div>
                  )}

                  {product.origin && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Origin & Source</h3>
                      <p className="text-sm text-gray-600">{product.origin}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Rating Breakdown */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = ratingDistribution[stars as keyof typeof ratingDistribution];
                        const percentage = (count / totalReviews) * 100;
                        return (
                          <div key={stars} className="flex items-center gap-2 text-sm">
                            <span className="w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-8 text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {(product.reviews || []).slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {review.avatar ? (
                              <img
                                src={review.avatar}
                                alt={review.customerName}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {review.customerName.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-sm">{review.customerName}</p>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <button className="flex items-center gap-1 hover:text-gray-700">
                            <ThumbsUp className="w-3 h-3" />
                            Helpful ({review.helpfulness})
                          </button>
                          <button className="hover:text-gray-700">
                            <MessageCircle className="w-3 h-3" />
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                    {(product.reviews?.length || 0) > 3 && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all {product.reviewCount} reviews →
                      </button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Nutritional Information</h3>
                  {product.nutritionInfo ? (
                    <div className="prose prose-sm max-w-none">
                      {Object.entries(product.nutritionInfo).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                          <span className="font-medium">{key}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      Nutritional information will be available soon. All our products are 100% organic
                      and free from artificial additives.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping & Returns</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Truck className="w-4 h-4 mt-0.5 text-green-600" />
                        <div>
                          <p className="font-medium">Free Shipping</p>
                          <p className="text-gray-600">Orders above ₹500 qualify for free delivery</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Package className="w-4 h-4 mt-0.5 text-blue-600" />
                        <div>
                          <p className="font-medium">Express Delivery</p>
                          <p className="text-gray-600">1-2 business days in major cities</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <RotateCcw className="w-4 h-4 mt-0.5 text-orange-600" />
                        <div>
                          <p className="font-medium">Easy Returns</p>
                          <p className="text-gray-600">30-day hassle-free return policy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Certifications */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Certifications & Quality</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {cert}
                  </Badge>
                ))}
                {product.tags.map((tag, index) => (
                  <Badge key={`tag-${index}`} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
