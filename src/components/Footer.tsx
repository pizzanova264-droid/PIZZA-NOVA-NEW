import { Mail, Phone, MapPin, Instagram, Twitter, Clock, Heart } from 'lucide-react';
import logo from '@/assets/pizza-nova-logo.webp';

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container-main section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Pizza Nova" className="h-20 w-auto brightness-0 invert" />
            <p className="text-background/70 text-sm">
              Crafted with Love Since 1988. 100% Vegan & Vegetarian artisanal pizzas and more.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:hello@pizzanova.in" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Mail className="w-5 h-5" />
                <span>hello@pizzanova.in</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>123 Gourmet Street, Food Court Road, Mumbai 400001, India</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg">Opening Hours</h3>
            <div className="space-y-2 text-background/70">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon - Thu: 11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Fri - Sun: 11:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/pizzanova" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/pizzanova" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-background/70">
              @pizzanova
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/70 text-sm">
            © 2026 Pizza Nova. All rights reserved.
          </p>
          <p className="text-background/70 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 fill-primary text-primary" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
