import { Tag, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const coupons = [
  {
    code: 'NEWYEAR2026',
    description: 'Flat 20% Off on all orders',
    discount: '20% OFF',
    color: 'bg-primary',
  },
  {
    code: 'SUNDAYFEAST',
    description: 'Buy 1 Get 1 Free on Pizzas',
    discount: 'BOGO',
    color: 'bg-accent',
  },
  {
    code: 'BIRTHDAYJOY',
    description: 'Free Dessert on orders above ₹500',
    discount: 'FREE DESSERT',
    color: 'bg-gold',
  },
  {
    code: 'FIRSTBITE',
    description: '₹150 Off on your First Order',
    discount: '₹150 OFF',
    color: 'bg-terracotta',
  },
];

export function CouponsSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="section-padding bg-secondary">
      <div className="container-main">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            🎟️ Exclusive Coupons
          </h2>
          <div className="divider-decorative" />
          <p className="text-muted-foreground">Use these codes at checkout for amazing discounts!</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.map((coupon) => (
            <div 
              key={coupon.code}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all"
            >
              <div className={`${coupon.color} p-4 text-center`}>
                <span className="text-xl font-bold text-white">{coupon.discount}</span>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">{coupon.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted px-3 py-2 rounded-lg border-2 border-dashed border-border">
                    <code className="font-mono font-bold text-foreground">{coupon.code}</code>
                  </div>
                  <button
                    onClick={() => copyCode(coupon.code)}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-5 h-5 text-accent" />
                    ) : (
                      <Copy className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
