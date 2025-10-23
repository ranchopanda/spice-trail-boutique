import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-handwritten font-bold mb-4">Natural Harvest</h3>
            <p className="text-primary-foreground/80 mb-4">
              Premium organic produce from our farms to your table. Pure, natural, and full of goodness.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Shop All</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Our Farms</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Membership</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Shipping Info</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>123 Farm Road, Organic Valley, IN 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+911234567890" className="hover:text-secondary transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:hello@naturalharvest.com" className="hover:text-secondary transition-colors">
                  hello@naturalharvest.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Natural Harvest. All rights reserved. Made with love for healthy living.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
