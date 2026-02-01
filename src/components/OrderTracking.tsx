import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ChefHat, Truck, Home, MapPin } from 'lucide-react';

interface OrderTrackingProps {
  orderId: string;
  status: string;
  address?: string;
}

const stages = [
  { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { id: 'preparing', label: 'Preparing', icon: ChefHat },
  { id: 'ready', label: 'Ready', icon: Clock },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: Home },
];

export function OrderTracking({ orderId, status, address }: OrderTrackingProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(30);

  useEffect(() => {
    const stageIndex = stages.findIndex(s => s.id === status);
    setCurrentStage(stageIndex >= 0 ? stageIndex : 0);
    
    // Simulate time based on stage
    const times = [30, 25, 15, 10, 0];
    setEstimatedTime(times[stageIndex] || 30);
  }, [status]);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-serif font-bold">Order #{orderId.slice(0, 8)}</h3>
          <p className="text-sm text-muted-foreground">
            {estimatedTime > 0 ? `Estimated: ${estimatedTime} mins` : 'Delivered!'}
          </p>
        </div>
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <motion.div
            animate={{ rotate: estimatedTime > 0 ? 360 : 0 }}
            transition={{ duration: 2, repeat: estimatedTime > 0 ? Infinity : 0, ease: 'linear' }}
          >
            {estimatedTime > 0 ? (
              <Truck className="w-7 h-7 text-primary" />
            ) : (
              <CheckCircle className="w-7 h-7 text-accent" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-border">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = index <= currentStage;
            const isCurrent = index === currentStage;
            
            return (
              <div key={stage.id} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ 
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted ? 'var(--primary)' : 'var(--muted)'
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={`text-xs mt-2 text-center max-w-16 ${
                  isCompleted ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Address */}
      {address && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
            <p>{address}</p>
          </div>
        </div>
      )}

      {/* Live Map Simulation */}
      {status === 'out_for_delivery' && (
        <div className="mt-4 rounded-xl overflow-hidden border border-border">
          <div className="relative h-32 bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ x: [-20, 20, -20] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Truck className="w-8 h-8 text-primary" />
                </motion.div>
                <p className="text-xs text-muted-foreground mt-2">Driver on the way</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
