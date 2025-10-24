import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";
import { ScrollAnimationWrapper, StaggerWrapper } from "@/components/ui/scroll-animation-wrapper";

const Hero = () => {
  return (
    <section className="relative h-[600px] lg:h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          className="max-w-2xl text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.p
            className="text-lg font-handwritten mb-4 text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Farm Fresh & Organic
          </motion.p>

          <motion.h2
            className="text-5xl lg:text-7xl font-bold mb-6 font-handwritten leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Let's Make Good Food Choices
            <motion.span
              className="block text-secondary mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
            >
              For Our Family
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg mb-8 text-white/90 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Discover premium organic produce, straight from our farms to your table.
            Pure, natural, and full of goodness.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 shadow-[var(--shadow-hover)] transition-all hover:scale-105"
              >
                Shop Now
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 font-semibold px-8"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <StaggerWrapper className="mt-8 flex items-center gap-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4, type: "spring", stiffness: 200 }}
            >
              <p className="text-3xl font-bold font-handwritten text-secondary">100%</p>
              <p className="text-sm text-white/80">Organic</p>
            </motion.div>
            <motion.div
              className="h-12 w-px bg-white/30"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: 1.6 }}
            />
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8, type: "spring", stiffness: 200 }}
            >
              <p className="text-3xl font-bold font-handwritten text-secondary">50%</p>
              <p className="text-sm text-white/80">High in Fiber</p>
            </motion.div>
            <motion.div
              className="h-12 w-px bg-white/30"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.4, delay: 2.0 }}
            />
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2, type: "spring", stiffness: 200 }}
            >
              <p className="text-3xl font-bold font-handwritten text-secondary">0%</p>
              <p className="text-sm text-white/80">Chemicals</p>
            </motion.div>
          </StaggerWrapper>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
