import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

// Import combo images
import comboBurger from '@/assets/menu/combo-burger.jpg';
import comboPizza from '@/assets/menu/combo-pizza.jpg';
import comboWaffle from '@/assets/menu/combo-waffle.jpg';
import comboFamily from '@/assets/menu/combo-family.jpg';

interface Combo {
  id: string;
  name: string;
  items: string[];
  originalPrice: number;
  comboPrice: number;
  savings: number;
  image: string;
}

const combos: Combo[] = [
  {
    id: 'combo-pizza-meal',
    name: 'Pizza Meal Deal',
    items: ['Margherita Pizza', 'Garlic Bread', 'Cola'],
    originalPrice: 599,
    comboPrice: 499,
    savings: 100,
    image: comboPizza,
  },
  {
    id: 'combo-burger-feast',
    name: 'Burger Feast',
    items: ['Veg Burger Supreme', 'Peri Peri Fries', 'Shake'],
    originalPrice: 449,
    comboPrice: 379,
    savings: 70,
    image: comboBurger,
  },
  {
    id: 'combo-waffle-delight',
    name: 'Waffle Delight',
    items: ['Belgian Waffle', 'Ice Cream', 'Coffee'],
    originalPrice: 399,
    comboPrice: 329,
    savings: 70,
    image: comboWaffle,
  },
  {
    id: 'combo-family',
    name: 'Family Pack',
    items: ['2 Pizzas', '2 Pastas', '4 Drinks', 'Dessert'],
    originalPrice: 1599,
    comboPrice: 1299,
    savings: 300,
    image: comboFamily,
  },
];

export function ComboSuggestions() {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestedCombo, setSuggestedCombo] = useState<Combo | null>(null);
  const { items, addToCart, totalPrice } = useCart();

  useEffect(() => {
    // Show combo suggestion when cart has items
    if (items.length > 0 && totalPrice > 200 && totalPrice < 500) {
      // Find relevant combo
      const hasPizza = items.some(i => i.name.toLowerCase().includes('pizza'));
      const hasBurger = items.some(i => i.name.toLowerCase().includes('burger'));
      const hasWaffle = items.some(i => i.name.toLowerCase().includes('waffle'));
      
      let combo: Combo | null = null;
      if (hasPizza) combo = combos[0];
      else if (hasBurger) combo = combos[1];
      else if (hasWaffle) combo = combos[2];
      else combo = combos[Math.floor(Math.random() * 3)];
      
      setSuggestedCombo(combo);
      
      // Show after a delay
      const timer = setTimeout(() => {
        setShowSuggestion(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [items, totalPrice]);

  const handleAddCombo = () => {
    if (!suggestedCombo) return;
    
    addToCart({
      id: suggestedCombo.id,
      name: suggestedCombo.name,
      price: suggestedCombo.comboPrice,
      image: suggestedCombo.image,
    });
    
    toast({
      title: '🎉 Combo Added!',
      description: `You saved ₹${suggestedCombo.savings} with this combo!`,
    });
    
    setShowSuggestion(false);
  };

  return (
    <AnimatePresence>
      {showSuggestion && suggestedCombo && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 right-6 z-40 max-w-sm"
        >
          <div className="bg-card rounded-2xl shadow-elevated border border-gold/30 overflow-hidden">
            <button
              onClick={() => setShowSuggestion(false)}
              className="absolute top-2 right-2 p-1.5 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex gap-4 p-4">
              <img
                src={suggestedCombo.image}
                alt={suggestedCombo.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-1 text-gold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-medium">Smart Suggestion</span>
                </div>
                
                <h3 className="font-serif font-bold text-foreground">{suggestedCombo.name}</h3>
                
                <p className="text-xs text-muted-foreground mt-1">
                  {suggestedCombo.items.join(' + ')}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-primary">₹{suggestedCombo.comboPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{suggestedCombo.originalPrice}</span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">
                    Save ₹{suggestedCombo.savings}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="px-4 pb-4">
              <button
                onClick={handleAddCombo}
                className="w-full btn-hero-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add Combo & Save
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
