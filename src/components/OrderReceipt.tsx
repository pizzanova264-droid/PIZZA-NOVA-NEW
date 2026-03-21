import { Share2, Download, MessageCircle, Mail, Phone } from 'lucide-react';
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
  userEmail?: string;
  userPhone?: string;
}

export function OrderReceipt({ order, userEmail, userPhone }: OrderReceiptProps) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const receiptText = () => {
    const lines = [
      `🍕 *Pizza Nova - Order Receipt*`,
      `Order #${order.id.slice(0, 8)}`,
      `Date: ${formatDate(order.created_at)}`,
      ``,
      `*Items:*`,
      ...order.items.map((i: any) => `• ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`),
      ``,
      `*Total: ₹${order.total_amount}*`,
      `Payment: ${getPaymentLabel(order.payment_method)}`,
      `Status: ${order.status}`,
    ];
    if (order.address) lines.push(``, `📍 Delivery: ${order.address}`);
    if (order.delivery_partner) {
      lines.push(``, `🛵 Delivery Partner: ${order.delivery_partner.name}`, `📞 ${order.delivery_partner.phone}`);
    }
    lines.push(``, `Thank you for ordering! 🙏`);
    return lines.join('\n');
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(receiptText());
    const phone = userPhone?.replace(/\s/g, '').replace('+', '');
    const url = phone
      ? `https://wa.me/${phone}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  const shareSMS = () => {
    const text = encodeURIComponent(receiptText().replace(/\*/g, ''));
    window.open(`sms:${userPhone || ''}?body=${text}`, '_self');
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(`Pizza Nova - Order Receipt #${order.id.slice(0, 8)}`);
    const body = encodeURIComponent(receiptText().replace(/\*/g, ''));
    window.open(`mailto:${userEmail || ''}?subject=${subject}&body=${body}`, '_self');
  };

  const downloadReceipt = () => {
    const text = receiptText().replace(/\*/g, '');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PizzaNova_Receipt_${order.id.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Receipt Downloaded', description: 'Check your downloads folder.' });
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pizza Nova Receipt #${order.id.slice(0, 8)}`,
          text: receiptText().replace(/\*/g, ''),
        });
      } catch {}
    }
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

      {/* Share Actions */}
      <div className="border-t border-border p-4">
        <p className="text-sm font-medium text-foreground mb-3">Share Receipt</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500/10 text-green-600 font-medium text-sm hover:bg-green-500/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={shareSMS}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 text-blue-500 font-medium text-sm hover:bg-blue-500/20 transition-colors"
          >
            <Phone className="w-4 h-4" />
            SMS
          </button>
          <button
            onClick={shareEmail}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-500/10 text-purple-500 font-medium text-sm hover:bg-purple-500/20 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
          <button
            onClick={downloadReceipt}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={nativeShare}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            More Sharing Options
          </button>
        )}
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
