import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CoachesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const coaches = [
    {
      name: "Marcus Vance",
      specialty: "Strength & Conditioning",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
      bio: "Former Olympic weightlifter with 15 years of coaching elite athletes."
    },
    {
      name: "Sarah Jenkins",
      specialty: "HIIT & Mobility",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
      bio: "Master of functional movement. Will push your cardiovascular limits."
    },
    {
      name: "David 'The Mountain' Cole",
      specialty: "Bodybuilding",
      image: "https://images.unsplash.com/photo-1534438097544-59e564a9386d?q=80&w=2070&auto=format&fit=crop",
      bio: "IFBB Pro specializing in hypertrophy and contest prep."
    },
    {
      name: "Elena Rostova",
      specialty: "Nutrition & Recovery",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
      bio: "PhD in Sports Nutrition. Ensuring your body operates at maximum efficiency."
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="coaches" ref={containerRef} className="py-32 bg-gym-charcoal overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase mb-4">Elite Coaching</h2>
        <h3 className="text-4xl md:text-6xl font-heading font-bold text-gym-white">
          MEET YOUR MAKERS
        </h3>
      </div>

      <div className="w-full relative">
        <motion.div 
          style={{ x }}
          className="flex gap-8 px-6 md:px-20 w-[150vw] md:w-[120vw]"
        >
          {coaches.map((coach, index) => (
            <div 
              key={index} 
              className="relative w-80 md:w-96 h-[30rem] md:h-[35rem] shrink-0 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gym-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              
              <img 
                src={coach.image} 
                alt={coach.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-gym-black via-gym-black/50 to-transparent z-20 flex flex-col justify-end p-8">
                <p className="text-gym-red font-bold uppercase tracking-widest text-sm mb-2">{coach.specialty}</p>
                <h4 className="text-3xl font-heading font-bold text-gym-white mb-2">{coach.name}</h4>
                
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <p className="text-gym-gray font-light mt-4">
                    {coach.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoachesSection;
