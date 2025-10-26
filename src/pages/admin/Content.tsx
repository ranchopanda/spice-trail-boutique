import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shared";
import { Button } from "@/components/ui/shared";
import { Palette, Upload, Video, Image, FileText, Eye, Edit } from "lucide-react";

const Content = () => {
  const contentSections = [
    {
      title: "Hero Section",
      description: "Main landing page hero with farm background and video",
      items: ["Hero Farm Video", "Hero Background Image", "Welcome Message"],
      icon: Video,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Product Images",
      description: "High-resolution product photos and gallery images",
      items: ["Product Category Images", "Product Detail Shots", "Agricultural Photography"],
      icon: Image,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Social Media",
      description: "Instagram feed images and social content",
      items: ["Farm Lifestyle Photos", "Customer Stories", "Behind-the-scenes"],
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "About Content",
      description: "Farm story, farmer profiles, and company information",
      items: ["Farm History", "Farmer Interviews", "Sustainability Stories"],
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage website media, videos, and content</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Bulk Upload</Button>
          <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentSections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${section.bgColor}`}>
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Uploads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Recent Uploads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Image className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">farm-harvest.jpg</p>
                  <p className="text-sm text-gray-600">2.3 MB • JPG • Uploaded 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Video className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">morning-harvest.mp4</p>
                  <p className="text-sm text-gray-600">45.2 MB • MP4 • Uploaded 1 day ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Types Supported */}
      <Card>
        <CardHeader>
          <CardTitle>Supported File Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <Image className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Images</p>
              <p className="text-sm text-gray-600">JPG, PNG, WebP</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Video className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Videos</p>
              <p className="text-sm text-gray-600">MP4, WebM</p>
            </div>
            <div className="p-4 border rounded-lg">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Documents</p>
              <p className="text-sm text-gray-600">PDF, TXT</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Palette className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Assets</p>
              <p className="text-sm text-gray-600">SVG, ICON</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Content;
