import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, MapPin, Clock } from "lucide-react";

interface Activity {
  id: number;
  type: 'purchase' | 'view' | 'wishlist' | 'review';
  user: string;
  product: string;
  location: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

const sampleActivities: Activity[] = [
  {
    id: 1,
    type: 'purchase',
    user: 'Priya S.',
    product: 'Organic Vegetables Mix',
    location: 'Mumbai',
    time: '2 min ago',
    icon: <ShoppingCart className="w-4 h-4" />,
    color: 'text-green-600'
  },
  {
    id: 2,
    type: 'view',
    user: 'Rajesh K.',
    product: 'Premium Rice & Grains',
    location: 'Delhi',
    time: '5 min ago',
    icon: <Eye className="w-4 h-4" />,
    color: 'text-blue-600'
  },
  {
    id: 3,
    type: 'wishlist',
    user: 'Anita M.',
    product: 'Fresh Herbs Collection',
    location: 'Bangalore',
    time: '8 min ago',
    icon: <Heart className="w-4 h-4" />,
    color: 'text-red-600'
  },
  {
    id: 4,
    type: 'review',
    user: 'Vikram P.',
    product: 'Organic Fruits Basket',
    location: 'Chennai',
    time: '12 min ago',
    icon: <Star className="w-4 h-4" />,
    color: 'text-yellow-600'
  },
  {
    id: 5,
    type: 'purchase',
    user: 'Sunita R.',
    product: 'Cold-Pressed Oils',
    location: 'Pune',
    time: '15 min ago',
    icon: <ShoppingCart className="w-4 h-4" />,
    color: 'text-green-600'
  }
];

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate new activities every 10-15 seconds
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: ['purchase', 'view', 'wishlist', 'review'][Math.floor(Math.random() * 4)] as any,
        user: ['Amit S.', 'Kavita P.', 'Rohit M.', 'Meera K.', 'Suresh B.'][Math.floor(Math.random() * 5)],
        product: ['Organic Vegetables Mix', 'Premium Rice & Grains', 'Fresh Herbs Collection', 'Organic Fruits Basket'][Math.floor(Math.random() * 4)],
        location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad'][Math.floor(Math.random() * 6)],
        time: 'just now',
        icon: <ShoppingCart className="w-4 h-4" />,
        color: 'text-green-600'
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Live Activity Feed */}
      <div className="fixed top-24 right-4 z-40 max-w-sm">
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-900">Live Activity</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>

          {/* Activities List */}
          <div className="space-y-3">
            <AnimatePresence>
              {activities.slice(0, 3).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                    {activity.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span className="text-gray-600">
                        {activity.type === 'purchase' && 'purchased'}
                        {activity.type === 'view' && 'viewed'}
                        {activity.type === 'wishlist' && 'added to wishlist'}
                        {activity.type === 'review' && 'reviewed'}
                      </span>
                      {' '}
                      <span className="font-medium">{activity.product}</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Join 2,500+ customers shopping now! 🛒
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating Customer Counter */}
      <motion.div
        className="fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow-lg z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold">1,247 people shopping now</span>
        </div>
      </motion.div>
    </>
  );
};

export default LiveActivityFeed;
