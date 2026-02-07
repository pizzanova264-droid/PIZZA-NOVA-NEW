import { Truck, CreditCard, Clock, Shield } from 'lucide-react';

const paymentMethods = [
  { name: 'PhonePe', icon: '📱' },
  { name: 'Google Pay', icon: '💳' },
  { name: 'Paytm', icon: '💰' },
  { name: 'Cash on Delivery', icon: '💵' },
];

export function DeliverySection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Delivery Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                🚚 Fast & Safe Delivery
              </h2>
              <p className="text-muted-foreground">
                Enjoy your favorite meals delivered hot and fresh to your doorstep. 
                We take extra care with hygienic, eco-friendly packaging.
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Home Delivery Available</h3>
                <p className="text-sm text-muted-foreground">30-45 mins average delivery time</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Methods
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.name}
                    className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-soft"
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium text-foreground">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Features */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                Why Order From Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Quick Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Average delivery time of 30-45 minutes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Safe & Hygienic</h4>
                    <p className="text-sm text-muted-foreground">
                      Contactless delivery with sealed packaging
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Live Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your order in real-time
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 mb-6">
              <p className="text-center text-sm text-foreground">
                <span className="font-semibold">🌱 Eco-Friendly:</span> All our packaging is 100% biodegradable
              </p>
            </div>

            {/* Order via Delivery Partners */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-serif font-bold text-foreground mb-4">
                Order via Delivery Partners
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://www.swiggy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-500/10 rounded-xl border-2 border-orange-200 dark:border-orange-500/30 hover:border-orange-400 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">Swiggy</p>
                    <p className="text-xs text-muted-foreground">Order Now →</p>
                  </div>
                </a>
                <a
                  href="https://www.zomato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border-2 border-red-200 dark:border-red-500/30 hover:border-red-400 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    Z
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-red-600 transition-colors">Zomato</p>
                    <p className="text-xs text-muted-foreground">Order Now →</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}