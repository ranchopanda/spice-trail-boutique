import { forwardRef } from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-gray-100 text-gray-800 border-gray-200",
      secondary: "bg-secondary text-secondary-foreground border-secondary",
      destructive: "bg-red-100 text-red-800 border-red-200",
      outline: "border border-gray-300 bg-white text-gray-900",
      success: "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps };
