import { Card, CardContent } from "@/components/ui/shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shared";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Home Chef",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    comment: "The freshness and quality of vegetables is unmatched! My family loves the taste, and I feel good knowing we're eating truly organic produce."
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    comment: "As someone conscious about nutrition, I appreciate the transparency and quality. The grains and pulses are exceptional!"
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Working Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    comment: "Convenient delivery and amazing products. The preserves and pickles remind me of my grandmother's recipes. Absolutely authentic!"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    comment: "We source ingredients for our restaurant from here. The consistency in quality and the farm-fresh taste makes all the difference!"
  }
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-secondary font-handwritten text-xl mb-2">What People Say</p>
          <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
            Customer Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy customers who trust us for their daily organic needs
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full hover:shadow-[var(--shadow-hover)] transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center animate-bounce-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-4xl font-bold font-handwritten text-secondary mb-2">5000+</p>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div className="text-center animate-bounce-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-4xl font-bold font-handwritten text-secondary mb-2">100%</p>
            <p className="text-sm text-muted-foreground">Organic Certified</p>
          </div>
          <div className="text-center animate-bounce-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-4xl font-bold font-handwritten text-secondary mb-2">50+</p>
            <p className="text-sm text-muted-foreground">Farm Partners</p>
          </div>
          <div className="text-center animate-bounce-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-4xl font-bold font-handwritten text-secondary mb-2">4.9★</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
