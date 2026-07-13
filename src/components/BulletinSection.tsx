import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const BulletinSection = () => {
  const news = [
    {
      title: "New Hammer Strength Equipment Arriving",
      date: "Oct 15",
      content: "We're expanding our leg day arsenal with 5 new Hammer Strength plate-loaded machines."
    },
    {
      title: "Holiday Hours Update",
      date: "Oct 10",
      content: "We will remain open 24/7 during the holidays, but staffed hours will be reduced."
    }
  ];

  return (
    <section id="bulletin" className="py-16 sm:py-24 md:py-32 bg-gym-charcoal border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-10">
            <Bell className="w-8 h-8 text-gym-red mr-4" />
            <h3 className="text-3xl font-heading font-bold text-gym-white uppercase">The Bulletin</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {news.map((item, index) => (
              <div key={index} className="bg-gym-black border border-white/10 p-8 rounded-2xl hover:border-gym-red/30 transition-colors">
                <div className="text-gym-red text-sm font-bold tracking-widest mb-2 uppercase">{item.date}</div>
                <h4 className="text-xl font-heading font-bold text-gym-white mb-3 uppercase">{item.title}</h4>
                <p className="text-gym-gray font-light">{item.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BulletinSection;
