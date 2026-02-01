import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, MapPin, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { OrderTracking } from '@/components/OrderTracking';
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
      
      // Set up realtime subscription for order updates
      const channel = supabase
        .channel('order-updates')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setOrders(prev => prev.map(o => 
              o.id === payload.new.id ? { ...o, ...payload.new } : o
            ));
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
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
      if (data.length > 0 && !selectedOrder) {
        setSelectedOrder(data[0] as any);
      }
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'preparing':
        return <RefreshCw className="w-5 h-5 text-gold animate-spin" />;
      case 'ready':
        return <Package className="w-5 h-5 text-primary" />;
      case 'out_for_delivery':
        return <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>
          <Package className="w-5 h-5 text-primary" />
        </motion.div>;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: 'Order Confirmed',
      preparing: 'Being Prepared',
      ready: 'Ready for Pickup',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
    };
    return labels[status] || status;
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

  const getFullAddress = (addresses: Order['addresses']) => {
    if (!addresses) return '';
    return [
      addresses.address_line,
      addresses.floor_no && `Floor: ${addresses.floor_no}`,
      addresses.block,
      addresses.landmark && `Near ${addresses.landmark}`,
    ].filter(Boolean).join(', ');
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
          <h1 className="text-xl font-serif font-bold">My Orders</h1>
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
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order List */}
            <div className="space-y-4">
              <h2 className="text-lg font-serif font-semibold mb-4">Order History</h2>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-card rounded-xl shadow-soft p-4 cursor-pointer transition-all hover:shadow-medium ${
                    selectedOrder?.id === order.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="font-medium text-sm">{getStatusLabel(order.status)}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">₹{order.total_amount}</span>
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {order.items.slice(0, 3).map((item: any, index: number) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(order.created_at)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Order Tracking */}
            <div className="lg:sticky lg:top-24 h-fit">
              {selectedOrder ? (
                <div className="space-y-6">
                  <OrderTracking
                    orderId={selectedOrder.id}
                    status={selectedOrder.status}
                    address={getFullAddress(selectedOrder.addresses)}
                  />
                  
                  {/* Order Items */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h3 className="text-lg font-serif font-bold mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-border mt-4 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">₹{selectedOrder.total_amount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
