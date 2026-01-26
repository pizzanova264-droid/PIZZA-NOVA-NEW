import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    name: 'Aditya Mehta',
    rating: 5,
    review: 'The Paneer Tikka pizza is absolutely incredible! Best vegetarian pizza I\'ve ever tasted. My whole family loves this place and we order every weekend.',
    date: 'January 2026',
    location: 'Mumbai',
  },
  {
    name: 'Sneha Kapoor',
    rating: 5,
    review: 'Finally found a 100% vegan restaurant that doesn\'t compromise on taste! The waffles are divine and the service is exceptional.',
    date: 'January 2026',
    location: 'Pune',
  },
  {
    name: 'Rajesh Krishnan',
    rating: 5,
    review: 'Been ordering from Pizza Nova for 3 years now. The quality is always consistent and the delivery is super fast. Highly recommend!',
    date: 'January 2026',
    location: 'Bangalore',
  },
  {
    name: 'Priyanka Sharma',
    rating: 5,
    review: 'The Frankies here are better than any street food! So flavorful and fresh. My kids can\'t get enough of the Cheese Burst Frankie.',
    date: 'December 2025',
    location: 'Delhi',
  },
  {
    name: 'Karthik Iyer',
    rating: 5,
    review: 'Amazing ambience and even better food. The Vegan Supreme pizza and Blue Lagoon mocktail are my favorites. Perfect for date nights!',
    date: 'December 2025',
    location: 'Chennai',
  },
  {
    name: 'Neha Agarwal',
    rating: 5,
    review: 'The best vegan cheesecake I\'ve ever had! You cannot tell it\'s plant-based. Pizza Nova has set a new standard for vegan desserts.',
    date: 'November 2025',
    location: 'Hyderabad',
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <AnimatedSection className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            ⭐ What Our Customers Say
          </h2>
          <div className="divider-decorative" />
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-lg font-semibold">5.0 Rating • 2000+ Reviews</span>
          </div>
        </AnimatedSection>

        {/* Reviews Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl p-8 shadow-medium"
            >
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-lg text-foreground text-center mb-6 italic">
                "{reviews[currentIndex].review}"
              </p>
              <div className="text-center">
                <p className="font-semibold text-foreground">{reviews[currentIndex].name}</p>
                <p className="text-sm text-muted-foreground">{reviews[currentIndex].location} • {reviews[currentIndex].date}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
