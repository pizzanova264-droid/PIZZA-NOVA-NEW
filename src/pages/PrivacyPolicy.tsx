import { ArrowLeft, Shield, Lock, Eye, Bell, UserCheck, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: February 2026</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Pizza Nova, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Information Collection */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">1. Information Collection</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <p>We collect the following information when you use our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address when you create an account or place an order.</li>
                <li><strong>Payment Information:</strong> Payment details are processed securely through our payment gateway partners. We do not store your full card details on our servers.</li>
                <li><strong>Usage Data:</strong> We use cookies and similar technologies for analytics, personalization, and improving your browsing experience.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers for optimizing our website performance.</li>
              </ul>
            </div>
          </section>

          {/* Use of Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">2. Use of Information</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <p>Your information is used for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing and fulfilling your food orders accurately and promptly.</li>
                <li>Providing customer support and responding to your inquiries.</li>
                <li>Sending promotional offers, loyalty program updates, and relevant notifications (with your consent).</li>
                <li>Analytics to improve our menu offerings, website experience, and delivery efficiency.</li>
                <li>Personalizing your experience with relevant food recommendations.</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">3. Data Sharing</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Third-Party Services:</strong> We share necessary information with payment gateways (for secure transactions), delivery partners like Swiggy and Zomato (for order fulfillment), and marketing tools (for personalized communication).</li>
                <li><strong>We do NOT sell your personal data</strong> to any third parties for their marketing purposes.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect the rights and safety of Pizza Nova and its users.</li>
              </ul>
            </div>
          </section>

          {/* Security Measures */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">4. Security Measures</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Encryption:</strong> All data transmissions are encrypted using industry-standard SSL/TLS protocols.</li>
                <li><strong>Secure Payments:</strong> Payment processing is handled by PCI-DSS compliant payment gateways.</li>
                <li><strong>Access Control:</strong> Employee access to customer data is strictly limited and monitored.</li>
                <li><strong>Regular Audits:</strong> We conduct regular security audits to ensure the safety of your data.</li>
              </ul>
            </div>
          </section>

          {/* Customer Rights */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">5. Your Rights</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>You can <strong>opt out of marketing emails</strong> at any time by clicking the unsubscribe link in any promotional email.</li>
                <li>You can <strong>request deletion</strong> of your personal data by contacting us at pizzanova264@gmail.com.</li>
                <li>You can <strong>request correction</strong> of any inaccurate personal data we hold about you.</li>
                <li>You can <strong>access your data</strong> by logging into your account settings.</li>
              </ul>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-serif font-bold text-foreground">6. Policy Updates</h2>
            </div>
            <div className="pl-13 space-y-3 text-foreground/80 leading-relaxed">
              <p>We may update this Privacy Policy from time to time. When we make significant changes, we will notify customers through:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email notification to registered users.</li>
                <li>A prominent notice on our website.</li>
                <li>In-app notification for mobile users.</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-muted rounded-2xl p-6 text-center space-y-3">
            <h3 className="font-serif font-semibold text-foreground">Questions about our Privacy Policy?</h3>
            <p className="text-muted-foreground">Contact us at <a href="mailto:pizzanova264@gmail.com" className="text-primary hover:underline">pizzanova264@gmail.com</a></p>
            <p className="text-muted-foreground">Phone: <a href="tel:+919876542210" className="text-primary hover:underline">+91 98765 42210</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
