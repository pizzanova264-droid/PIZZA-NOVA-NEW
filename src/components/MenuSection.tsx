import { useState } from 'react';
import { MenuCard } from './MenuCard';

// Pizza imports
import pizzaMargherita from '@/assets/menu/pizza-margherita.jpg';
import pizzaFarmFresh from '@/assets/menu/pizza-farm-fresh.jpg';
import pizzaPaneerTikka from '@/assets/menu/pizza-paneer-tikka.jpg';
import pizzaVeganSupreme from '@/assets/menu/pizza-vegan-supreme.jpg';
import pizzaTruffleMushroom from '@/assets/menu/pizza-truffle-mushroom.jpg';

// Sandwich imports
import sandwichGrilledVeg from '@/assets/menu/sandwich-grilled-veg.jpg';
import sandwichPaneerPesto from '@/assets/menu/sandwich-paneer-pesto.jpg';
import sandwichVeganClub from '@/assets/menu/sandwich-vegan-club.jpg';
import sandwichCheeseCorn from '@/assets/menu/sandwich-cheese-corn.jpg';
import sandwichMexican from '@/assets/menu/sandwich-mexican.jpg';
import sandwichCaprese from '@/assets/menu/sandwich-caprese.jpg';

// Burger imports
import burgerSupreme from '@/assets/menu/burger-supreme.jpg';
import burgerVeganCheese from '@/assets/menu/burger-vegan-cheese.jpg';

// Fries & Snacks imports
import friesClassic from '@/assets/menu/fries-classic.jpg';
import friesPeriPeri from '@/assets/menu/fries-peri-peri.jpg';
import churros from '@/assets/menu/churros.jpg';

// Nachos imports
import nachosCheese from '@/assets/menu/nachos-cheese.jpg';
import nachosSalsa from '@/assets/menu/nachos-salsa.jpg';
import nachosLoaded from '@/assets/menu/nachos-loaded.jpg';

// Pasta imports
import pastaAlfredo from '@/assets/menu/pasta-alfredo.jpg';
import pastaArrabbiata from '@/assets/menu/pasta-arrabbiata.jpg';
import noodlesHakka from '@/assets/menu/noodles-hakka.jpg';
import noodlesThai from '@/assets/menu/noodles-thai.jpg';
import lasagna from '@/assets/menu/lasagna.jpg';

// Waffle imports
import waffleChocolate from '@/assets/menu/waffle-chocolate.jpg';
import waffleStrawberry from '@/assets/menu/waffle-strawberry.jpg';
import waffleNutella from '@/assets/menu/waffle-nutella.jpg';
import waffleOreo from '@/assets/menu/waffle-oreo.jpg';
import waffleMaple from '@/assets/menu/waffle-maple.jpg';
import waffleBlueberry from '@/assets/menu/waffle-blueberry.jpg';
import waffleCaramel from '@/assets/menu/waffle-caramel.jpg';
import waffleRedVelvet from '@/assets/menu/waffle-red-velvet.jpg';

// Brownie jar imports
import brownieStrawberry from '@/assets/menu/brownie-strawberry.jpg';
import brownieMolten from '@/assets/menu/brownie-molten.jpg';
import brownieBananaNutella from '@/assets/menu/brownie-banana-nutella.jpg';
import brownieTriple from '@/assets/menu/brownie-triple.jpg';

// Dessert imports
import brownie from '@/assets/menu/brownie.jpg';
import lavaCake from '@/assets/menu/lava-cake.jpg';
import pastryChocolate from '@/assets/menu/pastry-chocolate.jpg';
import pastryRedVelvet from '@/assets/menu/pastry-red-velvet.jpg';
import cheesecake from '@/assets/menu/cheesecake.jpg';

// Ice cream imports
import iceCream from '@/assets/menu/ice-cream.jpg';
import sundaeChocolate from '@/assets/menu/sundae-chocolate.jpg';
import sundaeBrownie from '@/assets/menu/sundae-brownie.jpg';
import sundaeBerry from '@/assets/menu/sundae-berry.jpg';

// Shake imports
import shakeChocolate from '@/assets/menu/shake-chocolate.jpg';
import shakeStrawberry from '@/assets/menu/shake-strawberry.jpg';
import shakeOreo from '@/assets/menu/shake-oreo.jpg';
import shakeMango from '@/assets/menu/shake-mango.jpg';

// Mocktail imports
import mocktailMojito from '@/assets/menu/mocktail-mojito.jpg';
import mocktailBlueLagoon from '@/assets/menu/mocktail-blue-lagoon.jpg';
import mocktailWatermelon from '@/assets/menu/mocktail-watermelon.jpg';
import mocktailStrawberry from '@/assets/menu/mocktail-strawberry.jpg';
import mocktailGreenApple from '@/assets/menu/mocktail-green-apple.jpg';
import mocktailCitrus from '@/assets/menu/mocktail-citrus.jpg';

