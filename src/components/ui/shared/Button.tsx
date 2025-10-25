import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };

    const variantClasses = {
      primary: "bg-primary hover:bg-primary/90 text-white border border-primary shadow-md",
      secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-secondary",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
      ghost: "hover:bg-gray-100 text-gray-700 border-0",
      destructive: "bg-red-600 hover:bg-red-700 text-white border border-red-600",
    };

    const disabledClasses = props.disabled
      ? "!opacity-50 !cursor-not-allowed !pointer-events-none"
      : "";

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabledClasses}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
