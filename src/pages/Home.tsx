import { useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FacilitySection from '../components/FacilitySection';
import CoachesSection from '../components/CoachesSection';
import WeeklyScheduleSection from '../components/WeeklyScheduleSection';
import BulletinSection from '../components/BulletinSection';
import FooterSection from '../components/FooterSection';

function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative bg-gym-black min-h-screen text-gym-white overflow-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        <FacilitySection />
        <CoachesSection />
        <WeeklyScheduleSection />

        <BulletinSection />
      </main>

      <FooterSection />
    </div>
  );
}

export default Home;
