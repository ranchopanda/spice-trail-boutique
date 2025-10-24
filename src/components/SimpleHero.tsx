// Simplified components without external dependencies
const Button = ({ children, className = "", onClick, disabled }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const SimpleHero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-lg border-2 border-green-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Clean Header */}
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-primary mb-6 font-handwritten">
              Fresh Organic Produce
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connecting local farmers with conscious consumers. Discover nutrient-rich,
              chemical-free produce delivered straight from farm to table.
            </p>
          </div>

          {/* Simple CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-lg">
              🌿 Shop Fresh Produce
            </Button>
            <Button
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg font-semibold shadow-lg"
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Explore Products
            </Button>
          </div>

          {/* Clean Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-scale-in">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary font-handwritten mb-2">100%</div>
              <div className="text-sm text-gray-600">Organic Certified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary font-handwritten mb-2">25+</div>
              <div className="text-sm text-gray-600">Local Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary font-handwritten mb-2">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleHero;
