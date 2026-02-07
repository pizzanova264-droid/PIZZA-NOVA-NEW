import { useState } from 'react';
import { Check } from 'lucide-react';

const sizes = [
  { size: '7"', price: 0, label: 'Small' },
  { size: '9"', price: 50, label: 'Medium' },
  { size: '11"', price: 100, label: 'Large' },
  { size: '13"', price: 150, label: 'Extra Large' },
];

const crusts = [
  { name: 'Classic Hand Tossed', price: 0 },
  { name: 'Thin Crust', price: 20 },
  { name: 'Whole Wheat', price: 30 },
  { name: 'Stuffed Crust', price: 50 },
  { name: 'Cheesy Burst (Vegan)', price: 60 },
  { name: 'Gluten-Free', price: 70 },
];

const sauces = [
  { name: 'Classic Marinara', price: 0 },
  { name: 'Pesto', price: 20 },
  { name: 'BBQ', price: 20 },
  { name: 'Spicy Arrabbiata', price: 20 },
  { name: 'White Garlic', price: 25 },
];

const cheeses = [
  { name: 'Vegan Mozzarella', price: 0 },
  { name: 'Almond Cheese', price: 30 },
  { name: 'Cashew Cheese', price: 40 },
];

const toppings = [
  { name: 'Olives', price: 25 },
  { name: 'Jalapeños', price: 25 },
  { name: 'Corn', price: 20 },
  { name: 'Capsicum', price: 20 },
  { name: 'Onion', price: 15 },
  { name: 'Mushroom', price: 30 },
  { name: 'Paneer', price: 40 },
  { name: 'Spinach', price: 25 },
];

const basePrice = 199;

export function PizzaCustomizer() {
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [selectedCrust, setSelectedCrust] = useState(crusts[0]);
  const [selectedSauce, setSelectedSauce] = useState(sauces[0]);
  const [selectedCheese, setSelectedCheese] = useState(cheeses[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const toggleTopping = (toppingName: string) => {
    setSelectedToppings(prev =>
      prev.includes(toppingName)
        ? prev.filter(t => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const toppingsPrice = selectedToppings.reduce((total, name) => {
    const topping = toppings.find(t => t.name === name);
    return total + (topping?.price || 0);
  }, 0);

  const totalPrice = basePrice + selectedSize.price + selectedCrust.price + 
    selectedSauce.price + selectedCheese.price + toppingsPrice;

  return (
    <section id="customize" className="section-padding bg-secondary">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground tracking-tight">
            Create My <span className="text-primary italic">Signature</span>
          </h2>
          <div className="divider-decorative" />
          <p className="text-muted-foreground">
            Build your perfect pizza with our premium ingredients
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Size Selection */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="font-serif font-semibold text-lg mb-4">Select Size</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSize.size === size.size
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl font-bold text-foreground">{size.size}</div>
                    <div className="text-sm text-muted-foreground">{size.label}</div>
                    {size.price > 0 && (
                      <div className="text-xs text-accent mt-1">+₹{size.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Crust Selection */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="font-serif font-semibold text-lg mb-4">Choose Crust</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {crusts.map((crust) => (
                  <button
                    key={crust.name}
                    onClick={() => setSelectedCrust(crust)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedCrust.name === crust.name
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-sm text-foreground">{crust.name}</div>
                    {crust.price > 0 && (
                      <div className="text-xs text-accent mt-1">+₹{crust.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sauce Selection */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="font-serif font-semibold text-lg mb-4">Pick Your Sauce</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sauces.map((sauce) => (
                  <button
                    key={sauce.name}
                    onClick={() => setSelectedSauce(sauce)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedSauce.name === sauce.name
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-sm text-foreground">{sauce.name}</div>
                    {sauce.price > 0 && (
                      <div className="text-xs text-accent mt-1">+₹{sauce.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Cheese Selection */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="font-serif font-semibold text-lg mb-4">Select Cheese</h3>
              <div className="grid grid-cols-3 gap-3">
                {cheeses.map((cheese) => (
                  <button
                    key={cheese.name}
                    onClick={() => setSelectedCheese(cheese)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedCheese.name === cheese.name
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-sm text-foreground">{cheese.name}</div>
                    {cheese.price > 0 && (
                      <div className="text-xs text-accent mt-1">+₹{cheese.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="font-serif font-semibold text-lg mb-4">Add Toppings</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {toppings.map((topping) => (
                  <button
                    key={topping.name}
                    onClick={() => toggleTopping(topping.name)}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-2 ${
                      selectedToppings.includes(topping.name)
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                      selectedToppings.includes(topping.name)
                        ? 'bg-accent border-accent'
                        : 'border-border'
                    }`}>
                      {selectedToppings.includes(topping.name) && (
                        <Check className="w-3 h-3 text-accent-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">{topping.name}</div>
                      <div className="text-xs text-accent">+₹{topping.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-medium sticky top-24">
              <h3 className="font-serif font-semibold text-xl mb-6">Your Custom Pizza</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-medium">₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size ({selectedSize.size})</span>
                  <span className="font-medium">+₹{selectedSize.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{selectedCrust.name}</span>
                  <span className="font-medium">+₹{selectedCrust.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{selectedSauce.name}</span>
                  <span className="font-medium">+₹{selectedSauce.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{selectedCheese.name}</span>
                  <span className="font-medium">+₹{selectedCheese.price}</span>
                </div>
                {selectedToppings.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <div className="text-sm text-muted-foreground mb-2">Toppings:</div>
                    {selectedToppings.map(name => {
                      const topping = toppings.find(t => t.name === name);
                      return (
                        <div key={name} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">• {name}</span>
                          <span className="font-medium">+₹{topping?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                </div>
              </div>

              <button className="w-full btn-hero-primary text-center">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
