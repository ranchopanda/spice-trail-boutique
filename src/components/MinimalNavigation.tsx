import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button, SearchBar } from "@/components/ui/shared";

const MinimalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get cart count from localStorage
  const getCartCount = (): number => {
    try {
      const cart = localStorage.getItem('spice-trail-cart');
      if (!cart) return 0;
      const items = JSON.parse(cart);
      return items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    } catch {
      return 0;
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-primary">🌱 Natural Harvest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <SearchBar className="w-64" />
          </div>

          {/* Tablet and Mobile Search */}
          <div className="hidden md:flex lg:hidden">
            <SearchBar className="w-full max-w-sm" />
          </div>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="relative"
              onClick={() => {
                const cartEl = document.querySelector('.simple-cart');
                if (cartEl) (cartEl as HTMLElement).click();
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium min-w-[20px]">
                  {getCartCount() > 9 ? "9+" : getCartCount()}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              {/* Remove non-functional features */}
              {/* <span className="text-muted-foreground cursor-not-allowed">
                Products (Coming Soon)
              </span>
              <span className="text-muted-foreground cursor-not-allowed">
                Search (Coming Soon)
              </span> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MinimalNavigation;
