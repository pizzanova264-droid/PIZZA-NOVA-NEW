import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/pizza-nova-logo.webp';

interface OrderReceiptProps {
  order: {
    id: string;
    items: any[];
    total_amount: number;
    status: string;
    created_at: string;
    payment_method?: string;
    delivery_partner?: {
      name: string;
      phone: string;
    } | null;
    address?: string;
  };
}

export function OrderReceipt({ order }: OrderReceiptProps) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const downloadReceipt = () => {
    const lines = [
      `🍕 Pizza Nova - Order Receipt`,
      `Order #${order.id.slice(0, 8)}`,
      `Date: ${formatDate(order.created_at)}`,
      ``,
      `Items:`,
      ...order.items.map((i: any) => `• ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`),
      ``,
      `Total: ₹${order.total_amount}`,
      `Payment: ${getPaymentLabel(order.payment_method)}`,
      `Status: ${order.status}`,
    ];
    if (order.address) lines.push(``, `📍 Delivery: ${order.address}`);
    if (order.delivery_partner) {
      lines.push(``, `🛵 Delivery Partner: ${order.delivery_partner.name}`, `📞 ${order.delivery_partner.phone}`);
    }
    lines.push(``, `Thank you for ordering! 🙏`);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PizzaNova_Receipt_${order.id.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Receipt Downloaded', description: 'Check your downloads folder.' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden"
    >
      {/* Receipt Header */}
      <div className="bg-primary/5 p-6 text-center border-b border-dashed border-border">
        <img src={logo} alt="Pizza Nova" className="h-10 mx-auto mb-2" />
        <h3 className="text-lg font-serif font-bold text-foreground">Order Receipt</h3>
        <p className="text-sm text-muted-foreground">#{order.id.slice(0, 8)} • {formatDate(order.created_at)}</p>
      </div>

      {/* Items */}
      <div className="p-4 space-y-2">
        {order.items.map((item: any, i: number) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-foreground">{item.name} × {item.quantity}</span>
            <span className="font-medium text-foreground">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t border-dashed border-border pt-2 mt-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Delivery Fee</span>
            <span className="text-accent font-medium">FREE</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-1">
            <span className="text-foreground">Total</span>
            <span className="text-primary">₹{order.total_amount}</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground pt-1">
          Payment: {getPaymentLabel(order.payment_method)}
        </div>
      </div>

      {/* Simple download action */}
      <div className="border-t border-border p-4">
        <button
          onClick={downloadReceipt}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </button>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Order updates will be sent to your registered email/phone.
        </p>
      </div>
    </motion.div>
  );
}

function getPaymentLabel(method?: string) {
  const labels: Record<string, string> = {
    cod: 'Cash on Delivery',
    upi: 'UPI / Google Pay',
    paytm: 'Paytm Wallet',
    card: 'Card Payment',
  };
  return labels[method || 'cod'] || method || 'Cash on Delivery';
}
