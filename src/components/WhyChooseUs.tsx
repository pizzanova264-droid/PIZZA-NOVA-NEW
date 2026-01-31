import { Leaf, Clock, Award, Package, Truck, Users, Star } from 'lucide-react';
import restaurantImage from '@/assets/restaurant-interior.png';
import { AnimatedSection } from './AnimatedSection';

const features = [
  { icon: Leaf, title: '100% Vegan & Vegetarian', description: 'Pure plant-based goodness' },
  { icon: Clock, title: 'Crafted Fresh Daily', description: 'Made with love every day' },
  { icon: Award, title: 'Since 1988 – Trusted Taste', description: '35+ years of excellence' },
  { icon: Package, title: 'Hygienic Packaging', description: 'Eco-friendly & safe' },
  { icon: Truck, title: 'Fast Home Delivery', description: 'Hot & fresh to your door' },
  { icon: Users, title: '2000+ Happy Customers', description: 'Loved by thousands' },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding bg-secondary">
      <div className="container-main">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Why Choose Pizza Nova?
          </h2>
          <div className="divider-decorative" />
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
            <span className="ml-2 text-lg font-semibold text-foreground">5.0 Rating</span>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={feature.title}
              delay={index * 0.1}
              className="bg-card p-4 rounded-xl text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>

        {/* Restaurant Image Grid */}
        <AnimatedSection delay={0.3} className="relative rounded-2xl overflow-hidden shadow-elevated">
          <img 
            src={restaurantImage}
            alt="Pizza Nova Restaurant Interior - Cozy Ambience with Wood-Fired Oven"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
              Experience Our Cozy Ambience
            </h3>
            <p className="text-white/90 text-lg">
              Visit us for an unforgettable dining experience with authentic wood-fired pizzas
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
