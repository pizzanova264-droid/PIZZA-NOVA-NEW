import { useCart } from '@/hooks/useCart';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

export function MenuCard({ name, description, price, image, badge }: MenuCardProps) {
  const { addToCart } = useCart();
  const { addToRecent } = useRecentlyViewed();

  const itemId = name.toLowerCase().replace(/\s+/g, '-');

  const handleAddToCart = () => {
    addToCart({
      id: itemId,
      name,
      price,
      image,
    });
    
    // Track in recently viewed
    addToRecent({
      id: itemId,
      name,
      price,
      image,
    });
    
    toast({
      title: 'Added to cart!',
      description: `${name} has been added to your cart.`,
    });
  };

  const handleCardClick = () => {
    // Track view
    addToRecent({
      id: itemId,
      name,
      price,
      image,
    });
  };

  return (
    <motion.div 
      className="card-menu group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
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
      <div className="p-4 space-y-2">
        <h3 className="font-serif font-semibold text-lg text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="price-tag">₹{price}</span>
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
