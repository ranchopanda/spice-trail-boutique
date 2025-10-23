import { Sprout, Heart, Users, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";

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
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-secondary font-handwritten text-xl mb-2">Our Story</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-6">
              Farm to Table,
              <span className="block text-secondary">Fresh & Natural</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                At Natural Harvest, we believe that good food starts with good soil. Our journey began 
                with a simple mission: to bring the purest, most nutritious organic produce from our 
                farms directly to your family's table.
              </p>
              <p className="leading-relaxed">
                Every product we offer is grown with care, harvested at peak ripeness, and delivered 
                with the promise of freshness. We work closely with local farmers who share our 
                commitment to sustainable agriculture and chemical-free farming practices.
              </p>
              <p className="leading-relaxed">
                When you choose Natural Harvest, you're not just choosing organic food – you're 
                choosing a healthier lifestyle, supporting local communities, and contributing to 
                a more sustainable future.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-105 bg-card border-border/50"
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
