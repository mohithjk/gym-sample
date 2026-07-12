import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Workout, Notice } from '../lib/db';
import { db } from '../lib/db';
import { LogOut, Activity, Bell } from 'lucide-react';
import MembershipSection from '../components/MembershipSection';
import PaymentPage from './PaymentPage';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  
  // Workout form state
  const [workoutType, setWorkoutType] = useState('');
  const [workoutNotes, setWorkoutNotes] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setWorkouts(db.getWorkouts(user.id));
    setNotices(db.getNotices());
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !workoutType) return;
    
    const newWorkout: Workout = {
      id: Date.now().toString(),
      userId: user.id,
      date: new Date().toISOString(),
      type: workoutType,
      notes: workoutNotes
    };
    
    db.saveWorkout(newWorkout);
    setWorkouts([newWorkout, ...workouts]);
    setWorkoutType('');
    setWorkoutNotes('');
  };

  if (!user) return null;

  // If user hasn't paid, show them the membership selection
  if (!user.hasPaid) {
    return (
      <div className="bg-gym-black min-h-screen">
        <div className="container mx-auto px-6 py-8 flex justify-between items-center border-b border-white/10">
          <h1 className="text-2xl font-heading font-bold text-gym-white uppercase tracking-widest">
            Welcome, {user.name}
          </h1>
          <button onClick={handleLogout} className="text-gym-gray hover:text-gym-red flex items-center transition-colors">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
        
        {/* We reuse the Payment flow */}
        <PaymentPage isDashboardFlow={true} />
      </div>
    );
  }

  return (
    <div className="bg-gym-black min-h-screen text-gym-white">
      {/* Dashboard Header */}
      <header className="border-b border-white/10 bg-gym-charcoal/50">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold uppercase tracking-widest mb-1">
              Member Portal
            </h1>
            <p className="text-gym-gray text-sm uppercase tracking-wider">Welcome back, {user.name}</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors uppercase font-heading text-sm tracking-wider flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Log Workout */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gym-charcoal border border-white/5 p-8"
          >
            <div className="flex items-center mb-6">
              <Activity className="w-8 h-8 text-gym-red mr-3" />
              <h2 className="text-2xl font-heading font-bold uppercase tracking-widest">Log Workout</h2>
            </div>
            
            <form onSubmit={handleLogWorkout} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Workout Type (e.g., Pull Day, HIIT, Leg Day)" 
                value={workoutType}
                onChange={e => setWorkoutType(e.target.value)}
                className="bg-gym-black border border-white/20 px-4 py-3 text-gym-white focus:outline-none focus:border-gym-red font-sans placeholder:text-white/30"
                required
              />
              <textarea 
                placeholder="Notes (Exercises, Sets, Reps, Weights...)" 
                value={workoutNotes}
                onChange={e => setWorkoutNotes(e.target.value)}
                className="bg-gym-black border border-white/20 px-4 py-3 text-gym-white focus:outline-none focus:border-gym-red font-sans placeholder:text-white/30 h-32 resize-none"
              ></textarea>
              <button 
                type="submit"
                className="bg-gym-red text-white py-3 font-heading uppercase tracking-widest hover:bg-gym-red-hover transition-colors"
              >
                Save Session
              </button>
            </form>
          </motion.div>

          {/* Workout History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-heading font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
              Recent Sessions
            </h3>
            
            {workouts.length === 0 ? (
              <p className="text-gym-gray font-light">No workouts logged yet. Time to hit the iron.</p>
            ) : (
              <div className="space-y-4">
                {workouts.map(workout => (
                  <div key={workout.id} className="bg-gym-black border border-white/10 p-6 hover:border-gym-red/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-heading font-bold text-gym-red uppercase">{workout.type}</h4>
                      <span className="text-gym-gray text-xs">{new Date(workout.date).toLocaleDateString()}</span>
                    </div>
                    {workout.notes && (
                      <p className="text-gym-gray font-light text-sm whitespace-pre-wrap">{workout.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Notices */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gym-black border border-white/5 p-6 border-t-2 border-t-gym-red"
          >
            <div className="flex items-center mb-6 border-b border-white/10 pb-4">
              <Bell className="w-6 h-6 text-gym-white mr-3" />
              <h2 className="text-xl font-heading font-bold uppercase tracking-widest">Notice Board</h2>
            </div>
            
            <div className="space-y-6">
              {notices.map(notice => (
                <div key={notice.id} className="group">
                  <div className="text-gym-gray text-xs mb-1">{new Date(notice.date).toLocaleDateString()}</div>
                  <p className="text-gym-white font-light text-sm group-hover:text-gym-red transition-colors">
                    {notice.message}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
      </main>
    </div>
  );
};

export default UserDashboard;
