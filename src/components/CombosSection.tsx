import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';
import comboPizza from '@/assets/menu/combo-pizza.jpg';
import comboBurger from '@/assets/menu/combo-burger.jpg';
import comboWaffle from '@/assets/menu/combo-waffle.jpg';
import comboFamily from '@/assets/menu/combo-family.jpg';

const combos = [
  {
    id: 'combo-pizza',
    name: 'Pizza Combo',
    description: 'Any Pizza + Fries + Soft Drink',
    originalPrice: 478,
    price: 399,
    image: comboPizza,
    savings: 79,
  },
  {
    id: 'combo-burger',
    name: 'Burger Combo',
    description: 'Burger + Fries + Milkshake',
    originalPrice: 477,
    price: 349,
    image: comboBurger,
    savings: 128,
  },
  {
    id: 'combo-dessert',
    name: 'Dessert Combo',
    description: 'Waffle + Ice Cream Scoop',
    originalPrice: 348,
    price: 299,
    image: comboWaffle,
    savings: 49,
  },
  {
    id: 'combo-family',
    name: 'Family Combo',
    description: '2 Large Pizzas + 4 Mocktails',
    originalPrice: 898,
    price: 699,
    image: comboFamily,
    savings: 199,
  },
];

export function CombosSection() {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (combo: typeof combos[0]) => {
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      image: combo.image,
    });
    toast({
      title: '🎉 Added to Cart!',
      description: `${combo.name} - Save ₹${combo.savings}!`,
    });
    setIsCartOpen(true);
  };

  return (
    <section id="combos" className="section-padding bg-background">
      <div className="container-main">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            🎁 Special Combo Offers
          </h2>
          <div className="divider-decorative" />
          <p className="text-muted-foreground">Save more with our value combos!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {combos.map((combo, index) => (
            <div 
              key={combo.id}
              className="card-menu group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={combo.image} 
                  alt={combo.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                  Save ₹{combo.savings}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-semibold text-lg text-foreground">{combo.name}</h3>
                <p className="text-sm text-muted-foreground">{combo.description}</p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="price-tag">₹{combo.price}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{combo.originalPrice}</span>
                </div>
                <button 
                  onClick={() => handleAddToCart(combo)}
                  className="w-full mt-3 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}