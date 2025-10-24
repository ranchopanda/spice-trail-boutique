import { useEffect } from "react";
import { X } from "lucide-react";

interface ToastItemProps {
  toast: {
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success" | "warning";
    action?: React.ReactNode;
  };
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { id, title, description, variant = "default", action } = toast;

  // Auto animation
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const variantClasses = {
    default: "bg-white border-gray-200 text-gray-900",
    destructive: "bg-red-50 border-red-200 text-red-900",
    success: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  };

  return (
    <div
      className={`max-w-sm w-full bg-white shadow-lg rounded-lg border pointer-events-auto ring-1 ring-black ring-opacity-5 ${variantClasses[variant]}`}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1 w-0 pt-0.5">
            {title && (
              <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onRemove(id)}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success" | "warning";
    action?: React.ReactNode;
  }>;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-0 right-0 z-50 p-6 space-y-4"
      aria-live="assertive"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
