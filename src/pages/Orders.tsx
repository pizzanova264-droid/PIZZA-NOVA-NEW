import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { OrderTracking } from '@/components/OrderTracking';
import { DeliveryPartnerCard } from '@/components/DeliveryPartnerCard';
import { OrderReceipt } from '@/components/OrderReceipt';
import logo from '@/assets/pizza-nova-logo.webp';

interface Order {
  id: string;
  items: any[];
  total_amount: number;
  status: string;
  created_at: string;
  payment_method?: string;
  delivery_partner_id?: string;
  addresses?: {
    address_line: string;
    floor_no: string;
    block: string;
    landmark: string;
  };
  delivery_partners?: {
    id: string;
    name: string;
    phone: string;
    vehicle_type: string;
    vehicle_number: string | null;
    rating: number | null;
    photo_url: string | null;
  } | null;
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
        ),
        delivery_partners (
          id,
          name,
          phone,
          vehicle_type,
          vehicle_number,
          rating,
          photo_url
        )
      ` as any)
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
        return <RefreshCw className="w-5 h-5 text-accent animate-spin" />;
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
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
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
                      <img key={index} src={item.image} alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  
                  {/* Delivery partner mini info */}
                  {order.delivery_partners && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {order.delivery_partners.name.charAt(0)}
                        </span>
                      </div>
                      <span>{order.delivery_partners.name}</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(order.created_at)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Order Details */}
            <div className="lg:sticky lg:top-24 h-fit space-y-6">
              {selectedOrder ? (
                <>
                  <OrderTracking
                    orderId={selectedOrder.id}
                    status={selectedOrder.status}
                    address={getFullAddress(selectedOrder.addresses)}
                  />
                  
                  {/* Delivery Partner */}
                  {selectedOrder.delivery_partners && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Delivery Partner</p>
                      <DeliveryPartnerCard partner={selectedOrder.delivery_partners} />
                    </div>
                  )}

                  {/* Receipt */}
                  <OrderReceipt
                    order={{
                      id: selectedOrder.id,
                      items: selectedOrder.items,
                      total_amount: selectedOrder.total_amount,
                      status: selectedOrder.status,
                      created_at: selectedOrder.created_at,
                      payment_method: selectedOrder.payment_method,
                      delivery_partner: selectedOrder.delivery_partners ? {
                        name: selectedOrder.delivery_partners.name,
                        phone: selectedOrder.delivery_partners.phone,
                      } : null,
                      address: getFullAddress(selectedOrder.addresses),
                    }}
                    userEmail={user?.email || undefined}
                    userPhone={user?.phone || undefined}
                  />
                </>
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
