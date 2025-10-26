import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shared";
import { Button } from "@/components/ui/shared";
import { ShoppingBag, Eye, Truck, CheckCircle, Clock } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "#12345",
      customer: "Priya Sharma",
      items: 3,
      total: "₹2,340",
      status: "Processing",
      date: "2024-01-15",
      time: "2 hours ago"
    },
    {
      id: "#12344",
      customer: "Rajesh Kumar",
      items: 2,
      total: "₹1,850",
      status: "Shipped",
      date: "2024-01-14",
      time: "1 day ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export Orders</Button>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ShoppingBag className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.customer} • {order.items} items</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{order.total}</p>
                  <p className="text-sm text-gray-600">{order.time}</p>
                </div>

                <div className="text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'Delivered' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {order.status === 'Shipped' && <Truck className="w-4 h-4 mr-1" />}
                    {order.status === 'Processing' && <Clock className="w-4 h-4 mr-1" />}
                    {order.status}
                  </span>
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
