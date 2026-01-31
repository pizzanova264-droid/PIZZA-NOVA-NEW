import chocolateCake from '@/assets/chocolate-cake.png';
import packagingImage from '@/assets/packaging.jpg';
import { AnimatedSection } from './AnimatedSection';

const timeline = [
  { year: '1988', title: 'Founded in Mumbai', description: 'Our journey began with a small kitchen' },
  { year: '1998', title: 'Expanded to 5 Locations', description: 'Growing with your love' },
  { year: '2010', title: '100% Vegan Menu', description: 'Committed to plant-based cuisine' },
  { year: '2024', title: 'Online Delivery', description: 'Serving at your doorstep' },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-main">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <p className="text-gold-accent font-medium mb-2">Welcome to Pizza Nova</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            A Legacy of Flavor and Family
          </h2>
          <div className="divider-decorative mt-4" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <AnimatedSection className="relative">
            <img 
              src={chocolateCake}
              alt="Pizza Nova Signature Dessert"
              className="w-full rounded-2xl shadow-elevated"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2} className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Since 1988, Pizza Nova has been more than a restaurant — it's a celebration of Italian vegan 
              traditions, and family memories. Founded with a passion for authentic flavors, we've grown 
              into a destination for those who seek elegance on every plate.
            </p>
            
            <p className="text-muted-foreground">
              Our commitment to 100% plant-based ingredients isn't just a choice—it's our passion. 
              Every dish is crafted with premium ingredients, traditional recipes passed down 
              through generations, and a sprinkle of innovation that keeps our menu exciting.
            </p>

            <div className="bg-muted/50 rounded-xl p-6 border-l-4 border-gold">
              <p className="text-foreground font-serif text-lg italic">
                "Every dish tells a story. Every table holds a memory."
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#menu" className="btn-hero-primary">
                Explore Our Menu
              </a>
              <a href="#contact" className="btn-hero-outline">
                Reserve Your Table
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Our Story Timeline */}
        <AnimatedSection delay={0.3} className="mb-16">
          <h3 className="text-2xl font-serif font-bold text-foreground text-center mb-8">Our Story</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-gold to-primary" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeline.map((item, index) => (
                <div 
                  key={item.year}
                  className="text-center p-4 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all"
                >
                  <div className="text-2xl font-bold text-gold-accent mb-2">{item.year}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Grid */}
        <AnimatedSection delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/20">
              <div className="text-3xl font-bold text-primary">35+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="text-center p-6 bg-gold/10 rounded-xl border border-gold/20">
              <div className="text-3xl font-bold text-gold-accent">2000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/20">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Menu Items</div>
            </div>
            <div className="text-center p-6 bg-gold/10 rounded-xl border border-gold/20">
              <div className="text-3xl font-bold text-gold-accent">100%</div>
              <div className="text-sm text-muted-foreground">Vegan</div>
            </div>
          </div>
        </AnimatedSection>

        {/* Packaging Section */}
        <AnimatedSection delay={0.5} className="mt-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-foreground">
                Eco-Friendly Packaging
              </h3>
              <p className="text-muted-foreground">
                We care about our planet as much as we care about our food. All our packaging 
                is 100% eco-friendly, biodegradable, and designed to keep your food fresh and hot.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Biodegradable boxes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Recyclable cups & containers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Paper straws only
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src={packagingImage}
                alt="Pizza Nova Eco-Friendly Packaging"
                className="w-full rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
