import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password, name, !isLogin);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black text-gym-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-heading font-bold text-white/[0.02] whitespace-nowrap pointer-events-none z-0">
        IRONCORE
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gym-gray hover:text-gym-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-sm uppercase tracking-widest font-sans font-light">Back</span>
      </motion.button>

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

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 bg-gym-red/10 border border-gym-red/40 text-gym-red px-4 py-3 mb-6 text-sm font-sans"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

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
            className="bg-gym-black border border-white/20 px-6 py-4 text-gym-white focus:outline-none focus:border-gym-red tracking-wider font-sans font-light placeholder:text-white/30 w-full"
            required
          />

          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gym-black border border-white/20 px-6 py-4 text-gym-white focus:outline-none focus:border-gym-red uppercase tracking-wider font-sans font-light placeholder:text-white/30 w-full"
            required
          />

          <MagneticButton
            variant="primary"
            type="submit"
            className="w-full flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? 'Enter' : 'Register'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </MagneticButton>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-gym-gray hover:text-gym-white text-sm tracking-wider uppercase underline-offset-4 hover:underline transition-all"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already a member? Log in"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gym-gray text-xs">
            For admin access, login with: <br />
            <span className="text-gym-white">admin@ironcore.com</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
