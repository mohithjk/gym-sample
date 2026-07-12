import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const MembershipSection = () => {
  const tiers = [
    {
      name: "The Standard",
      price: "$99",
      period: "/month",
      features: ["24/7 Access", "All cardio & free weights", "Locker room access", "1 Guest pass per month"],
      highlight: false
    },
    {
      name: "The Athlete",
      price: "$149",
      period: "/month",
      features: ["Everything in Standard", "Unlimited Group Classes", "Priority Booking", "1 Recovery Session/mo", "App Access"],
      highlight: true
    },
    {
      name: "The VIP",
      price: "$299",
      period: "/month",
      features: ["Everything in Athlete", "4 Personal Training Sessions/mo", "Unlimited Recovery Rooms", "Custom Nutrition Plan", "Private Locker"],
      highlight: false
    }
  ];

  return (
    <section id="memberships" className="py-32 bg-gym-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase mb-4">Memberships</h2>
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-gym-white">
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
              className={`relative bg-gym-charcoal p-10 flex flex-col h-full ${
                tier.highlight ? 'glow-border z-10 md:-scale-y-105 md:scale-x-105 border border-gym-red' : 'border border-white/5'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gym-red text-gym-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
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
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Select Plan
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
