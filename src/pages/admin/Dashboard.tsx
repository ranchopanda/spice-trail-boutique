import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shared";
import { Package, Users, ShoppingBag, TrendingUp, Eye, DollarSign, Star } from "lucide-react";

const Dashboard = () => {
  // Mock data - will be replaced with real data later
  const stats = [
    {
      title: "Total Products",
      value: "28",
      change: "+12%",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+8%",
      icon: ShoppingBag,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Customers",
      value: "1,247",
      change: "+23%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Revenue",
      value: "₹89,432",
      change: "+15%",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  const recentOrders = [
    { id: "#12345", customer: "Priya Sharma", amount: "₹2,340", status: "Processing", time: "2 hours ago" },
    { id: "#12344", customer: "Rajesh Kumar", amount: "₹1,850", status: "Shipped", time: "4 hours ago" },
    { id: "#12343", customer: "Anita Desai", amount: "₹3,210", status: "Delivered", time: "1 day ago" },
  ];

  const topProducts = [
    { name: "Organic Basmati Rice", sales: 142, revenue: "₹31,240", change: "+25%" },
    { name: "Farm Fresh Vegetables Mix", sales: 98, revenue: "₹22,540", change: "+18%" },
    { name: "Premium Spices Blend", sales: 76, revenue: "₹18,240", change: "+12%" },
    { name: "Herbs Collection", sales: 54, revenue: "₹12,420", change: "+8%" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 🌾</h1>
        <p className="text-gray-600">
          Here's what's happening with your Spice Trail boutique today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-600">{order.id} • {order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{order.amount}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-green-600 hover:text-green-700 font-medium">
              View all orders →
            </button>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <span className="text-sm font-bold text-green-600">{product.change}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{product.sales} sales</span>
                    <span className="font-medium text-gray-900">{product.revenue}</span>
                  </div>
                  {index < topProducts.length - 1 && <hr className="border-gray-200" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-900">Add Product</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-900">Add Testimonial</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-900">View Analytics</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-orange-900">Process Orders</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
