import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shared";
import { Button } from "@/components/ui/shared";
import { Package, Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";

const Products = () => {
  // Mock products data - will be replaced with real data later
  const products = [
    {
      id: 1,
      name: "Organic Basmati Rice",
      category: "grains",
      price: "₹299",
      inventory: 50,
      status: "Active",
      image: "/assets/products-grains.jpg"
    },
    {
      id: 2,
      name: "Farm Fresh Vegetables",
      category: "vegetables",
      price: "₹185",
      inventory: 25,
      status: "Active",
      image: "/assets/products-vegetables.jpg"
    },
    {
      id: 3,
      name: "Premium Spices Blend",
      category: "spices",
      price: "₹349",
      inventory: 15,
      status: "Low Stock",
      image: "/assets/products-spices.jpg"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your farm-fresh catalog</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                  <span className="font-bold text-green-600 text-lg">{product.price}</span>
                </div>

                <p className="text-sm text-gray-600 capitalize mb-3">{product.category}</p>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>In stock: {product.inventory}</span>
                  <span className="capitalize">{product.category}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Product Card */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Product</h3>
          <p className="text-gray-600 mb-4">
            Upload your farm-fresh products to expand your catalog
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            Start Adding Products
          </Button>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Bulk Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              Import Products (CSV)
            </Button>
            <Button variant="outline" className="justify-start">
              Update Prices
            </Button>
            <Button variant="outline" className="justify-start">
              Export Catalog
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
