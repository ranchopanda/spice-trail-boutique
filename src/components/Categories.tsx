import { motion } from "framer-motion";
import { Wheat, Droplet, Leaf, Apple, Coffee, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollAnimationWrapper, StaggerWrapper } from "@/components/ui/scroll-animation-wrapper";

const categories = [
  {
    name: "Grains & Pulses",
    icon: Wheat,
    description: "Organic rice, flour, and lentils",
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    name: "Oil & Ghee",
    icon: Droplet,
    description: "Cold-pressed oils",
    color: "text-secondary",
    bg: "bg-secondary/5"
  },
  {
    name: "Vegetables",
    icon: Leaf,
    description: "Fresh farm vegetables",
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    name: "Fruits",
    icon: Apple,
    description: "Seasonal fresh fruits",
    color: "text-secondary",
    bg: "bg-secondary/5"
  },
  {
    name: "Spices",
    icon: Coffee,
    description: "Authentic Indian spices",
    color: "text-primary",
    bg: "bg-primary/5"
  },
  {
    name: "Preserves",
    icon: Package,
    description: "Jams, honey & pickles",
    color: "text-secondary",
    bg: "bg-secondary/5"
  }
];

const Categories = () => {
  return (
    <section id="categories" className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-handwritten text-xl mb-2">Explore Our Range</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From farm-fresh vegetables to artisanal preserves, discover the finest organic products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="group p-6 text-center hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer hover:scale-105 border-border/50 bg-card"
              >
                <div className={`${category.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-sm lg:text-base mb-2 text-foreground">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground hidden lg:block">
                  {category.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
