import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface MegaMenuNavigationProps {
  cartItemCount?: number;
  user?: { name: string; avatar?: string } | null;
}

const MegaMenuNavigation = ({ cartItemCount = 0, user }: MegaMenuNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    {
      title: "Products",
      submenus: [
        {
          title: "Grains & Pulses",
          items: ["Rice", "Wheat Flour", "Lentils", "Barley", "Milo"],
        },
        {
          title: "Oil & Ghee",
          items: ["Olive Oil", "Coconut Oil", "Mustard Oil", "Ghee"],
        },
        {
          title: "Vegetables",
          items: ["Tomatoes", "Spinach", "Eggplant", "Carrots", "Cucumbers"],
        },
      ],
    },
    {
      title: "Recipes",
      submenus: [
        {
          title: "Quick & Easy",
          items: ["Caprese Salad", "Pasta Dishes", "Stir Fries", "Soups"],
        },
        {
          title: "Traditional",
          items: ["Indian Curries", "Biryani", "Dahl", "Samosas"],
        },
        {
          title: "Healthy",
          items: ["Salads", "Smoothies", "Vegan Meals", "Gluten-Free"],
        },
      ],
    },
    {
      title: "About Us",
      items: ["Our Story", "Farm Practice", "Sustainability", "Careers"],
    },
    {
      title: "Contact",
      items: ["Store Locator", "Support", "Wholesale", "Partnerships"],
    },
  ];

  const handleMouseEnter = (title: string) => setOpenSubmenu(title);
  const handleMouseLeave = () => setOpenSubmenu(null);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="font-handwritten text-2xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
            >
              🌱 Natural Harvest
            </motion.div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:block w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2 rounded-full border-0 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => item.submenus && handleMouseEnter(item.title)}
                onMouseLeave={() => item.submenus && handleMouseLeave()}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors font-medium">
                  <span>{item.title}</span>
                  {item.submenus && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Mega Menu Dropdown */}
                {item.submenus && (
                  <AnimatePresence>
                    {openSubmenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-screen max-w-5xl mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {item.submenus.map((submenu, index) => (
                            <motion.div
                              key={submenu.title}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-primary">
                                {submenu.title}
                              </h3>
                              <ul className="space-y-2">
                                {submenu.items.map((subItem, subIndex) => (
                                  <motion.li
                                    key={subItem}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                                  >
                                    <a
                                      href="#"
                                      className="text-gray-700 hover:text-primary transition-colors hover:bg-accent/20 -mx-2 px-2 py-1 rounded block"
                                    >
                                      {subItem}
                                    </a>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Simple dropdown for items without submenus */}
                {!item.submenus && item.items && (
                  <div className="absolute top-full left-0 hidden group-hover:block bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-40">
                    {item.items.map((subItem, index) => (
                      <motion.a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-accent/20 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {subItem}
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="w-5 h-5" />
            </Button>

            {/* User Account */}
            {!user ? (
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            )}

            {/* Shopping Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </motion.span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-4 py-2 w-full"
                  />
                </div>

                {/* Mobile menu items */}
                {menuItems.map((item) => (
                  <div key={item.title}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-left font-medium"
                      onClick={() => setOpenSubmenu(openSubmenu === item.title ? null : item.title)}
                    >
                      <span>{item.title}</span>
                      {item.submenus && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`} />
                      )}
                    </Button>

                    {/* Mobile submenu */}
                    <AnimatePresence>
                      {openSubmenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-2 space-y-2"
                        >
                          {item.submenus && item.submenus.map((submenu) => (
                            <div key={submenu.title}>
                              <h4 className="font-semibold text-primary text-sm mb-1">
                                {submenu.title}
                              </h4>
                              {submenu.items.map((subItem) => (
                                <a
                                  key={subItem}
                                  href="#"
                                  className="block py-1 text-gray-700 hover:text-primary transition-colors text-sm"
                                >
                                  {subItem}
                                </a>
                              ))}
                            </div>
                          ))}

                          {item.items && !item.submenus &&
                            item.items.map((subItem) => (
                              <a
                                key={subItem}
                                href="#"
                                className="block py-1 text-gray-700 hover:text-primary transition-colors text-sm"
                              >
                                {subItem}
                              </a>
                            ))
                          }
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile auth */}
                {!user ? (
                  <div className="pt-4 border-t border-gray-200">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <User className="w-4 h-4 mr-2" />
                      Sign In / Sign Up
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 flex items-center space-x-3">
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-gray-500">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default MegaMenuNavigation;
