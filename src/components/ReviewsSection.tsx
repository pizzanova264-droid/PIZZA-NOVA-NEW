import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    review: 'The Truffle Mushroom pizza is absolutely divine! Best vegan pizza I\'ve ever had. The ambience is cozy and staff is super friendly.',
    date: 'January 2026',
  },
  {
    name: 'Rahul Verma',
    rating: 5,
    review: 'Finally a place that takes vegan food seriously! The paneer tikka pizza reminded me of home. Will definitely order again!',
    date: 'January 2026',
  },
  {
    name: 'Anita Patel',
    rating: 5,
    review: 'The waffles are out of this world! My kids loved the Oreo Crunch. Great family-friendly restaurant with amazing service.',
    date: 'December 2025',
  },
  {
    name: 'Vikram Singh',
    rating: 5,
    review: 'Been coming here since 1995. Pizza Nova never disappoints. The quality and taste have remained consistent over the years.',
    date: 'December 2025',
  },
  {
    name: 'Meera Gupta',
    rating: 5,
    review: 'The mocktails are so refreshing! Blue Lagoon is my favorite. Perfect place for date nights with the romantic ambience.',
    date: 'November 2025',
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
        <div className="text-center mb-12 space-y-4">
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
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-medium">
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
              <p className="text-sm text-muted-foreground">{reviews[currentIndex].date}</p>
            </div>
          </div>

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
