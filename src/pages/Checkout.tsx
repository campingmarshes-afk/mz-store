import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { addOrder } = useData();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 500 ? 0 : 25;
  const orderTotal = cartTotal + tax + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(s => (s + 1) as 1 | 2 | 3);
    } else {
      setIsProcessing(true);
      
      const newOrder = {
        customerName: 'Online Customer', // Would get from form in a real app
        total: orderTotal,
        status: 'booked' as const,
        date: new Date().toISOString().split('T')[0],
        items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
        salesRepId: null
      };
      
      setTimeout(() => {
        addOrder(newOrder);
        setIsProcessing(false);
        clearCart();
        navigate('/success');
      }, 2000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl mb-4">Your bag is empty.</h1>
        <Link to="/shop" className="text-xs uppercase tracking-widest border-b border-ink pb-1">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Side: Forms */}
        <div className="order-2 lg:order-1 pt-8">
          <Link to="/cart" onClick={(e) => { e.preventDefault(); window.history.back(); }} className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ink/50 hover:text-ink transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </Link>

          <div className="w-full h-[1px] bg-ink/10 mb-12 relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 flex space-x-4 w-full justify-between bg-white px-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold bg-white pr-4">1. Contact</span>
              <span className={`text-[10px] uppercase tracking-widest font-semibold bg-white px-4 ${step >= 2 ? 'text-ink' : 'text-ink/30'}`}>2. Shipping</span>
              <span className={`text-[10px] uppercase tracking-widest font-semibold bg-white pl-4 ${step >= 3 ? 'text-ink' : 'text-ink/30'}`}>3. Payment</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 font-light text-sm">
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Email Address</label>
                  <input required type="email" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Phone Number (Optional)</label>
                  <input type="tel" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">First Name</label>
                    <input required type="text" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Last Name</label>
                    <input required type="text" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Street Address</label>
                  <input required type="text" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="col-span-2 lg:col-span-1">
                    <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">City</label>
                    <input required type="text" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">State</label>
                    <input required type="text" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">ZIP Code</label>
                    <input required type="text" className="w-full border border-ink/20 p-4 rounded-sm outline-none focus:border-ink transition-colors" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center space-x-2 mb-6 text-ink/60">
                  <Lock className="w-4 h-4" />
                  <h2 className="font-serif text-2xl text-ink">Secure Payment</h2>
                </div>
                
                <div className="p-6 border border-ink rounded-sm bg-paper/30 space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Card Information</label>
                    <div className="border border-ink/20 rounded-sm overflow-hidden flex flex-col bg-white">
                      <input required type="text" placeholder="Card Number" className="w-full p-4 border-b border-ink/10 outline-none focus:bg-ink/5 transition-colors" />
                      <div className="flex">
                        <input required type="text" placeholder="MM / YY" className="w-1/2 p-4 border-r border-ink/10 outline-none focus:bg-ink/5 transition-colors" />
                        <input required type="text" placeholder="CVC" className="w-1/2 p-4 outline-none focus:bg-ink/5 transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Cardholder Name</label>
                    <input required type="text" className="w-full border border-ink/20 p-4 rounded-sm outline-none bg-white focus:border-ink transition-colors" />
                  </div>
                </div>
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-ink text-paper py-5 mt-12 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-ink/90 transition-all flex items-center justify-center disabled:opacity-70"
            >
              {isProcessing ? 'Processing...' : step === 3 ? `Pay $${orderTotal.toFixed(2)}` : 'Continue'}
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="order-1 lg:order-2 bg-paper/50 p-8 rounded-sm lg:sticky lg:top-32 h-fit">
          <h3 className="font-serif text-2xl mb-8">Order Summary</h3>
          <div className="space-y-6 max-h-[50vh] overflow-y-auto no-scrollbar pb-6 border-b border-ink/10">
            {items.map(item => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-16 h-20 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden relative">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-ink text-paper text-[10px] rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm font-light flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-ink/50 text-[10px] uppercase tracking-wider mt-1">{item.category}</p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="py-6 space-y-4 text-sm font-light border-b border-ink/10">
            <div className="flex justify-between">
              <span className="text-ink/60">Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">Estimated Taxes</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-6 flex justify-between items-center">
            <span className="text-xs uppercase tracking-widest font-semibold">Total</span>
            <span className="font-serif text-3xl">${orderTotal.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
