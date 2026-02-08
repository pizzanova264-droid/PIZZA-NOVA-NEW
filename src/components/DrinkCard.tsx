import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface DrinkSize {
  label: string;
  ml: number;
  price: number;
}

const DRINK_SIZES: DrinkSize[] = [
  { label: 'S', ml: 300, price: 49 },
  { label: 'M', ml: 500, price: 79 },
  { label: 'L', ml: 750, price: 109 },
];

interface DrinkCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

export function DrinkCard({ name, description, image, badge }: DrinkCardProps) {
  const [selectedSize, setSelectedSize] = useState(DRINK_SIZES[0]);
  const { addToCart } = useCart();
  const { addToRecent } = useRecentlyViewed();

  const itemId = `${name.toLowerCase().replace(/\s+/g, '-')}-${selectedSize.ml}ml`;

  const handleAddToCart = () => {
    addToCart({
      id: itemId,
      name: `${name} (${selectedSize.ml}ml)`,
      price: selectedSize.price,
      image,
    });
    addToRecent({
      id: itemId,
      name: `${name} (${selectedSize.ml}ml)`,
      price: selectedSize.price,
      image,
    });
    toast({
      title: 'Added to cart!',
      description: `${name} (${selectedSize.ml}ml) - ₹${selectedSize.price}`,
    });
  };

  return (
    <motion.div
      className="card-menu group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {badge && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-serif font-semibold text-lg text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {/* Size Selection */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Select Size:</p>
          <div className="flex items-center gap-2">
            {DRINK_SIZES.map((size) => (
              <button
                key={size.ml}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`flex-1 py-2 text-xs font-medium rounded-lg border-2 transition-all ${
                  selectedSize.ml === size.ml
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                <div className="font-bold">{size.ml}ml</div>
                <div className="text-[10px]">₹{size.price}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="price-tag">₹{selectedSize.price}</span>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
