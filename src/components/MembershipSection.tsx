import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './ui/MagneticButton';
import { useAuth } from '../context/AuthContext';

const MembershipSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const tiers = [
    {
      id: 'standard',
      name: "The Standard",
      price: "₹4,999",
      period: "/month",
      features: [
        "24/7 Gym Access",
        "All Cardio & Free Weights",
        "Locker Room Access",
        "1 Guest Pass per Month",
      ],
      highlight: false
    },
    {
      id: 'athlete',
      name: "The Athlete",
      price: "₹7,999",
      period: "/month",
      features: [
        "Everything in Standard",
        "Unlimited Group Classes",
        "Priority Booking",
        "1 Recovery Session / Month",
        "Mobile App Access",
      ],
      highlight: true
    },
    {
      id: 'vip',
      name: "The VIP",
      price: "₹14,999",
      period: "/month",
      features: [
        "Everything in Athlete",
        "4 Personal Training Sessions / Month",
        "Unlimited Recovery Rooms",
        "Custom Nutrition Plan",
        "Private Locker",
      ],
      highlight: false
    }
  ];

  const handleSelectPlan = (tierId: string) => {
    if (user) {
      navigate(`/pay?tier=${tierId}`);
    } else {
      navigate(`/login?redirect=/pay?tier=${tierId}`);
    }
  };

  // ── Paid member: show active membership card ──────────────
  if (user?.hasPaid) {
    return (
      <section id="memberships" className="py-16 sm:py-24 md:py-32 bg-gym-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase mb-4">Membership</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-gym-white">
              YOU'RE IN THE ELITE
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-gym-charcoal border border-gym-red rounded-2xl p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gym-red/5 pointer-events-none rounded-2xl" />

            <div className="mb-6 flex justify-center">
              <div className="bg-gym-red rounded-full p-4">
                <Check className="w-10 h-10 text-white" />
              </div>
            </div>

            <h4 className="text-3xl font-heading font-bold text-gym-white uppercase mb-2">
              Active Member
            </h4>
            <p className="text-gym-red font-bold uppercase tracking-widest text-sm mb-4">
              {user.tier || 'Ironcore Member'}
            </p>
            <p className="text-gym-gray mb-10">
              Welcome back, <span className="text-gym-white font-semibold">{user.name}</span>.
              Your membership is active and all facilities are unlocked.
            </p>

            <MagneticButton variant="primary" onClick={() => navigate('/dashboard')}>
              Go to My Dashboard
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Not paid or not logged in: show plan grid ─────────────
  return (
    <section id="memberships" className="py-16 sm:py-24 md:py-32 bg-gym-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase mb-4">Memberships</h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-gym-white">
            CHOOSE YOUR ARSENAL
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-gym-charcoal p-6 sm:p-10 flex flex-col h-full rounded-2xl ${
                tier.highlight ? 'glow-border z-10 border border-gym-red' : 'border border-white/5'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gym-red text-gym-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}

              <h4 className="text-2xl font-heading font-bold text-gym-white mb-2 uppercase">{tier.name}</h4>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-heading font-bold text-gym-white">{tier.price}</span>
                <span className="text-gym-gray ml-2">{tier.period}</span>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gym-gray">
                      <Check className="w-5 h-5 text-gym-red mr-3 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <MagneticButton
                variant={tier.highlight ? 'primary' : 'secondary'}
                className="w-full"
                onClick={() => handleSelectPlan(tier.id)}
              >
                {user ? 'Proceed to Payment' : 'Select Plan'}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
