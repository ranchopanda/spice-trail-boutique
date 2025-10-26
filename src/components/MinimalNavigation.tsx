import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button, SearchBar } from "@/components/ui/shared";

const MinimalNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleCartClick = () => {
    const cartEl = document.querySelector('.simple-cart');
    if (cartEl) (cartEl as HTMLElement).click();
    setIsMenuOpen(false); // Close mobile menu after cart click
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between ${
            isMobile ? 'h-14' : 'h-16'
          }`}>
            {/* Logo - Mobile Optimized */}
            <Link
              to="/"
              className={`flex items-center space-x-2 ${
                isMobile ? 'flex-1' : 'space-x-3'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={`font-bold text-primary ${
                isMobile ? 'text-lg' : 'text-2xl'
              }`}>🌱 Natural Harvest</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors px-2 py-1">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors px-2 py-1">
                About
              </Link>
              <div className={`${isSearchOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
                <SearchBar className="w-full" />
              </div>
              {!isSearchOpen && (
                <Button
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-muted"
                  aria-label="Search"
                >
                  🔍
                </Button>
              )}
            </div>

            {/* Tablet Navigation (Medium screens) */}
            <div className="hidden md:flex lg:hidden items-center space-x-4">
              <SearchBar className="w-48 xl:w-56" />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop Search Toggle */}
              <div className="hidden lg:block">
                {isSearchOpen && (
                  <Button
                    variant="ghost"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-muted"
                    aria-label="Close search"
                  >
                    ✕
                  </Button>
                )}
              </div>

              {/* Mobile Search */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:bg-muted"
                  aria-label={isSearchOpen ? "Close search" : "Open search"}
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : '🔍'}
                </Button>
              </div>

              {/* Cart Button - Mobile Optimized */}
              <Button
                variant="ghost"
                className={`relative hover:bg-muted focus:bg-muted ${
                  isMobile ? 'p-2 active:scale-95' : 'p-3'
                }`}
                onClick={handleCartClick}
                aria-label={`Shopping cart with ${getCartCount()} items`}
              >
                <ShoppingCart className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5'}`} />
                {getCartCount() > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center font-bold text-xs ${
                    isMobile
                      ? 'w-5 h-5 min-w-[20px] min-h-[20px] text-xs'
                      : 'w-5 h-5 min-w-[20px] min-h-[20px]'
                  }`}>
                    {getCartCount() > 9 ? "9+" : getCartCount()}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 hover:bg-muted focus:bg-muted ${
                  isMobile ? 'active:scale-95' : ''
                }`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobile && isSearchOpen && (
            <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
              <div className="p-4">
                <SearchBar className="w-full" />
              </div>
            </div>
          )}

          {/* Mobile Menu - Bottom Sheet Style */}
          {isMobile && isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
              <div className="flex flex-col space-y-1">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-4 text-foreground hover:text-primary hover:bg-muted/50 font-medium transition-all border-b border-gray-100 active:scale-95"
                >
                  🏠 Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-4 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all border-b border-gray-100 active:scale-95"
                >
                  📖 About Us
                </Link>
                {/* Quick Actions */}
                <div className="border-t border-gray-200 p-4 flex gap-3">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleCartClick();
                    }}
                    className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-semibold text-sm active:scale-95 transition-transform"
                  >
                    Cart ({getCartCount()})
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-semibold text-sm active:scale-95 transition-transform"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobile && isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: '56px' }}
        />
      )}
    </>
  );
};

export default MinimalNavigation;
