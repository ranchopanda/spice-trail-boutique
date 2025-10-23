import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[var(--gradient-hero)] text-primary-foreground text-center py-2 px-4 text-sm">
        🎉 Get 10% OFF on orders above ₹3000 | Use code - HARVEST10
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <h1 className="text-2xl font-handwritten font-bold text-primary">
              Natural Harvest
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Shop All
            </a>
            <a href="#categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Our Story
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-card p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                />
              </div>
            </div>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                Shop All
              </a>
              <a href="#categories" className="text-foreground hover:text-primary transition-colors py-2">
                Categories
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors py-2">
                Our Story
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
