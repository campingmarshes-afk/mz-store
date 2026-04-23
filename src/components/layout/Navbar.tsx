import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300 ease-in-out px-4 md:px-8 py-4",
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-primary font-heading font-black text-rose-800 text-3xl leading-none">
              أوتار<br/>
              <span className="text-dark text-sm tracking-widest uppercase font-sans font-bold">AWTAR</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 space-x-reverse text-sm font-bold text-dark">
            <Link to="/" className="text-primary border-b-2 border-primary pb-0.5">
              الرئيسية
            </Link>
            <div className="relative group cursor-pointer flex items-center gap-1">
              الآلات <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="relative group cursor-pointer flex items-center gap-1">
              العلامات التجارية <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <Link to="/contact" className="hover:text-primary transition-colors">
              اتصل بنا
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-gray-400 hover:text-primary transition-colors hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-dark hover:text-primary transition-colors bg-white p-2.5 rounded-full shadow-sm"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/login" className="hidden md:inline-flex bg-dark text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-sm hover:bg-primary transition-colors">
              تسجيل الدخول
            </Link>
            <button 
              className="md:hidden p-2 -mr-2 text-dark"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-white px-6 py-4 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-primary font-heading font-black text-2xl tracking-tighter">
                أوتار للموسيقى
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="bg-gray-100 p-2 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6 flex-1 text-lg font-bold">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>الرئيسية</Link>
              <Link to="/instruments" onClick={() => setIsMobileMenuOpen(false)}>الآلات</Link>
              <Link to="/brands" onClick={() => setIsMobileMenuOpen(false)}>العلامات التجارية</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>اتصل بنا</Link>
              <Link to="/login" className="text-primary" onClick={() => setIsMobileMenuOpen(false)}>تسجيل الدخول</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