// Coffee imports
import espresso from '@/assets/menu/espresso.jpg';
import coffeLatte from '@/assets/coffee-latte.png';
import croissant from '@/assets/menu/croissant.jpg';

// Frankie imports
import frankieVeg from '@/assets/menu/frankie-veg.jpg';
import frankiePaneer from '@/assets/menu/frankie-paneer.jpg';
import frankieCheese from '@/assets/menu/frankie-cheese.jpg';
import frankieSchezwan from '@/assets/menu/frankie-schezwan.jpg';


// Drink imports
import drinkCola from '@/assets/menu/drink-cola.jpg';
import drinkPepsi from '@/assets/menu/drink-pepsi.jpg';
import drinkDew from '@/assets/menu/drink-dew.jpg';

const categories = [
  { id: 'pizzas', name: '🍕 Pizzas', emoji: '🍕' },
  { id: 'sandwiches', name: '🥪 Sandwiches', emoji: '🥪' },
  { id: 'burgers', name: '🍔 Burgers', emoji: '🍔' },
  { id: 'frankies', name: '🌯 Frankies', emoji: '🌯' },
  { id: 'fries', name: '🍟 Fries & Snacks', emoji: '🍟' },
  { id: 'nachos', name: '🧀 Nachos', emoji: '🧀' },
  { id: 'pasta', name: '🍝 Pasta & Noodles', emoji: '🍝' },
  { id: 'waffles', name: '🧇 Waffles', emoji: '🧇' },
  { id: 'brownies', name: '🍫 Brownie Jars', emoji: '🍫' },
  { id: 'desserts', name: '🍰 Desserts', emoji: '🍰' },
  { id: 'icecream', name: '🍨 Ice Cream', emoji: '🍨' },
  { id: 'shakes', name: '🥤 Milkshakes', emoji: '🥤' },
  { id: 'mocktails', name: '🍹 Mocktails', emoji: '🍹' },
  { id: 'drinks', name: '🥤 Soft Drinks', emoji: '🥤' },
  { id: 'coffee', name: '☕ Coffee & Bakery', emoji: '☕' },
];

