import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { MenuSection } from '@/components/MenuSection';
import { PizzaCustomizer } from '@/components/PizzaCustomizer';
import { CombosSection } from '@/components/CombosSection';
import { CouponsSection } from '@/components/CouponsSection';
import { AboutSection } from '@/components/AboutSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { DeliverySection } from '@/components/DeliverySection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <MenuSection />
        <PizzaCustomizer />
        <CombosSection />
        <CouponsSection />
        <AboutSection />
        <ReviewsSection />
        <DeliverySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
