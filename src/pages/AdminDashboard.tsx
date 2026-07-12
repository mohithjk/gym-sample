import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { User, Notice } from '../lib/db';
import { db } from '../lib/db';
import { LogOut, Users, MessageSquare, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<User[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newNotice, setNewNotice] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    setUsers(db.getUsers().filter(u => u.role !== 'admin'));
    setNotices(db.getNotices());
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice) return;
    
    const notice: Notice = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      message: newNotice
    };
    
    db.saveNotice(notice);
    setNotices([notice, ...notices]);
    setNewNotice('');
  };

  const approveUserPayment = (userId: string) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;
    
    const updatedUser = { ...userToUpdate, hasPaid: true, tier: 'The Standard' }; // Defaulting for demo
    db.saveUser(updatedUser);
    
    setUsers(users.map(u => u.id === userId ? updatedUser : u));
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="bg-gym-black min-h-screen text-gym-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-gym-charcoal/80">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gym-red text-white px-2 py-1 text-xs font-bold uppercase tracking-widest">
              Admin
            </div>
            <h1 className="text-xl font-heading font-bold uppercase tracking-widest">
              Ironcore Command
            </h1>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-gym-gray hover:text-gym-white transition-colors uppercase font-heading text-sm tracking-wider flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Members List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gym-charcoal border border-white/5 p-8 flex flex-col"
        >
          <div className="flex items-center mb-8 border-b border-white/10 pb-4">
            <Users className="w-6 h-6 text-gym-red mr-3" />
            <h2 className="text-xl font-heading font-bold uppercase tracking-widest">Member Registry</h2>
          </div>
          
          <div className="flex-grow overflow-y-auto pr-2 space-y-4">
            {users.length === 0 ? (
              <p className="text-gym-gray font-light">No members registered yet.</p>
            ) : (
              users.map(member => (
                <div key={member.id} className="bg-gym-black border border-white/10 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-heading font-bold uppercase text-lg">{member.name}</h3>
                    <p className="text-gym-gray text-sm">{member.email}</p>
                  </div>
                  <div>
                    {member.hasPaid ? (
                      <span className="inline-flex items-center text-green-500 text-xs font-bold uppercase tracking-widest border border-green-500/30 px-3 py-1 bg-green-500/10">
                        <CheckCircle className="w-3 h-3 mr-2" /> Active
                      </span>
                    ) : (
                      <button 
                        onClick={() => approveUserPayment(member.id)}
                        className="bg-gym-red text-white text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-gym-red-hover transition-colors"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Broadcast Notices */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          {/* Post Form */}
          <div className="bg-gym-charcoal border border-white/5 p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-6 h-6 text-gym-red mr-3" />
              <h2 className="text-xl font-heading font-bold uppercase tracking-widest">Broadcast Notice</h2>
            </div>
            
            <form onSubmit={handlePostNotice} className="flex flex-col gap-4">
              <textarea 
                placeholder="Write a message to all members..." 
                value={newNotice}
                onChange={e => setNewNotice(e.target.value)}
                className="bg-gym-black border border-white/20 px-4 py-3 text-gym-white focus:outline-none focus:border-gym-red font-sans placeholder:text-white/30 h-32 resize-none"
                required
              ></textarea>
              <button 
                type="submit"
                className="bg-gym-red text-white py-3 font-heading uppercase tracking-widest hover:bg-gym-red-hover transition-colors self-end px-8"
              >
                Send Broadcast
              </button>
            </form>
          </div>
          
          {/* Recent Notices */}
          <div className="bg-gym-charcoal border border-white/5 p-8 flex-grow">
            <h3 className="text-lg font-heading font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
              Recent Broadcasts
            </h3>
            <div className="space-y-4">
              {notices.map(notice => (
                <div key={notice.id} className="bg-gym-black border border-white/10 p-4">
                  <div className="text-gym-gray text-xs mb-2">{new Date(notice.date).toLocaleString()}</div>
                  <p className="text-gym-white text-sm font-light">{notice.message}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
      </main>
    </div>
  );
};

export default AdminDashboard;
