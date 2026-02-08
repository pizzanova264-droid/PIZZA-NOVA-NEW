import { ArrowLeft, FileText, ShieldCheck, CreditCard, Truck, Gift, AlertTriangle, Copyright, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-main max-w-4xl py-12 px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-card rounded-3xl shadow-elevated p-8 md:p-12 space-y-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: February 2026</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              By using Pizza Nova's website and services, you agree to the following terms and conditions.
            </p>
          </div>

          {/* Eligibility */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">1. Eligibility</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be <strong>18 years of age or older</strong> to place an order online.</li>
                <li>Minors may use the service under the supervision of a parent or legal guardian.</li>
                <li>By creating an account, you confirm that the information you provide is accurate and complete.</li>
              </ul>
            </div>
          </section>

          {/* Ordering & Payment */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">2. Ordering & Payment</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Accepted Payment Methods:</strong> UPI, Credit/Debit Cards, Net Banking, Digital Wallets, and Cash on Delivery.</li>
                <li><strong>Order Confirmation:</strong> All orders are confirmed via email/notification. Please verify your order details before payment.</li>
                <li><strong>Cancellations:</strong> Orders can be cancelled within 2 minutes of placement. After that, cancellation may not be possible as preparation begins immediately.</li>
                <li><strong>Refunds:</strong> In case of incorrect or damaged orders, a full refund or replacement will be provided. Refunds are processed within 5–7 business days.</li>
                <li><strong>Price Changes:</strong> Menu prices are subject to change without prior notice. The price at the time of order placement will apply.</li>
              </ul>
            </div>
          </section>

          {/* Delivery & Pickup */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">3. Delivery & Pickup</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Delivery Zones:</strong> Delivery is available within our serviceable areas. Please check availability by entering your address.</li>
                <li><strong>Estimated Time:</strong> Delivery typically takes 30–45 minutes depending on distance and order volume.</li>
                <li><strong>Delivery Partners:</strong> Orders may be delivered through Swiggy, Zomato, or our own delivery fleet.</li>
                <li><strong>Incorrect Orders:</strong> If you receive an incorrect or damaged order, please contact us within 30 minutes for a replacement or refund.</li>
                <li><strong>Liability:</strong> Pizza Nova is not responsible for delays caused by extreme weather, traffic, or circumstances beyond our control.</li>
              </ul>
            </div>
          </section>

          {/* Promotions & Loyalty */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">4. Promotions & Loyalty Programs</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Discount codes and coupons are valid for a limited time and subject to terms mentioned with each offer.</li>
                <li>Coupons cannot be combined with other offers unless explicitly stated.</li>
                <li>Nova Points earned through our loyalty program can be redeemed for discounts on future orders.</li>
                <li>Pizza Nova reserves the right to modify or discontinue loyalty programs at any time.</li>
              </ul>
            </div>
          </section>

          {/* User Conduct */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">5. User Conduct</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Users must not place fraudulent orders or provide false information.</li>
                <li>Abusive behavior towards our staff, delivery partners, or customer support is strictly prohibited.</li>
                <li>Misuse of promotional codes, referral programs, or loyalty rewards may result in account suspension.</li>
                <li>Users must not attempt to interfere with the website's functionality or security.</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Copyright className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">6. Intellectual Property</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>The Pizza Nova brand, logo, images, content, and website design are protected by intellectual property laws.</li>
                <li>Unauthorized use, reproduction, or distribution of our content is strictly prohibited.</li>
                <li>User-generated content (reviews, feedback) may be used by Pizza Nova for promotional purposes with proper attribution.</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">7. Limitation of Liability</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Pizza Nova is not responsible for issues beyond its control, including but not limited to third-party delivery delays, natural disasters, or internet outages.</li>
                <li>Our total liability for any claim related to our services is limited to the amount paid for the specific order in question.</li>
                <li>We strive to maintain accurate menu descriptions and images, but actual products may vary slightly in appearance.</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-muted rounded-2xl p-6 text-center space-y-3">
            <h3 className="font-serif font-semibold text-foreground">Questions about our Terms?</h3>
            <p className="text-muted-foreground">Contact us at <a href="mailto:pizzanova264@gmail.com" className="text-primary hover:underline">pizzanova264@gmail.com</a></p>
            <p className="text-muted-foreground">Phone: <a href="tel:+919876542210" className="text-primary hover:underline">+91 98765 42210</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
