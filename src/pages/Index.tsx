import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";

import ProductGrid from "@/components/ProductGrid";
import VideoShowcase from "@/components/VideoShowcase";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Categories />
        <ProductGrid />
        <VideoShowcase />
        <TestimonialsCarousel />
        <Mission />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
