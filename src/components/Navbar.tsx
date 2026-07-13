import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Facility', href: '/#facility' },
    { name: 'Coaches', href: '/#coaches' },
    { name: 'Schedule', href: '/#schedule' },
    { name: 'Memberships', href: '/#memberships' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gym-white font-heading text-2xl font-bold tracking-widest cursor-pointer"
          >
            <Dumbbell className="text-gym-red w-8 h-8" />
            <span>IRON<span className="text-gym-red">CORE</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-sm uppercase tracking-widest text-gym-white/70 hover:text-gym-red transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}

            {user ? (
              /* Logged-in state */
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 text-gym-white/80 hover:text-gym-white text-sm uppercase tracking-widest font-sans transition-colors duration-300"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 text-gym-white px-5 py-2 uppercase font-heading font-bold tracking-wider rounded-lg hover:bg-gym-red hover:border-gym-red transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              /* Logged-out state */
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="text-gym-white/70 hover:text-gym-white text-sm uppercase tracking-widest font-sans transition-colors duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gym-red text-gym-white px-6 py-2 uppercase font-heading font-bold tracking-wider rounded-lg hover:bg-gym-white hover:text-gym-black transition-colors duration-300"
                >
                  Join Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="text-gym-white">
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-gym-black flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gym-white hover:text-gym-red transition-colors"
            >
              <X className="w-10 h-10" />
            </button>

            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-4xl uppercase tracking-widest text-gym-white hover:text-gym-red transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}

              {user ? (
                /* Logged-in mobile */
                <div className="flex flex-col items-center gap-5 mt-8">
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                    className="flex items-center gap-3 font-heading text-2xl uppercase tracking-widest text-gym-white hover:text-gym-red transition-colors duration-300"
                  >
                    <LayoutDashboard className="w-6 h-6" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="flex items-center gap-3 bg-white/10 border border-white/20 text-gym-white px-8 py-4 uppercase font-heading font-bold tracking-wider text-xl rounded-xl hover:bg-gym-red hover:border-gym-red transition-all duration-300"
                  >
                    <LogOut className="w-6 h-6" />
                    Logout
                  </button>
                </div>
              ) : (
                /* Logged-out mobile */
                <div className="flex flex-col items-center gap-5 mt-8">
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                    className="font-heading text-2xl uppercase tracking-widest text-gym-white/70 hover:text-gym-white transition-colors duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                    className="bg-gym-red text-gym-white px-8 py-4 uppercase font-heading font-bold tracking-wider text-xl rounded-xl hover:bg-gym-white hover:text-gym-black transition-colors duration-300"
                  >
                    Join Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

