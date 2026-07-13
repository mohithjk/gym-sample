import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, QrCode, ShieldCheck, X } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import { useAuth } from '../context/AuthContext';

interface PaymentPageProps {
  isDashboardFlow?: boolean;
}

const PaymentPage = ({ isDashboardFlow = false }: PaymentPageProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  // Always use the logged-in user's name; fallback to query param for legacy flow
  const userName = user?.name || searchParams.get('user') || 'Guest';

  const [selectedTier, setSelectedTier] = useState<string | null>(searchParams.get('tier') || null);
  const [showScanner, setShowScanner] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Already paid → send straight to dashboard
  if (user?.hasPaid) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  // Not logged in → send to login
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  const tiers = [
    { id: 'standard', name: "The Standard", price: "₹4,999" },
    { id: 'athlete', name: "The Athlete", price: "₹7,999", highlight: true },
    { id: 'vip', name: "The VIP", price: "₹14,999" }
  ];

  const handlePay = () => {
    if (!selectedTier) return;
    setShowScanner(true);
  };

  const handleSimulatePayment = () => {
    // Always update user as paid regardless of flow
    if (user) {
      updateUser({ hasPaid: true, tier: tiers.find(t => t.id === selectedTier)?.name });
    }
    setPaymentSuccess(true);
    // After 2s success screen, redirect to their personal dashboard
    setTimeout(() => {
      setShowScanner(false);
      navigate('/dashboard', { replace: true });
    }, 2000);
  };

  return (
    <div className={`${isDashboardFlow ? 'py-12' : 'min-h-screen py-20'} bg-gym-black text-gym-white px-6 relative`}>
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {!isDashboardFlow && <h2 className="text-gym-red text-sm font-bold tracking-[0.3em] uppercase mb-4">Application Approved</h2>}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gym-white uppercase">
            Welcome to Ironcore, <span className="text-gym-red">{userName}</span>
          </h1>
          <p className="text-gym-gray mt-6">Select your membership tier to complete your registration and unlock your portal.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTier(tier.id)}
              className={`cursor-pointer p-8 flex flex-col items-center justify-center border transition-all duration-300 ${
                selectedTier === tier.id 
                  ? 'bg-gym-charcoal border-gym-red shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                  : tier.highlight 
                    ? 'bg-gym-charcoal border-white/20 hover:border-white/40' 
                    : 'bg-gym-black border-white/10 hover:border-white/30'
              }`}
            >
              {selectedTier === tier.id && (
                <div className="mb-4 bg-gym-red rounded-full p-2">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
              <h3 className="text-xl font-heading font-bold uppercase mb-2 text-center">{tier.name}</h3>
              <p className="text-3xl font-heading text-gym-red font-bold">{tier.price}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <MagneticButton 
            variant="primary" 
            onClick={handlePay}
            disabled={!selectedTier}
            className={!selectedTier ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
          >
            Proceed to Payment
          </MagneticButton>
        </div>
      </div>

      {/* Razorpay Mock Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white text-black max-w-md w-full rounded-xl overflow-hidden shadow-2xl relative"
            >
              {paymentSuccess ? (
                <div className="p-12 flex flex-col items-center text-center bg-green-50">
                  <Check className="w-20 h-20 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-700">Payment Successful!</h3>
                  <p className="text-gray-600 mt-2">Unlocking your dashboard...</p>
                </div>
              ) : (
                <>
                  <div className="bg-[#02042b] p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-blue-400 w-6 h-6" />
                      <span className="font-bold tracking-wider">RAZORPAY SECURE</span>
                    </div>
                    <button onClick={() => setShowScanner(false)} className="hover:text-red-400 transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-8 flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold mb-2">Scan to Pay</h3>
                    <p className="text-gray-500 mb-6">Use any UPI app to complete the transaction.</p>
                    
                    <div 
                      onClick={handleSimulatePayment}
                      className="bg-gray-100 p-6 rounded-2xl mb-6 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors relative group"
                    >
                      <QrCode className="w-48 h-48 text-gray-800" strokeWidth={1} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/80 text-white px-4 py-2 rounded font-bold text-sm">
                          CLICK TO SIMULATE PAYMENT
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500 mb-1">Or pay via UPI ID</p>
                      <p className="font-bold font-mono text-lg tracking-wider">9876543210@upi</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
