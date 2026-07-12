import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Dumbbell, ArrowRight } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // For signup, require name. For login, default to 'User'
    login(email, isLogin ? 'User' : name);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gym-black text-gym-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-heading font-bold text-white/[0.02] whitespace-nowrap pointer-events-none z-0">
        IRONCORE
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-gym-charcoal border border-white/10 p-10 relative z-10"
      >
        <div className="flex justify-center mb-8">
          <Dumbbell className="w-12 h-12 text-gym-red" />
        </div>

        <h1 className="text-3xl font-heading font-bold text-center mb-2 uppercase tracking-widest">
          {isLogin ? 'Member Login' : 'Join the Elite'}
        </h1>
        <p className="text-gym-gray text-center mb-8">
          {isLogin ? 'Access your dashboard.' : 'Start your transformation today.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="FULL NAME" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gym-black border border-white/20 px-6 py-4 text-gym-white focus:outline-none focus:border-gym-red uppercase tracking-wider font-sans font-light placeholder:text-white/30 w-full"
              required={!isLogin}
            />
          )}
          
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gym-black border border-white/20 px-6 py-4 text-gym-white focus:outline-none focus:border-gym-red uppercase tracking-wider font-sans font-light placeholder:text-white/30 w-full"
            required
          />

          <MagneticButton variant="primary" type="submit" className="w-full flex justify-center items-center">
            {isLogin ? 'Enter' : 'Register'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </MagneticButton>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gym-gray hover:text-gym-white text-sm tracking-wider uppercase underline-offset-4 hover:underline transition-all"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already a member? Log in"}
          </button>
        </div>
        
        <div className="mt-6 text-center">
           <p className="text-gym-gray text-xs">For admin access, login with: <br/> <span className="text-gym-white">admin@ironcore.com</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
