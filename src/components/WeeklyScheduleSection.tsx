import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const schedule = [
  {
    day: "MON", fullDay: "Monday", num: "01",
    classes: [
      { time: "06:00", name: "HIIT" },
      { time: "18:00", name: "Powerlifting" },
    ],
  },
  {
    day: "TUE", fullDay: "Tuesday", num: "02",
    classes: [
      { time: "07:00", name: "Mobility" },
      { time: "19:00", name: "Bodybuilding" },
    ],
  },
  {
    day: "WED", fullDay: "Wednesday", num: "03",
    classes: [
      { time: "06:00", name: "MetCon" },
      { time: "18:00", name: "Olympic Lifting" },
    ],
  },
  {
    day: "THU", fullDay: "Thursday", num: "04",
    classes: [
      { time: "07:00", name: "HIIT" },
      { time: "19:00", name: "Core Strength" },
    ],
  },
  {
    day: "FRI", fullDay: "Friday", num: "05",
    classes: [
      { time: "06:00", name: "Powerlifting" },
      { time: "17:00", name: "Open Gym" },
    ],
  },
  {
    day: "SAT", fullDay: "Saturday", num: "06",
    classes: [
      { time: "09:00", name: "Weekend Warrior" },
      { time: "11:00", name: "Recovery" },
    ],
  },
  {
    day: "SUN", fullDay: "Sunday", num: "07",
    classes: [
      { time: "10:00", name: "Yoga & Mobility" },
      { time: "12:00", name: "Open Gym" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const WeeklyScheduleSection = () => {
  return (
    <section id="weekly-schedule" className="py-16 sm:py-24 md:py-32 bg-gym-black relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-gym-red to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-gym-red text-xs font-bold tracking-[0.35em] uppercase mb-4">— Train Every Day</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-gym-white leading-none">
            WEEKLY<br />
            <span className="text-outline">SCHEDULE</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {schedule.map((day, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative bg-gym-charcoal border border-white/8 hover:border-gym-red/60 rounded-2xl overflow-hidden transition-all duration-400 cursor-default"
              style={{ minHeight: "260px" }}
            >
              {/* Top red line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-gym-red to-transparent" />

              <div className="p-5">
                {/* Day + number */}
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-3xl font-heading font-bold text-gym-white group-hover:text-gym-red transition-colors duration-300">
                    {day.day}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/20">{day.num}</span>
                </div>
                <div className="text-[10px] text-white/30 font-bold tracking-[0.25em] uppercase mb-5">
                  {day.fullDay}
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-5" />

                {/* Classes */}
                <div className="space-y-3">
                  {day.classes.map((cls, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-gym-black/60 border border-white/6 rounded-xl p-3 group-hover:border-white/12 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Clock className="w-3 h-3 text-gym-red/60" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-white/35 uppercase">
                          {cls.time}
                        </span>
                      </div>
                      <div className="font-heading font-bold text-sm uppercase tracking-wide text-gym-white">
                        {cls.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom corner bracket */}
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-gym-red/40 transition-colors duration-400 rounded-br-sm" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 bg-gym-charcoal border border-white/8 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gym-red animate-pulse shrink-0" />
            <p className="text-gym-gray text-sm">
              All classes available to <span className="text-gym-white font-bold">ALL membership tiers</span>. No booking required.
            </p>
          </div>
          <a
            href="#membership"
            className="shrink-0 text-xs font-bold tracking-[0.25em] uppercase text-gym-red border border-gym-red/40 px-6 py-3 rounded-xl hover:bg-gym-red hover:text-gym-white transition-all duration-300"
          >
            Join Now →
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-gym-red to-transparent" />
    </section>
  );
};

export default WeeklyScheduleSection;
