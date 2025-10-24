import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onResultSelect?: (product: any) => void;
  className?: string;
}

export function SearchBar({ placeholder = "Search products...", onResultSelect, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample product data - in real app this would come from API
  const products = [
    { id: 1, name: "Organic Vegetables Mix", category: "Vegetables", price: "₹299" },
    { id: 2, name: "Premium Rice", category: "Grains", price: "₹449" },
    { id: 3, name: "Organic Spices", category: "Spices", price: "₹349" },
    { id: 4, name: "Fresh Herbs", category: "Herbs", price: "₹199" }
  ];

  // Basic client-side search
  const searchProducts = (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered.slice(0, 5)); // Limit to 5 results
    setIsOpen(filtered.length > 0);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleSelect = (product: any) => {
    setQuery(product.name);
    setIsOpen(false);
    if (onResultSelect) {
      onResultSelect(product);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
          role="searchbox"
          aria-label="Search products"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2 border-b border-gray-100">
            <p className="text-xs text-gray-500">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <span className="text-sm font-medium text-primary">{product.price}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-gray-500">No products found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
