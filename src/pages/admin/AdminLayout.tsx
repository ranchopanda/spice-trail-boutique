import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingBag, Palette, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/shared";

// Admin Layout - Sidebar with navigation and main content area
const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // TODO: Add proper authentication check
  const isAuthenticated = true; // Temporary - remove this when adding real auth

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard", description: "Overview & Analytics" },
    { path: "/admin/products", icon: Package, label: "Products", description: "Manage catalog" },
    { path: "/admin/testimonials", icon: Users, label: "Testimonials", description: "Customer reviews" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Orders", description: "Order management" },
    { path: "/admin/content", icon: Palette, label: "Content", description: "Hero content & media" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌾</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Spice Trail Admin</h1>
              <p className="text-sm text-gray-600">Farm-to-Table Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map(({ path, icon: Icon, label, description }) => (
            <Link
              key={path}
              to={path}
              className={`block p-4 rounded-lg transition-all duration-200 ${
                currentPath === path
                  ? "bg-green-50 border-l-4 border-green-500 text-green-700"
                  : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <div className="flex-1">
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-gray-500">{description}</div>
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <div className="font-medium">Admin User</div>
              <div>admin@spicetrail.com</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-300"
              onClick={() => {
                // TODO: Implement logout
                console.log("Logout clicked");
              }}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {navItems.find(item => item.path === currentPath)?.label || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {navItems.find(item => item.path === currentPath)?.description || "Welcome to the admin panel"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
