import { ChevronDown } from 'lucide-react';
import chefImage from '@/assets/chef-character.png';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-main relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-up">
            <div className="space-y-2">
              <p className="text-primary font-medium text-lg">Artisanal Plant-Based Craft</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
                Welcome to Pizza Nova – Where Every Bite Tells a Story
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Founded in 1988, Pizza Nova began as a small dream built on passion, handcrafted recipes, and love for pure vegetarian flavors. Every dish we serve is thoughtfully prepared using premium plant-based ingredients, blending tradition with innovation. From our oven-fresh pizzas to indulgent desserts, every bite reflects warmth, care, and authenticity.
            </p>

            <p className="text-sm font-medium text-accent italic">
              "Crafted with Love Since 1988"
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#menu" className="btn-hero-primary">
                🔍 Find My Craving
              </a>
              <a href="#customize" className="btn-hero-secondary">
                🛠️ Create My Signature
              </a>
              <a href="#order" className="btn-hero-outline">
                Order Online
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center animate-float">
            <div className="relative">
              <img 
                src={chefImage}
                alt="Pizza Nova Chef"
                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-elevated"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#why-us" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}