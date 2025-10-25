import { motion } from "framer-motion";
import { Award, Shield, CheckCircle, Leaf, Heart, Star, Users, Truck, Clock, Globe } from "lucide-react";

interface Certification {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'organic' | 'quality' | 'sustainability' | 'safety' | 'service';
  color: string;
  bgColor: string;
  verified?: boolean;
  badge?: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    name: "Organic Certified",
    description: "100% certified organic produce grown without synthetic pesticides or fertilizers",
    icon: <Leaf className="w-6 h-6" />,
    category: 'organic',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    verified: true,
    badge: 'USDA Organic'
  },
  {
    id: 2,
    name: "Non-GMO Project",
    description: "Verified non-GMO products ensuring genetic integrity and consumer choice",
    icon: <Shield className="w-6 h-6" />,
    category: 'quality',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    verified: true,
    badge: 'Non-GMO Verified'
  },
  {
    id: 3,
    name: "Fair Trade Certified",
    description: "Supporting fair wages and ethical treatment of farmers and workers",
    icon: <Heart className="w-6 h-6" />,
    category: 'sustainability',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    verified: true,
    badge: 'Fair Trade'
  },
  {
    id: 4,
    name: "Food Safety Certified",
    description: "HACCP and GMP certified facilities ensuring highest food safety standards",
    icon: <CheckCircle className="w-6 h-6" />,
    category: 'safety',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    verified: true,
    badge: 'HACCP & GMP'
  },
  {
    id: 5,
    name: "Sustainable Farming",
    description: "Environmentally responsible farming practices that protect our planet",
    icon: <Globe className="w-6 h-6" />,
    category: 'sustainability',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    verified: true,
    badge: 'Sustainable'
  },
  {
    id: 6,
    name: "Award Winning Quality",
    description: "Recognized for excellence in organic produce quality and customer satisfaction",
    icon: <Award className="w-6 h-6" />,
    category: 'quality',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    verified: true,
    badge: 'Quality Award'
  }
];

const stats = [
  {
    id: 1,
    number: "5000+",
    label: "Happy Customers",
    icon: <Users className="w-5 h-5" />,
    color: 'text-primary'
  },
  {
    id: 2,
    number: "100%",
    label: "Organic Certified",
    icon: <Leaf className="w-5 h-5" />,
    color: 'text-green-600'
  },
  {
    id: 3,
    number: "50+",
    label: "Farm Partners",
    icon: <Truck className="w-5 h-5" />,
    color: 'text-blue-600'
  },
  {
    id: 4,
    number: "4.9★",
    label: "Average Rating",
    icon: <Star className="w-5 h-5" />,
    color: 'text-yellow-600'
  }
];

const CertificationBadges = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-8 h-8 text-primary" />
              <span className="text-secondary font-handwritten text-xl">Certified & Trusted</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-handwritten text-primary mb-4">
              Quality You Can Trust
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every product is backed by rigorous certifications and quality standards. We're committed to transparency, sustainability, and your health.
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 pattern-farm-grid" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${cert.bgColor} ${cert.color} group-hover:scale-110 transition-transform duration-300`}>
                    {cert.icon}
                  </div>
                  {cert.verified && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Badge */}
                {cert.badge && (
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                      {cert.badge}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {cert.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cert.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statistics */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Trusted by Thousands
            </h3>
            <p className="text-gray-600">
              Our commitment to quality speaks through our satisfied customers and industry recognition
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color.replace('text-', 'bg-').replace('600', '100')} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={stat.color}>
                    {stat.icon}
                  </span>
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1 font-handwritten">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🛡️ Your Safety is Our Priority
            </h3>
            <p className="text-gray-600 mb-6">
              Every product undergoes rigorous testing and quality control. Shop with confidence knowing you're getting the best organic produce available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Learn More About Our Standards
              </button>
              <button className="border border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-6 py-3 rounded-lg font-semibold transition-colors">
                Download Certificates
              </button>
            </div>
          </div>
        </motion.div>

        {/* Additional Trust Elements */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {/* Quality Guarantee */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Quality Guarantee</h4>
            <p className="text-gray-600 text-sm">
              100% satisfaction guarantee or your money back within 30 days
            </p>
          </motion.div>

          {/* Fresh Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Fresh Delivery</h4>
            <p className="text-gray-600 text-sm">
              Farm-fresh products delivered within 24 hours of harvest
            </p>
          </motion.div>

          {/* 24/7 Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h4>
            <p className="text-gray-600 text-sm">
              Expert customer support available whenever you need assistance
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificationBadges;
