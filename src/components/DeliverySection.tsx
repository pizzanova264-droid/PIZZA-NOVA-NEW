import { Truck, CreditCard, Wallet } from 'lucide-react';
import packagingImage from '@/assets/packaging.jpg';

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
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent" />
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

          {/* Packaging Image */}
          <div className="relative">
            <img 
              src={packagingImage}
              alt="Pizza Nova Eco-Friendly Packaging"
              className="w-full rounded-2xl shadow-elevated"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold text-foreground mb-1">Eco-Friendly Packaging</h3>
              <p className="text-sm text-muted-foreground">
                Sustainable, branded boxes that keep your food fresh
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
