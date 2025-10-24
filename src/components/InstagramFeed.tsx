import { motion } from "framer-motion";
import { Heart, MessageCircle, Share } from "lucide-react";

const InstagramFeed = () => {
  // Mock Instagram posts data
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      likes: 234,
      comments: 12,
      isVideo: false,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
      likes: 189,
      comments: 8,
      isVideo: true,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=400&fit=crop",
      likes: 456,
      comments: 23,
      isVideo: false,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      likes: 312,
      comments: 17,
      isVideo: false,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1498579150354-977459b7e4ba?w=400&h=400&fit=crop",
      likes: 278,
      comments: 14,
      isVideo: false,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1598030304671-5c5c5e5b3b1d?w=400&h=400&fit=crop",
      likes: 198,
      comments: 9,
      isVideo: false,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-secondary font-handwritten text-xl mb-2">Follow Us</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
            See Our Daily Life 🌱
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our organic farming journey, see behind-the-scenes farm life, and get inspired by fresh cooking ideas
          </p>

          <motion.a
            href="https://instagram.com/naturalharvest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @naturalharvest
          </motion.a>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, z: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Post Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={post.image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Video indicator */}
                {post.isVideo && (
                  <div className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zM8 3a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h5z"/>
                    </svg>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Engagement stats */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-4 text-white">
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="font-semibold">{post.likes.toLocaleString()}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.2 }}
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span className="font-semibold">{post.comments}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Share button */}
                <motion.button
                  className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-primary font-semibold mb-2 hover:text-secondary transition-colors cursor-pointer">
            ❤️ Love our content? Follow us for more farm-fresh inspiration!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
