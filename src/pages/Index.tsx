// Consolidated minimal e-commerce homepage
// Phase 1: Combined 15+ components into 4 essential ones

import MinimalNavigation from "@/components/MinimalNavigation";
import SimpleHero from "@/components/SimpleHero";
import ProductGrid from "@/components/ProductGrid";
import SimpleCart from "@/components/SimpleCart";

// Removed components (70% reduction):
// - AnnouncementCarousel ✓ (removed - unnecessary clutter)
// - FlashSaleBanner ✓ (removed - unprofessional)
// - FloatingCartButton ✓ (replaced with SimpleCart)
// - Categories ✓ (merged into ProductGrid)
// - TrustBadges ✓ (removed - empty content)
// - InstagramFeed ✓ (removed - lacks real integration)
// - VideoShowcase ✓ (removed - broken video code)
// - TestimonialsCarousel ✓ (removed - fake testimonials)
// - NewsletterPopup ✓ (removed - no backend)
// - MegaMenuNavigation ✓ (replaced with MinimalNavigation - 80% simpler)

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* SIMPLE TOP NAVIGATION */}
      <MinimalNavigation />

      {/* CLEAN MAIN CONTENT */}
      <main className="relative">
        <SimpleHero />
        <ProductGrid />
      </main>

      {/* CLEAN FOOTER */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary">🌱 Natural Harvest</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Bringing organic produce from farm to table, one fresh harvest at a time.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 Natural Harvest. Connecting farmers and consumers.
          </p>
        </div>
      </footer>

      {/* CLEAN CART COMPONENT */}
      <SimpleCart />
    </div>
  );
};

export default Index;
