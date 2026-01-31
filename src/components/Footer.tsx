import { Mail, Phone, MapPin, Instagram, Clock, Heart, Send, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/pizza-nova-logo.webp';

export function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Message Sent! 💌',
      description: 'Thank you for reaching out. We will get back to you soon.',
    });
    
    setName('');
    setEmail('');
    setMessage('');
    setLoading(false);
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground">
      <div className="container-main section-padding">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-gold text-sm font-medium">GET IN TOUCH</span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Contact Us</h2>
          <div className="h-1 w-20 mx-auto bg-gradient-to-r from-gold via-amber to-gold rounded-full" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <AnimatedSection className="space-y-6">
            <img src={logo} alt="Pizza Nova" className="h-16 w-auto brightness-0 invert" />
            
            <div className="space-y-4">
              <a 
                href="mailto:hellopizzanova.in" 
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hellopizzanova.in</span>
              </a>
              
              <a 
                href="mailto:pizzanova264@gmail.com" 
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>pizzanova264@gmail.com</span>
              </a>
              
              <a 
                href="tel:+919876542210" 
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+91 98765 42210</span>
              </a>
              
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>123 Gourmet Street, Food Court Road, Mumbai - 400001, India</span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="pt-4 border-t border-primary-foreground/20">
              <h3 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                Operating Hours
              </h3>
              <div className="space-y-2 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Mon-Thu: 11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>Fri-Sun: 11:00 AM - 11:30 PM</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.1} className="bg-primary-foreground/5 rounded-2xl p-6 border border-primary-foreground/10">
            <h3 className="font-serif font-semibold text-xl mb-6 text-center">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 resize-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gold text-foreground font-semibold rounded-xl hover:bg-gold/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </AnimatedSection>

          {/* Map & Social */}
          <AnimatedSection delay={0.2} className="space-y-6">
            {/* Map */}
            <div className="bg-cream rounded-xl overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755753508045!2d72.82548731490234!3d19.01759258712825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce9485c7f52f%3A0x31afc5a75c35f5b4!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pizza Nova Location"
              />
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-serif font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex items-center gap-4">
                <a 
                  href="https://instagram.com/pizzanova264" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <div className="text-primary-foreground/80">
                  <p className="font-medium">@pizzanova264</p>
                  <p className="text-sm">Follow for updates & offers</p>
                </div>
              </div>
            </div>

            <p className="text-primary-foreground/70 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 fill-gold text-gold" /> in India
            </p>
          </AnimatedSection>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/70 text-sm">
            © 2026 Pizza Nova. All rights reserved. | Crafted with Passion Since 1988
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
