import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 uppercase font-heading font-bold text-lg tracking-wider transition-colors duration-300 overflow-hidden group z-10";
  const variants = {
    primary: "bg-gym-red text-gym-white hover:bg-gym-red-hover",
    secondary: "border-2 border-gym-red text-gym-red hover:bg-gym-red hover:text-gym-white",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props as any}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default MagneticButton;
