import { Phone, Star, Bike } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  vehicle_type: string;
  vehicle_number: string | null;
  rating: number | null;
  photo_url: string | null;
}

interface DeliveryPartnerCardProps {
  partner: DeliveryPartner;
}

export function DeliveryPartnerCard({ partner }: DeliveryPartnerCardProps) {
  const handleCall = () => {
    window.open(`tel:${partner.phone.replace(/\s/g, '')}`, '_self');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 shadow-soft border border-border"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {partner.photo_url ? (
            <img src={partner.photo_url} alt={partner.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-primary">{partner.name.charAt(0)}</span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{partner.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-sm font-medium text-foreground">{partner.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Bike className="w-3.5 h-3.5" />
              <span>{partner.vehicle_type}</span>
            </div>
            {partner.vehicle_number && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground font-mono">{partner.vehicle_number}</span>
              </>
            )}
          </div>
        </div>

        {/* Call Button */}
        <button
          onClick={handleCall}
          className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors flex-shrink-0"
        >
          <Phone className="w-5 h-5 text-accent" />
        </button>
      </div>
    </motion.div>
  );
}
