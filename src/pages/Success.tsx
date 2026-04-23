import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function Success() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-24 h-24 rounded-full border border-ink/20 flex items-center justify-center mb-8"
      >
        <Check className="w-10 h-10 stroke-[1]" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-5xl md:text-6xl mb-6 leading-tight"
      >
        Order Confirmed.
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-ink/60 font-light max-w-md mx-auto mb-12"
      >
        Thank you for your purchase. Your order has been received and is being prepared for dispatch. A confirmation email has been sent to your address.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link 
          to="/shop" 
          className="inline-block border border-ink bg-ink text-paper rounded-full px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-ink transition-colors duration-500"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}
