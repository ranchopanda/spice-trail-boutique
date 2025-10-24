import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface SearchResult {
  id: number;
  name: string;
  category: string;
  image: string;
  price?: string;
  type: "product" | "recipe" | "blog";
}

const mockProducts: SearchResult[] = [
  { id: 1, name: "Organic Tomatoes", category: "Vegetables", image: "https://images.unsplash.com/photo-1546470427-e9b2dfd26cb6?w=100", price: "$4.99", type: "product" },
  { id: 2, name: "Basil Seeds", category: "Seeds", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100", price: "$8.50", type: "product" },
  { id: 3, name: "virgin Olive Oil", category: "Oil", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100", price: "$12.99", type: "product" },
  { id: 4, name: "Fresh Milk", category: "Dairy", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100", price: "$3.99", type: "product" },
];

const mockRecipes: SearchResult[] = [
  { id: 101, name: "Caprese Salad", category: "Recipe", image: "https://images.unsplash.com/photo-1551782456-104818c8ed84?w=100", type: "recipe" },
  { id: 102, name: "Tomato Basil Pasta", category: "Recipe", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=100", type: "recipe" },
  { id: 103, name: "Vegan Stir Fry", category: "Recipe", image: "https://images.unsplash.com/photo-1542124291-cbc3253f250e?w=100", type: "recipe" },
];

const mockBlogs: SearchResult[] = [
  { id: 201, name: "Benefits of Organic Farming", category: "Blog", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100", type: "blog" },
  { id: 202, name: "Seasonal Eating Guide", category: "Blog", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=100", type: "blog" },
];

const recentSearches = [
  "organic tomatoes",
  "basil seeds",
  "olive oil recipes",
  "seasonal vegetables"
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results based on query and category
  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const allResults = [...mockProducts, ...mockRecipes, ...mockBlogs];
      const filtered = allResults.filter(result => {
        const matchesQuery = result.name.toLowerCase().includes(query.toLowerCase()) ||
                           result.category.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory === "all" || result.type === selectedCategory;
        return matchesQuery && matchesCategory;
      });
      setFilteredResults(filtered);
      setIsLoading(false);
    }, 300);
  }, [query, selectedCategory]);

  const handleSearch = (searchQuery: string) => {
    console.log("Searching for:", searchQuery);
    setIsOpen(false);
    // Implement search navigation logic here
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredResults([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products, recipes, or tips..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-10 pr-10 py-3 text-lg rounded-full border-2 border-accent/30 focus:border-primary transition-colors"
          />
          {query && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={clearSearch}
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query.trim() || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {/* Category Filters */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: "all", label: "All" },
                    { value: "product", label: "Products" },
                    { value: "recipe", label: "Recipes" },
                    { value: "blog", label: "Articles" }
                  ].map((category) => (
                    <motion.button
                      key={category.value}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.value
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedCategory(category.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && query.trim() && (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">Searching...</p>
              </div>
            )}

            {/* No Results */}
            {!isLoading && query.trim() && filteredResults.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-4xl mb-2">🥕</div>
                <p className="font-semibold text-gray-900 mb-1">No results found</p>
                <p className="text-sm text-muted-foreground">Try searching for products, recipes, or tips</p>
              </div>
            )}

            {/* Recent Searches */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-gray-900">Recent Searches</span>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setQuery(search)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && query.trim() && filteredResults.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">
                    {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedCategory === "all" ? "All" : selectedCategory}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {filteredResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card
                        className="p-3 hover:bg-gray-50 cursor-pointer border-0 shadow-none"
                        onClick={() => handleSearch(result.name)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                            <img
                              src={result.image}
                              alt={result.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{result.name}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{result.category}</span>
                              {result.price && (
                                <span className="text-sm font-semibold text-primary">{result.price}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {query.trim() && filteredResults.length > 5 && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleSearch(query)}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search for "{query}"
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop click to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
