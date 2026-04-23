import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="font-heading font-bold text-lg">سلة المشتريات ({items.length})</span>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-dark transition-colors bg-gray-50 rounded-full"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <ShoppingBag className="w-16 h-16 stroke-[1.5]" />
                  <p className="font-heading font-medium text-lg text-gray-500">السلة فارغة حالياً.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-sm font-bold text-primary uppercase tracking-wider mt-4 hover:text-primary-dark transition-colors"
                  >
                    تصفح الآلات
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex space-x-4 space-x-reverse bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 flex-shrink-0 bg-white rounded-xl shadow-inner overflow-hidden p-1">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-heading font-bold text-sm leading-tight line-clamp-1">{item.name}</span>
                          <span className="font-heading font-bold text-primary mr-2">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium mt-1">{item.category}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-white rounded-full border border-gray-200" dir="ltr">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-dark hover:bg-gray-50 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3 stroke-[3]" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-dark">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-dark hover:bg-gray-50 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[11px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase"
                        >
                          إزالة
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-gray-500 uppercase">المجموع</span>
                  <span className="font-heading font-black text-3xl text-dark">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-4 rounded-full font-bold text-sm transition-colors shadow-lg hover:bg-primary-dark"
                >
                  إتمام الطلب
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
