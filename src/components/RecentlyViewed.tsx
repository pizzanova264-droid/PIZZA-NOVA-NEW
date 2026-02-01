import { motion } from 'framer-motion';
import { Clock, Plus } from 'lucide-react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

export function RecentlyViewed() {
  const { recentItems } = useRecentlyViewed();
  const { addToCart } = useCart();

  if (recentItems.length === 0) return null;

  const handleAddToCart = (item: typeof recentItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast({
      title: 'Added to cart!',
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container-main px-4">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-serif font-bold">Recently Viewed</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {recentItems.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-40 bg-card rounded-xl shadow-soft overflow-hidden group"
            >
              <div className="relative h-24 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-medium"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium truncate">{item.name}</h3>
                <p className="text-xs text-gold font-semibold">₹{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
