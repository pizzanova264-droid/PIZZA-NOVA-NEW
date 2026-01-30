import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/pizza-nova-logo.webp';

interface Order {
  id: string;
  items: any[];
  total_amount: number;
  status: string;
  created_at: string;
  addresses?: {
    address_line: string;
    floor_no: string;
    block: string;
    landmark: string;
  };
}

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        addresses (
          address_line,
          floor_no,
          block,
          landmark
        )
      `)
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as any);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gold" />;
      default:
        return <Package className="w-5 h-5 text-primary" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
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
          <h1 className="text-xl font-serif font-bold">Order History</h1>
        </div>
      </div>

      <div className="container-main px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <img src={logo} alt="Pizza Nova" className="h-20 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground mb-6">Start exploring our delicious vegan menu!</p>
            <button onClick={() => navigate('/')} className="btn-hero-primary">
              Explore Menu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card rounded-2xl shadow-soft overflow-hidden">
                {/* Order Header */}
                <div className="bg-secondary p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-semibold capitalize">{order.status}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-primary">₹{order.total_amount}</p>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                {order.addresses && (
                  <div className="border-t border-border p-4">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p>
                        {order.addresses.address_line}
                        {order.addresses.floor_no && `, Floor: ${order.addresses.floor_no}`}
                        {order.addresses.block && `, ${order.addresses.block}`}
                        {order.addresses.landmark && ` (Near ${order.addresses.landmark})`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
