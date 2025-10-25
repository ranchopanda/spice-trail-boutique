import { forwardRef, createContext, useContext, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselContextValue {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  itemsCount: number;
  setItemsCount: (count: number) => void;
}

const CarouselContext = createContext<CarouselContextValue | undefined>(undefined);

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: {
    align?: "start" | "center" | "end";
    loop?: boolean;
  };
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ className = "", children, opts, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsCount, setItemsCount] = useState(0);

    return (
      <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, itemsCount, setItemsCount }}>
        <div ref={ref} className={`relative ${className}`} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    const context = useContext(CarouselContext);
    
    useEffect(() => {
      if (context) {
        const count = Array.isArray(children) ? children.length : 1;
        context.setItemsCount(count);
      }
    }, [children, context]);

    return (
      <div ref={ref} className={`overflow-hidden ${className}`} {...props}>
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${(context?.currentIndex || 0) * 100}%)` }}
        >
          {children}
        </div>
      </div>
    );
  }
);

CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`min-w-full flex-shrink-0 ${className}`} {...props} />
  )
);

CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", ...props }, ref) => {
    const context = useContext(CarouselContext);
    
    const handlePrevious = useCallback(() => {
      if (context) {
        const newIndex = context.currentIndex > 0 
          ? context.currentIndex - 1 
          : context.itemsCount - 1;
        context.setCurrentIndex(newIndex);
      }
    }, [context]);

    return (
      <button
        ref={ref}
        onClick={handlePrevious}
        className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 transition-colors ${className}`}
        {...props}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    );
  }
);

CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", ...props }, ref) => {
    const context = useContext(CarouselContext);
    
    const handleNext = useCallback(() => {
      if (context) {
        const newIndex = context.currentIndex < context.itemsCount - 1 
          ? context.currentIndex + 1 
          : 0;
        context.setCurrentIndex(newIndex);
      }
    }, [context]);

    return (
      <button
        ref={ref}
        onClick={handleNext}
        className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 transition-colors ${className}`}
        {...props}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    );
  }
);

CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
