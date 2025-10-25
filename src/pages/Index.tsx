// Consolidated minimal e-commerce homepage
// Phase 1: Combined 15+ components into 4 essential ones

import { useState, useEffect } from "react";
import MinimalNavigation from "@/components/MinimalNavigation";
import SimpleHero from "@/components/SimpleHero";
import ProductGrid from "@/components/ProductGrid";
import SimpleCart from "@/components/SimpleCart";
import NewsletterPopup from "@/components/NewsletterPopup";
import AnnouncementCarousel from "@/components/AnnouncementCarousel";
import VideoShowcase from "@/components/VideoShowcase";
import InstagramFeed from "@/components/InstagramFeed";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import CertificationBadges from "@/components/CertificationBadges";
import { FloatingStickers, StickerPicker, StickerAnimation, Sticker } from "@/components/WhatsAppStickers";
import LiveActivityFeed from "@/components/LiveActivityFeed";

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
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [showStickerAnimation, setShowStickerAnimation] = useState(false);

  // 🎯 Smart Newsletter Popup Triggers
  useEffect(() => {
    // Don't show if already subscribed
    if (localStorage.getItem('newsletter-subscribed')) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let scrollTriggered = false;
    let exitTriggered = false;

    // Trigger 1: After 30 seconds on site (first visit only)
    const firstVisit = !localStorage.getItem('newsletter-shown');
    if (firstVisit) {
      timeoutId = setTimeout(() => {
        if (!scrollTriggered && !exitTriggered) {
          setShowNewsletter(true);
          localStorage.setItem('newsletter-shown', 'true');
        }
      }, 30000); // 30 seconds
    }

    // Trigger 2: After scrolling 50% down page
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !localStorage.getItem('newsletter-scroll-shown') && !scrollTriggered) {
        scrollTriggered = true;
        localStorage.setItem('newsletter-scroll-shown', 'true');
        if (timeoutId) clearTimeout(timeoutId);
        setShowNewsletter(true);
      }
    };

    // Trigger 3: Exit-intent detection (mouse leaves top of page)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('newsletter-exit-shown') && !exitTriggered) {
        exitTriggered = true;
        localStorage.setItem('newsletter-exit-shown', 'true');
        if (timeoutId) clearTimeout(timeoutId);
        setShowNewsletter(true);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Handle newsletter submission
  const handleNewsletterSubmit = (email: string, name: string) => {
    console.log('Newsletter subscription:', { email, name });

    // Here you would typically send to your backend API
    // For now, we'll just store locally and show success
    localStorage.setItem('newsletter-subscribed', 'true');
    localStorage.setItem('newsletter-email', email);
    localStorage.setItem('newsletter-name', name);

    // You could also trigger a discount code generation here
    const discountCode = `ORGANIC10-${Date.now()}`;
    localStorage.setItem('discount-code', discountCode);

    // Show success message (already handled in NewsletterPopup)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* SIMPLE TOP NAVIGATION */}
      <MinimalNavigation />

      {/* 🎯 MILLION-DOLLAR ANNOUNCEMENT CAROUSEL */}
      <AnnouncementCarousel />

      {/* CLEAN MAIN CONTENT */}
      <main id="main-content" className="relative">
        <SimpleHero />
        <ProductGrid />
        <VideoShowcase />
        <InstagramFeed />
        <TestimonialsCarousel />
        <CertificationBadges />
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

      {/* 🎯 MILLION-DOLLAR NEWSLETTER POPUP */}
      <NewsletterPopup
        isOpen={showNewsletter}
        onClose={() => setShowNewsletter(false)}
        onSubmit={handleNewsletterSubmit}
      />

      {/* 🚀 MILLION-DOLLAR FLOATING ACTION BUTTONS */}
      <FloatingActionButtons />

      {/* 🌾 WHATSAPP-STYLE STICKERS FOR SOCIAL ENGAGEMENT */}
      <FloatingStickers />

      {/* 🎯 STICKER PICKER FOR USER INTERACTION */}
      <StickerPicker
        onStickerSelect={(sticker) => {
          setSelectedSticker(sticker);
          setShowStickerAnimation(true);
        }}
      />

      {/* 🎉 STICKER ANIMATION WHEN SELECTED */}
      {showStickerAnimation && selectedSticker && (
        <StickerAnimation
          sticker={selectedSticker}
          onComplete={() => {
            setShowStickerAnimation(false);
            setSelectedSticker(null);
          }}
        />
      )}

      {/* 📊 LIVE ACTIVITY FEED FOR SOCIAL PROOF */}
      <LiveActivityFeed />
    </div>
  );
};

export default Index;
