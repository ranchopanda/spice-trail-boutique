import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, Send, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/shared";

interface InstagramPost {
  id: number;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isProductTagged?: boolean;
  productInfo?: {
    name: string;
    price: string;
    link: string;
  };
}

const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    image: "/assets/products-vegetables.jpg",
    caption: "Fresh organic vegetables straight from the farm! 🥬 Who's ready for a healthy week? #OrganicLiving #FarmFresh",
    likes: 1247,
    comments: 89,
    timestamp: "2h",
    isProductTagged: true,
    productInfo: {
      name: "Organic Vegetables Mix",
      price: "₹299",
      link: "#products"
    }
  },
  {
    id: 2,
    image: "/assets/products-grains.jpg",
    caption: "Golden hour at the farm 🌾 These grains are grown with love and zero chemicals. Perfect for your healthy meals!",
    likes: 892,
    comments: 45,
    timestamp: "5h",
    isProductTagged: true,
    productInfo: {
      name: "Premium Rice & Grains",
      price: "₹449",
      link: "#products"
    }
  },
  {
    id: 3,
    image: "/assets/products-spices.jpg",
    caption: "Hand-ground spices that bring authentic flavors to your kitchen! 🌶️ Made with traditional methods passed down through generations.",
    likes: 2156,
    comments: 123,
    timestamp: "1d",
    isProductTagged: true,
    productInfo: {
      name: "Artisanal Spices",
      price: "₹349",
      link: "#products"
    }
  },
  {
    id: 4,
    image: "/assets/hero-farm.jpg",
    caption: "Morning harvest vibes ☀️ There's nothing quite like picking fresh produce at dawn. This is what real farming looks like!",
    likes: 3421,
    comments: 267,
    timestamp: "2d",
    isProductTagged: false
  },
  {
    id: 5,
    image: "/assets/products-vegetables.jpg",
    caption: "Customer love! 📦 Thank you for sharing your unboxing experience. We love seeing our products in your homes! 💚",
    likes: 1876,
    comments: 156,
    timestamp: "3d",
    isProductTagged: false
  },
  {
    id: 6,
    image: "/assets/products-grains.jpg",
    caption: "Sustainable farming for a better tomorrow 🌱 Every seed we plant is a promise for future generations. #SustainableAgriculture",
    likes: 2987,
    comments: 198,
    timestamp: "4d",
    isProductTagged: false
  }
];

const InstagramFeed = () => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Instagram className="w-8 h-8 text-pink-500" />
              <span className="text-secondary font-handwritten text-xl">Follow Our Journey</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
              @NaturalHarvest
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join our community of organic food lovers. See the farm life, recipes, and behind-the-scenes moments that inspire us every day.
            </p>
          </motion.div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 cursor-pointer"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 ${
                hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
              }`}>
                {/* Product Tag */}
                {post.isProductTagged && post.productInfo && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{post.productInfo.name}</p>
                        <p className="text-sm text-primary font-bold">{post.productInfo.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Stats */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-semibold">{formatNumber(post.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-semibold">{formatNumber(post.comments)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Shop This Look Button */}
                {post.isProductTagged && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white shadow-lg"
                      onClick={() => window.location.href = post.productInfo?.link || '#'}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Shop This
                    </Button>
                  </div>
                )}
              </div>

              {/* Timestamp Badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {post.timestamp}
              </div>

              {/* Product Tagged Indicator */}
              {post.isProductTagged && (
                <div className="absolute bottom-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  Product
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Community 🌱
            </h3>
            <p className="text-gray-600 mb-6">
              Follow us on Instagram for daily farm updates, healthy recipes, and exclusive behind-the-scenes content!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                <Instagram className="w-5 h-5 mr-2" />
                Follow @NaturalHarvest
              </Button>
              <Button variant="outline">
                Share Your Story
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Hashtag Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Popular Hashtags</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['#OrganicLiving', '#FarmFresh', '#SustainableFarming', '#HealthyEating', '#NaturalHarvest'].map((hashtag, index) => (
              <motion.span
                key={hashtag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer"
              >
                {hashtag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
