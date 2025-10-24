"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  action?: ReactNode;
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
  success: (message: string, action?: ReactNode) => void;
  error: (message: string, action?: ReactNode) => void;
  warning: (message: string, action?: ReactNode) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    ({ title, description, variant = "default", action, duration = 4000 }: Omit<ToastProps, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, variant, action, duration }]);

      // Auto-remove after duration
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message: string, action?: ReactNode) =>
      addToast({
        title: "Success",
        description: message,
        variant: "success",
        action,
      }),
    [addToast]
  );

  const error = useCallback(
    (message: string, action?: ReactNode) =>
      addToast({
        title: "Error",
        description: message,
        variant: "destructive",
        action,
        duration: 6000,
      }),
    [addToast]
  );

  const warning = useCallback(
    (message: string, action?: ReactNode) =>
      addToast({
        title: "Warning",
        description: message,
        variant: "warning",
        action,
        duration: 5000,
      }),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
