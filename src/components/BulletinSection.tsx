import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell } from 'lucide-react';

const BulletinSection = () => {
  const schedule = [
    { day: "Mon", classes: ["06:00 - HIIT", "18:00 - Powerlifting"] },
    { day: "Tue", classes: ["07:00 - Mobility", "19:00 - Bodybuilding"] },
    { day: "Wed", classes: ["06:00 - MetCon", "18:00 - Olympic Lifting"] },
    { day: "Thu", classes: ["07:00 - HIIT", "19:00 - Core Strength"] },
    { day: "Fri", classes: ["06:00 - Powerlifting", "17:00 - Open Gym"] },
    { day: "Sat", classes: ["09:00 - Weekend Warrior", "11:00 - Recovery"] },
    { day: "Sun", classes: ["10:00 - Yoga & Mobility", "12:00 - Open Gym"] },
  ];

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
    <section id="schedule" className="py-32 bg-gym-charcoal border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <Calendar className="w-8 h-8 text-gym-red mr-4" />
              <h3 className="text-3xl font-heading font-bold text-gym-white uppercase">Weekly Schedule</h3>
            </div>
            
            <div className="bg-gym-black border border-white/10 p-6 space-y-4">
              {schedule.map((day, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-white/5 last:border-0 gap-4">
                  <div className="w-20 font-heading font-bold text-gym-red text-xl uppercase">
                    {day.day}
                  </div>
                  <div className="flex-grow flex flex-col sm:flex-row gap-2 sm:gap-6">
                    {day.classes.map((cls, cIdx) => (
                      <span key={cIdx} className="text-gym-gray text-sm">{cls}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bulletin/News */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <Bell className="w-8 h-8 text-gym-red mr-4" />
              <h3 className="text-3xl font-heading font-bold text-gym-white uppercase">The Bulletin</h3>
            </div>

            <div className="space-y-6">
              {news.map((item, index) => (
                <div key={index} className="bg-gym-black border border-white/10 p-8 hover:border-gym-red/30 transition-colors">
                  <div className="text-gym-red text-sm font-bold tracking-widest mb-2 uppercase">{item.date}</div>
                  <h4 className="text-xl font-heading font-bold text-gym-white mb-3 uppercase">{item.title}</h4>
                  <p className="text-gym-gray font-light">{item.content}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BulletinSection;
