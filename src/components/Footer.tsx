import { Mail, Phone, MapPin, Instagram, Clock, Heart, Send } from 'lucide-react';
import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import logo from '@/assets/pizza-nova-logo.webp';

export function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-foreground to-foreground/95 text-background">
      <div className="container-main section-padding">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Contact Us</h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary via-gold to-accent rounded-full" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <AnimatedSection className="space-y-4">
            <img src={logo} alt="Pizza Nova" className="h-20 w-auto brightness-0 invert" />
            <p className="text-background/70 text-sm">
              Crafted with Passion Since 1988. A legacy of authentic vegan flavours, premium ingredients, and unforgettable ambiance.
            </p>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.1} className="space-y-4">
            <h3 className="font-serif font-semibold text-lg flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" />
              Get in Touch
            </h3>
            <div className="space-y-3">
              <a href="mailto:pizzanova264@gmail.com" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                <span>pizzanova264@gmail.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Gourmet Street, Food Court Road, Mumbai 400001, India</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Hours */}
          <AnimatedSection delay={0.2} className="space-y-4">
            <h3 className="font-serif font-semibold text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              Opening Hours
            </h3>
            <div className="space-y-2 text-background/70">
              <div className="flex justify-between">
                <span>Mon - Thu:</span>
                <span>11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sun:</span>
                <span>11:00 AM - 11:00 PM</span>
              </div>
            </div>
            
            <h3 className="font-serif font-semibold text-lg pt-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/pizzanova264" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-background/70">@pizzanova264</p>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.3} className="space-y-4">
            <h3 className="font-serif font-semibold text-lg">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:border-gold focus:outline-none"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:border-gold focus:outline-none"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:border-gold focus:outline-none resize-none"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-gold text-foreground font-semibold rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </AnimatedSection>
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
