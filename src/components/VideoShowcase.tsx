import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Farm Fresh Harvest Tour",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=500&fit=crop",
    duration: "2:30",
    category: "Farm Tour"
  },
  {
    id: 2,
    title: "Organic Cooking Recipe",
    thumbnail: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&h=500&fit=crop",
    duration: "3:15",
    category: "Recipe"
  },
  {
    id: 3,
    title: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&h=500&fit=crop",
    duration: "1:45",
    category: "BTS"
  },
  {
    id: 4,
    title: "Product Packaging Process",
    thumbnail: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&h=500&fit=crop",
    duration: "2:00",
    category: "Process"
  }
];

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary font-handwritten text-xl mb-2">Watch & Learn</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
              Our Story in Motion
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get an inside look at our farm, recipes, and the journey from farm to table
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer animate-fade-up hover-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedVideo(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 group-hover:bg-secondary transition-all duration-300">
                    <Play className="w-8 h-8 text-primary group-hover:text-white fill-current" />
                  </div>
                </div>

                {/* Video info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm mb-1">{video.title}</p>
                  <div className="flex items-center justify-between text-white/80 text-xs">
                    <span className="bg-secondary/80 px-2 py-1 rounded">{video.category}</span>
                    <span>{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <div className="relative aspect-video bg-black">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedVideo && (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-semibold mb-2">{selectedVideo.title}</p>
                  <p className="text-sm text-white/60">Video player would be integrated here</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoShowcase;
