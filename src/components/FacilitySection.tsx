
import { motion } from 'framer-motion';
import { Dumbbell, Clock, HeartPulse } from 'lucide-react';

const FacilitySection = () => {
  const features = [
    {
      icon: <Dumbbell className="w-12 h-12 text-gym-red mb-6" />,
      title: "Top-Tier Equipment",
      description: "Train with industry-leading machines and free weights designed for peak performance."
    },
    {
      icon: <Clock className="w-12 h-12 text-gym-red mb-6" />,
      title: "24/7 Access",
      description: "Your schedule, your rules. Unrestricted access to the facility, anytime day or night."
    },
    {
      icon: <HeartPulse className="w-12 h-12 text-gym-red mb-6" />,
      title: "Luxury Recovery Rooms",
      description: "Optimize your gains with cryotherapy, infrared saunas, and sports massage therapy."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="facility" className="py-32 bg-gym-black relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase mb-4">The Facility</h2>
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-gym-white mb-8">
            MORE THAN A GYM. <br />
            <span className="text-outline">IT'S A MANIFESTO.</span>
          </h3>
          <p className="text-gym-gray text-lg md:text-xl font-light">
            We reject the average. We built this sanctuary for those who demand excellence in every rep, every drop of sweat, and every recovery session. Welcome to the elite standard.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gym-charcoal border border-white/5 p-10 hover:border-gym-red/50 transition-colors duration-500 group"
            >
              <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 origin-bottom-left">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-heading font-bold text-gym-white mb-4 uppercase">{feature.title}</h4>
              <p className="text-gym-gray font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitySection;
