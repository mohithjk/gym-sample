import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './ui/MagneticButton';

const FooterSection = () => {
  const navigate = useNavigate();

  return (
    <footer id="footer" className="bg-gym-black relative pt-16 sm:pt-24 md:pt-32 overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* CTA & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-gym-white mb-4 sm:mb-6 uppercase tracking-tight">
              JOIN THE <br />
              <span className="text-gym-red">ELITE</span>
            </h2>
            <p className="text-gym-gray text-lg mb-10 max-w-md">
              Create your account to view membership plans and access your personalized portal.
            </p>
            
            <MagneticButton 
              variant="primary" 
              className="mb-12"
              onClick={() => navigate('/login')}
            >
              Sign Up / Login
            </MagneticButton>

            <div className="space-y-4">
              <div className="flex items-center text-gym-gray hover:text-gym-white transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 text-gym-red mr-3" />
                <span className="font-light">123 Iron Avenue, Muscle City, MC 90210</span>
              </div>
              <div className="flex items-center text-gym-gray hover:text-gym-white transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-gym-red mr-3" />
                <span className="font-light">+1 (555) 019-IRON</span>
              </div>
              <div className="flex items-center text-gym-gray hover:text-gym-white transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-gym-red mr-3" />
                <span className="font-light">owner@ironcore.com</span>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[280px] sm:h-[380px] md:h-[500px] bg-gym-charcoal border border-white/5 relative group overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gym-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62556.66550093083!2d74.8306!3d12.9141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba359a8e9ade1b3%3A0xf9e39810d99e0f04!2sMangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1714493393962!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>

      {/* Deep Footer */}
      <div className="border-t border-white/5 py-8 mt-20 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gym-white/40 text-sm font-light mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} IRONCORE GYM. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-gym-white/40 hover:text-gym-red transition-colors font-heading tracking-widest text-sm">INSTAGRAM</a>
            <a href="#" className="text-gym-white/40 hover:text-gym-red transition-colors font-heading tracking-widest text-sm">YOUTUBE</a>
            <a href="#" className="text-gym-white/40 hover:text-gym-red transition-colors font-heading tracking-widest text-sm">TWITTER</a>
          </div>
        </div>
      </div>
      
      {/* Background Watermark */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-[15rem] md:text-[25rem] font-heading font-bold text-white/[0.02] whitespace-nowrap pointer-events-none z-0">
        IRONCORE
      </div>
    </footer>
  );
};

export default FooterSection;
