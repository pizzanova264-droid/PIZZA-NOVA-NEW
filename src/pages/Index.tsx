import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { MenuSection } from '@/components/MenuSection';
import { PizzaCustomizer } from '@/components/PizzaCustomizer';
import { CombosSection } from '@/components/CombosSection';
import { CouponsSection } from '@/components/CouponsSection';
import { AboutSection } from '@/components/AboutSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { DeliverySection } from '@/components/DeliverySection';
import { Footer } from '@/components/Footer';
import { VoiceSearch } from '@/components/VoiceSearch';
import { MetaAIChatbot } from '@/components/MetaAIChatbot';

const Index = () => {
  const handleVoiceSearch = (query: string) => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <RecentlyViewed />
        <MenuSection />
        <PizzaCustomizer />
        <CombosSection />
        <CouponsSection />
        <AboutSection />
        <ReviewsSection />
        <DeliverySection />
      </main>
      <Footer />
      <VoiceSearch onSearch={handleVoiceSearch} />
      <MetaAIChatbot />
    </div>
  );
};

export default Index;
