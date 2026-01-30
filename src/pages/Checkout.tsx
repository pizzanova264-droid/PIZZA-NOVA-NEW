import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building, Layers, Navigation, CreditCard, Smartphone, Wallet, Banknote, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/pizza-nova-logo.webp';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [floorNo, setFloorNo] = useState('');
  const [block, setBlock] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
    if (items.length === 0 && !orderSuccess) {
      navigate('/');
    }
  }, [user, items, navigate, orderSuccess]);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast({ title: 'Error', description: 'Please enter your delivery address', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      // Save address
      const { data: addressData, error: addressError } = await supabase
        .from('addresses')
        .insert({
          user_id: user!.id,
          address_line: address,
          floor_no: floorNo,
          block: block,
          landmark: landmark,
          is_default: true
        } as any)
        .select()
        .single();

      if (addressError) throw addressError;

      // Create order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user!.id,
          address_id: addressData.id,
          items: items as any,
          total_amount: totalPrice,
          status: 'confirmed'
        } as any);

      if (orderError) throw orderError;

      clearCart();
      setOrderSuccess(true);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to place order', variant: 'destructive' });
    }

    setLoading(false);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl shadow-elevated p-8 max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <img src={logo} alt="Pizza Nova" className="h-16 mx-auto" />
          <h1 className="text-3xl font-serif font-bold text-foreground">Order Placed Successfully!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for ordering from Pizza Nova! 🍕
          </p>
          <p className="text-sm text-muted-foreground">
            Your delicious vegan meal is being prepared with love and will be delivered soon.
          </p>
          <div className="pt-4 space-y-3">
            <button
              onClick={() => navigate('/orders')}
              className="w-full btn-hero-primary"
            >
              View Order History
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 text-primary font-semibold hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-soft sticky top-0 z-50">
        <div className="container-main px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-serif font-bold">Checkout</h1>
        </div>
      </div>

      <div className="container-main px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Address Form */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Delivery Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your complete address"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Floor No.
                    </label>
                    <div className="relative">
                      <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={floorNo}
                        onChange={(e) => setFloorNo(e.target.value)}
                        placeholder="e.g., 3rd"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Block / Tower
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                        placeholder="e.g., B Block"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nearby Landmark
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g., Near Central Mall"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, color: 'text-accent' },
                  { id: 'upi', name: 'UPI / Google Pay', icon: Smartphone, color: 'text-blue-500' },
                  { id: 'paytm', name: 'Paytm Wallet', icon: Wallet, color: 'text-sky-500' },
                  { id: 'card', name: 'Card Payment', icon: CreditCard, color: 'text-purple-500' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <method.icon className={`w-8 h-8 ${method.color}`} />
                    <span className="text-sm font-medium text-center">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-2xl p-6 shadow-medium sticky top-24">
              <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-accent">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || !address.trim()}
                className="w-full btn-hero-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : `Place Order • ₹${totalPrice}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
