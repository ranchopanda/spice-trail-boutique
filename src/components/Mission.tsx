import { motion } from "framer-motion";
import { Sprout, Heart, Users, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollAnimationWrapper, StaggerWrapper } from "@/components/ui/scroll-animation-wrapper";

const values = [
  {
    icon: Sprout,
    title: "100% Organic",
    description: "Certified organic farming practices with zero chemical pesticides"
  },
  {
    icon: Heart,
    title: "Health First",
    description: "Nutrient-rich produce that promotes wellness and vitality"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Empowering local farmers and sustainable agriculture"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable packaging and environmentally conscious practices"
  }
];

const Mission = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gradient-to-b from-accent/20 to-background">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          animation="fadeInUp"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-secondary font-handwritten text-xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Story
            </motion.p>
            <motion.h2
              className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Farm to Table,
              <motion.span
                className="block text-secondary"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
              >
                Fresh & Natural
              </motion.span>
            </motion.h2>
            <StaggerWrapper className="space-y-4 text-muted-foreground">
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                At Natural Harvest, we believe that good food starts with good soil. Our journey began
                with a simple mission: to bring the purest, most nutritious organic produce from our
                farms directly to your family's table.
              </motion.p>
              <motion.p
                className="leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Every product we offer is grown with care, harvested at peak ripeness, and delivered
                with the promise of freshness. We work closely with local farmers who share our
                commitment to sustainable agriculture and chemical-free farming practices.
              </motion.p>
              <motion.p
                className="leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                When you choose Natural Harvest, you're not just choosing organic food – you're
                choosing a healthier lifestyle, supporting local communities, and contributing to
                a more sustainable future.
              </motion.p>
            </StaggerWrapper>
          </motion.div>

          <StaggerWrapper className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="p-6 text-center bg-card border-border/50 group cursor-pointer">
                    <motion.div
                      className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </StaggerWrapper>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default Mission;
