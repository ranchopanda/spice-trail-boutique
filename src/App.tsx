import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider, useToast, ToastContainer } from "@/components/ui/shared";

// Code splitting with lazy loading for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin panel routes
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminTestimonials = lazy(() => import("./pages/admin/Testimonials"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const AdminContent = lazy(() => import("./pages/admin/Content"));

// Simple loading fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

// ToastConsumer component to properly access toast context
const ToastConsumer = () => {
  const { toasts, removeToast } = useToast();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
};

const App = () => (
  <ToastProvider>
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="content" element={<AdminContent />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastConsumer />
    </BrowserRouter>
  </ToastProvider>
);

export default App;
