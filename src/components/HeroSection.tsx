import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SplitText from './ui/SplitText';
import MagneticButton from './ui/MagneticButton';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gym-black/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Gym interior" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        <SplitText 
          text="REDEFINE YOUR LIMITS" 
          className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-bold text-gym-white mb-6 leading-none tracking-tighter"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-2xl text-gym-white/80 max-w-2xl mb-12 font-sans font-light"
        >
          Elite coaching, state-of-the-art equipment, and an exclusive community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <MagneticButton 
            variant="primary"
            onClick={() => navigate('/dashboard')}
          >
            View Memberships
          </MagneticButton>
          <MagneticButton 
            variant="secondary"
            onClick={() => document.getElementById('coaches')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Meet the Coaches
          </MagneticButton>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-gym-white/50 text-sm uppercase tracking-widest font-sans mb-2">Scroll</span>
        <div className="w-[1px] h-16 bg-gym-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 64, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-gym-red absolute top-0 left-0"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
