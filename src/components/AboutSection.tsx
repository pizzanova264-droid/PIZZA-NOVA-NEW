import chocolateCake from '@/assets/chocolate-cake.png';

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img 
              src={chocolateCake}
              alt="Pizza Nova Signature Dessert"
              className="w-full rounded-2xl shadow-elevated"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-accent font-medium mb-2">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                A Legacy of Pure Flavors
              </h2>
            </div>
            
            <p className="text-muted-foreground">
              Founded in 1988, Pizza Nova started as a small family dream in the heart of Mumbai. 
              What began as a tiny kitchen serving handcrafted vegetarian pizzas has grown into 
              a beloved destination for food lovers across India.
            </p>
            
            <p className="text-muted-foreground">
              Our commitment to 100% plant-based ingredients isn't just a choice—it's our passion. 
              Every dish is crafted with premium ingredients, traditional recipes passed down 
              through generations, and a sprinkle of innovation that keeps our menu exciting.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold text-primary">35+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold text-primary">2000+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Menu Items</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Vegan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
