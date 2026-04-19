import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
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

let cachedLogoPng: string | null = null;
const loadLogoAsPng = (): Promise<string | null> =>
  new Promise((resolve) => {
    if (cachedLogoPng) return resolve(cachedLogoPng);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        cachedLogoPng = canvas.toDataURL('image/png');
        resolve(cachedLogoPng);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = logo;
  });

export function OrderReceipt({ order }: OrderReceiptProps) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const downloadReceipt = async () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    let y = 50;

    // Brand header band
    doc.setFillColor(211, 47, 47); // brand red
    doc.rect(0, 0, pageW, 90, 'F');

    // Embed logo to the left of the title
    const logoData = await loadLogoAsPng();
    if (logoData) {
      try {
        doc.addImage(logoData, 'PNG', pageW / 2 - 115, 20, 50, 50);
      } catch {
        // fall back to text-only header
      }
    }

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('PIZZA NOVA', pageW / 2 - 55, 48);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Crafted with Love • 100% Vegetarian', pageW / 2 - 55, 65);

    y = 120;
    doc.setTextColor(51, 51, 51);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Order Receipt', 40, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    y += 18;
    doc.text(`Order ID: #${order.id.slice(0, 8).toUpperCase()}`, 40, y);
    y += 14;
    doc.text(`Date: ${formatDate(order.created_at)}`, 40, y);
    y += 14;
    doc.text(`Status: ${order.status.replace(/_/g, ' ').toUpperCase()}`, 40, y);

    // Items table header
    y += 28;
    doc.setDrawColor(220, 220, 220);
    doc.line(40, y, pageW - 40, y);
    y += 16;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(11);
    doc.text('Item', 40, y);
    doc.text('Qty', pageW - 180, y, { align: 'right' });
    doc.text('Price', pageW - 110, y, { align: 'right' });
    doc.text('Total', pageW - 40, y, { align: 'right' });
    y += 8;
    doc.line(40, y, pageW - 40, y);
    y += 16;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    order.items.forEach((i: any) => {
      if (y > 720) { doc.addPage(); y = 50; }
      const name = String(i.name).length > 40 ? String(i.name).slice(0, 38) + '…' : i.name;
      doc.text(name, 40, y);
      doc.text(String(i.quantity), pageW - 180, y, { align: 'right' });
      doc.text(`Rs. ${i.price}`, pageW - 110, y, { align: 'right' });
      doc.text(`Rs. ${i.price * i.quantity}`, pageW - 40, y, { align: 'right' });
      y += 16;
    });

    // Totals
    y += 8;
    doc.line(40, y, pageW - 40, y);
    y += 18;
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('Delivery Fee', 40, y);
    doc.setTextColor(247, 156, 66);
    doc.text('FREE', pageW - 40, y, { align: 'right' });
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(211, 47, 47);
    doc.text('Total', 40, y);
    doc.text(`Rs. ${order.total_amount}`, pageW - 40, y, { align: 'right' });

    // Payment & delivery
    y += 30;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 51, 51);
    doc.text(`Payment Method: ${getPaymentLabel(order.payment_method)}`, 40, y);

    if (order.address) {
      y += 18;
      const addressLines = doc.splitTextToSize(`Delivery Address: ${order.address}`, pageW - 80);
      doc.text(addressLines, 40, y);
      y += addressLines.length * 14;
    }
    if (order.delivery_partner) {
      y += 6;
      doc.text(`Delivery Partner: ${order.delivery_partner.name}`, 40, y);
      y += 14;
      doc.text(`Contact: ${order.delivery_partner.phone}`, 40, y);
    }

    // Footer
    doc.setDrawColor(220, 220, 220);
    doc.line(40, 780, pageW - 40, 780);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('Thank you for ordering from Pizza Nova!', pageW / 2, 800, { align: 'center' });
    doc.text('For support, contact us through the app.', pageW / 2, 814, { align: 'center' });

    doc.save(`PizzaNova_Receipt_${order.id.slice(0, 8)}.pdf`);
    toast({ title: 'Receipt Downloaded', description: 'Your PDF receipt is ready.' });
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
