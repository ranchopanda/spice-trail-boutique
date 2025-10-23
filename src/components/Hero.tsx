import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] lg:h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <p className="text-lg font-handwritten mb-4 text-accent animate-fade-in">
            Farm Fresh & Organic
          </p>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 font-handwritten leading-tight animate-fade-in">
            Let's Make Good Food Choices
            <span className="block text-secondary mt-2">For Our Family</span>
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-xl animate-fade-in">
            Discover premium organic produce, straight from our farms to your table. 
            Pure, natural, and full of goodness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 shadow-[var(--shadow-hover)] transition-all hover:scale-105"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 font-semibold px-8"
            >
              Learn More
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 animate-fade-in">
            <div className="text-center">
              <p className="text-3xl font-bold font-handwritten text-secondary">100%</p>
              <p className="text-sm text-white/80">Organic</p>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-3xl font-bold font-handwritten text-secondary">50%</p>
              <p className="text-sm text-white/80">High in Fiber</p>
            </div>
            <div className="h-12 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-3xl font-bold font-handwritten text-secondary">0%</p>
              <p className="text-sm text-white/80">Chemicals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