const menuItems: Record<string, Array<{ name: string; description: string; price: number; image: string; badge?: string }>> = {
  pizzas: [
    { name: 'Classic Margherita', description: 'Timeless perfection with fresh tomato sauce, vegan mozzarella, and aromatic basil leaves on a golden crust', price: 249, image: pizzaMargherita },
    { name: 'Farm Fresh Veggie', description: 'Garden-fresh vegetables including bell peppers, olives, tomatoes, and onions with melted vegan cheese', price: 299, image: pizzaFarmFresh },
    { name: 'Spicy Paneer Tikka', description: 'Marinated paneer cubes with colorful peppers, onions, and cilantro in a zesty tikka sauce', price: 329, image: pizzaPaneerTikka, badge: 'Bestseller' },
    { name: 'Vegan Supreme', description: 'Loaded with plant-based toppings, olives, artichokes, spinach, and sundried tomatoes', price: 349, image: pizzaVeganSupreme },
    { name: 'Truffle Arugula Delight', description: 'Gourmet pizza with truffle oil drizzle, arugula, olives, and vegan parmesan', price: 379, image: pizzaTruffleMushroom, badge: 'Premium' },
  ],
  sandwiches: [
    { name: 'Grilled Veg Delight', description: 'Layers of grilled zucchini, eggplant, and peppers with melted cheese on artisan bread', price: 179, image: sandwichGrilledVeg },
    { name: 'Paneer & Pesto', description: 'Grilled paneer with fresh basil pesto, sun-dried tomatoes, and arugula on ciabatta', price: 199, image: sandwichPaneerPesto, badge: 'Popular' },
    { name: 'Vegan Club Sandwich', description: 'Triple-decker with plant-based proteins, fresh lettuce, tomato, and vegan mayo', price: 219, image: sandwichVeganClub },
    { name: 'Cheese & Corn Melt', description: 'Gooey melted vegan cheese with sweet corn kernels on perfectly toasted bread', price: 189, image: sandwichCheeseCorn },
    { name: 'Spicy Mexican Veg', description: 'Jalapeños, black beans, corn salsa, and avocado with melted cheese', price: 209, image: sandwichMexican },
    { name: 'Caprese Sandwich', description: 'Fresh mozzarella, tomato, basil leaves on artisan bread with pesto drizzle', price: 229, image: sandwichCaprese, badge: 'New' },
  ],
  burgers: [
    { name: 'Veg Supreme Burger', description: 'Thick plant-based patty with melted cheese, fresh lettuce, tomato, and special sauce', price: 199, image: burgerSupreme },
    { name: 'Vegan Cheese Burger', description: 'Golden toasted bun with melted vegan cheddar and fresh vegetables', price: 229, image: burgerVeganCheese },
  ],
  fries: [
    { name: 'French Fries', description: 'Golden crispy fries perfectly salted, served with ketchup', price: 129, image: friesClassic },
    { name: 'Peri-Peri Fries', description: 'Spiced with peri-peri seasoning and served with lime wedge', price: 149, image: friesPeriPeri, badge: 'Spicy' },
    { name: 'Churros with Chocolate Dip', description: 'Cinnamon sugar coated churros with rich chocolate dipping sauce', price: 169, image: churros },
  ],
  nachos: [
    { name: 'Classic Cheese Nachos', description: 'Golden tortilla chips topped with melted nacho cheese and jalapeños', price: 199, image: nachosCheese },
    { name: 'Salsa Nachos', description: 'Fresh tomato salsa with colorful chips, cilantro, and sour cream', price: 219, image: nachosSalsa },
    { name: 'Loaded Vegan Nachos', description: 'Black beans, guacamole, vegan sour cream, corn, and tomatoes', price: 249, image: nachosLoaded, badge: 'Loaded' },
  ],
  pasta: [
    { name: 'Alfredo White Sauce Pasta', description: 'Creamy white sauce fettuccine with parmesan and fresh basil', price: 269, image: pastaAlfredo },
    { name: 'Arrabbiata Red Sauce Pasta', description: 'Spicy red tomato sauce penne with chili flakes and parmesan', price: 259, image: pastaArrabbiata },
    { name: 'Veg Hakka Noodles', description: 'Stir-fried with colorful vegetables, bean sprouts, and soy sauce', price: 229, image: noodlesHakka },
    { name: 'Thai Style Noodles', description: 'Rice noodles with peanut sauce, vegetables, and crushed peanuts', price: 249, image: noodlesThai },
    { name: 'Veg Lasagna', description: 'Layers of pasta, marinara, ricotta, spinach, and melted cheese', price: 299, image: lasagna, badge: 'Chef\'s Special' },
  ],
  waffles: [
    { name: 'Belgian Chocolate', description: 'Crispy waffle with chocolate sauce drizzle, whipped cream, and chocolate chips', price: 199, image: waffleChocolate },
    { name: 'Strawberry Cream', description: 'Fresh strawberries, whipped cream swirls, and strawberry sauce', price: 219, image: waffleStrawberry },
    { name: 'Nutella Bliss', description: 'Generous Nutella spread with chopped hazelnuts and banana slices', price: 249, image: waffleNutella, badge: 'Indulgent' },
    { name: 'Oreo Crunch', description: 'Crushed Oreo cookies, chocolate sauce, and vanilla ice cream', price: 239, image: waffleOreo },
    { name: 'Maple Butter Classic', description: 'Golden butter pat with pure maple syrup and fresh berries', price: 189, image: waffleMaple },
    { name: 'Blueberry Delight', description: 'Fresh blueberries, whipped cream, and tangy blueberry sauce drizzle', price: 229, image: waffleBlueberry },
    { name: 'Caramel Cinnamon', description: 'Warm caramel sauce, cinnamon sugar, and butter pat topping', price: 209, image: waffleCaramel, badge: 'New' },
    { name: 'Red Velvet Dream', description: 'Rich red velvet waffle with cream cheese glaze and raspberry', price: 259, image: waffleRedVelvet, badge: 'Premium' },
  ],
  brownies: [
    { name: 'Strawberry Brownie Choco Jar', description: 'Rich brownie layered with fresh strawberries, finished with warm melted chocolate', price: 189, image: brownieStrawberry, badge: 'Bestseller' },
    { name: 'Molten Chocolate Brownie', description: 'Warm, gooey chocolate brownie served with rich chocolate sauce', price: 169, image: brownieMolten, badge: 'Premium' },
    { name: 'Banana Nutella Brownie Jar', description: 'Soft brownie layered with banana and Nutella drizzle', price: 179, image: brownieBananaNutella, badge: 'Popular' },
    { name: 'Triple Chocolate Brownie Jar', description: 'Brownie with dark, milk & white chocolate layers', price: 199, image: brownieTriple, badge: 'Indulgent' },
  ],
  desserts: [
    { name: 'Brownie', description: 'Fudgy chocolate brownie with vanilla ice cream and chocolate sauce', price: 149, image: brownie },
    { name: 'Lava Cake', description: 'Warm molten chocolate center with powdered sugar and raspberry', price: 179, image: lavaCake, badge: 'Warm' },
    { name: 'Chocolate Pastry', description: 'Layered chocolate ganache with chocolate shavings', price: 159, image: pastryChocolate },
    { name: 'Red Velvet Pastry', description: 'Deep red cake layers with white cream cheese frosting', price: 169, image: pastryRedVelvet },
    { name: 'Vegan Cheesecake', description: 'Creamy cashew base with berry compote topping', price: 199, image: cheesecake },
  ],
  icecream: [
    { name: 'Classic Trio Scoop', description: 'Vanilla, chocolate, and strawberry scoops with wafer and cherry', price: 99, image: iceCream },
    { name: 'Chocolate Sundae', description: 'Rich chocolate ice cream with hot fudge, whipped cream, and sprinkles', price: 149, image: sundaeChocolate },
    { name: 'Brownie Sundae', description: 'Warm brownie base with vanilla ice cream and chocolate sauce', price: 179, image: sundaeBrownie, badge: 'Popular' },
    { name: 'Double Berry Sundae', description: 'Rich ice cream scoops layered with seasonal berries and a crisp wafer', price: 229, image: sundaeBerry },
  ],
  shakes: [
    { name: 'Chocolate Shake', description: 'Thick creamy chocolate milkshake with whipped cream and chocolate drizzle', price: 149, image: shakeChocolate },
    { name: 'Strawberry Shake', description: 'Pink creamy texture with fresh strawberry garnish', price: 149, image: shakeStrawberry },
    { name: 'Oreo Shake', description: 'Cookies and cream with crushed Oreos and chocolate drizzle', price: 169, image: shakeOreo, badge: 'Bestseller' },
    { name: 'Mango Shake', description: 'Vibrant mango flavor with whipped cream and mango slice', price: 159, image: shakeMango },
  ],
  mocktails: [
    { name: 'Virgin Mojito', description: 'Fresh mint leaves, lime wedges, and sparkling water', price: 129, image: mocktailMojito },
    { name: 'Blue Lagoon', description: 'Vibrant blue color with lemon slice and cherry garnish', price: 139, image: mocktailBlueLagoon },
    { name: 'Watermelon Mint', description: 'Refreshing watermelon with mint leaves and ice', price: 129, image: mocktailWatermelon },
    { name: 'Strawberry Fizz', description: 'Pink sparkling drink with fresh strawberries', price: 139, image: mocktailStrawberry },
    { name: 'Green Apple Sparkle', description: 'Light green sparkling drink with apple slice', price: 149, image: mocktailGreenApple },
    { name: 'Citrus Punch', description: 'Orange and lemon slices with sparkling citrus', price: 139, image: mocktailCitrus },
  ],
  coffee: [
    { name: 'Espresso', description: 'Rich espresso shot with perfect crema', price: 99, image: espresso },
    { name: 'Latte', description: 'Smooth espresso with steamed milk and whipped cream', price: 129, image: coffeLatte },
    { name: 'Croissant', description: 'Buttery golden flaky layers, fresh from the oven', price: 99, image: croissant },
  ],
  frankies: [
    { name: 'Veg Frankie', description: 'Classic vegetable filling wrapped in soft roti with green chutney', price: 99, image: frankieVeg },
    { name: 'Paneer Frankie', description: 'Spiced paneer cubes with onions, peppers, and mint chutney', price: 129, image: frankiePaneer, badge: 'Popular' },
    { name: 'Cheese Frankie', description: 'Melted cheese with veggies wrapped in crispy paratha', price: 119, image: frankieCheese },
    { name: 'Schezwan Frankie', description: 'Indo-Chinese spicy schezwan sauce with crispy veggies', price: 129, image: frankieSchezwan, badge: 'Spicy' },
  ],
  drinks: [
    { name: 'Coca Cola', description: 'Chilled classic cola (300ml)', price: 49, image: drinkCola },
    { name: 'Pepsi', description: 'Refreshing Pepsi (300ml)', price: 49, image: drinkPepsi },
    { name: 'Mountain Dew', description: 'Citrus blast energy drink (300ml)', price: 49, image: drinkDew },
  ],
};

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('pizzas');

  return (
    <section id="menu" className="section-padding bg-background">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            🔍 Find My Craving
          </h2>
          <div className="divider-decorative" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            100% Vegan & Vegetarian • All prices in INR (₹)
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-medium'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems[activeCategory]?.map((item, index) => (
            <div key={item.name} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-up">
              <MenuCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
