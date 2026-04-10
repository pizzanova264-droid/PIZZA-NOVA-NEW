import { useState } from 'react';
import { ChefHat, Truck, Home, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: any;
}

const STATUS_FLOW = [
  { id: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'text-blue-500 bg-blue-500/10' },
  { id: 'preparing', label: 'Preparing', icon: ChefHat, color: 'text-yellow-500 bg-yellow-500/10' },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'text-orange-500 bg-orange-500/10' },
  { id: 'delivered', label: 'Delivered', icon: Home, color: 'text-green-500 bg-green-500/10' },
];

interface AdminOrderManagerProps {
  orders: Order[];
  onStatusUpdated: () => void;
}

export function AdminOrderManager({ orders, onStatusUpdated }: AdminOrderManagerProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getNextStatus = (current: string) => {
    const idx = STATUS_FLOW.findIndex(s => s.id === current);
    if (idx < STATUS_FLOW.length - 1) return STATUS_FLOW[idx + 1];
    return null;
  };

  const getCurrentStatusInfo = (status: string) => {
    return STATUS_FLOW.find(s => s.id === status) || { id: status, label: status, icon: Clock, color: 'text-muted-foreground bg-muted' };
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus } as any)
      .eq('id', orderId);

    if (error) {
      toast({ title: 'Error', description: 'Failed to update order status', variant: 'destructive' });
    } else {
      toast({ title: 'Status Updated', description: `Order moved to "${STATUS_FLOW.find(s => s.id === newStatus)?.label}"` });
      onStatusUpdated();
    }
    setUpdatingId(null);
  };

  const setSpecificStatus = async (orderId: string, newStatus: string) => {
    await updateStatus(orderId, newStatus);
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Items</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => {
              const statusInfo = getCurrentStatusInfo(order.status);
              const nextStatus = getNextStatus(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-sm text-foreground">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    ₹{Number(order.total_amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {Array.isArray(order.items) ? order.items.length : 0} items
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {nextStatus ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateStatus(order.id, nextStatus.id)}
                          disabled={updatingId === order.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
                        >
                          {updatingId === order.id ? 'Updating...' : `→ ${nextStatus.label}`}
                        </button>
                        <div className="relative group">
                          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-elevated z-10 hidden group-hover:block">
                            {STATUS_FLOW.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => setSpecificStatus(order.id, s.id)}
                                disabled={s.id === order.status}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl disabled:opacity-30"
                              >
                                <s.icon className="w-4 h-4" />
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-green-500 font-medium">✓ Complete</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
