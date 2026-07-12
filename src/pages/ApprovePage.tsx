import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, CheckCircle } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

const ApprovePage = () => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('user') || 'Unknown User';
  const phone = searchParams.get('phone') || '';
  const navigate = useNavigate();

  const handleApprove = () => {
    // Navigate to payment page with user details
    navigate(`/pay?user=${encodeURIComponent(userName)}&phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="min-h-screen bg-gym-black text-gym-white flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-gym-charcoal border border-white/10 p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gym-red" />
        
        <div className="flex justify-center mb-8">
          <Dumbbell className="w-12 h-12 text-gym-red" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-center mb-2 uppercase tracking-widest">
          Admin Dashboard
        </h1>
        <p className="text-gym-gray text-center mb-10">Review new membership application</p>

        <div className="bg-gym-black border border-white/5 p-6 mb-10">
          <h2 className="text-xl font-heading font-bold text-gym-white mb-6 border-b border-white/10 pb-4">Applicant Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gym-gray">Full Name</span>
              <span className="font-bold text-gym-white uppercase tracking-wider">{userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gym-gray">Phone Number</span>
              <span className="font-bold text-gym-white">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gym-gray">Status</span>
              <span className="font-bold text-yellow-500 uppercase tracking-widest text-sm">Pending Review</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton 
            variant="primary" 
            onClick={handleApprove}
            className="flex items-center justify-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Proceed & Send Payment Link
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
};

export default ApprovePage;
