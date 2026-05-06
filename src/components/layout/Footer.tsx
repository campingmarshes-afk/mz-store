import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export function Footer() {
  const { storeName } = useData();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white py-12 px-4 md:px-8 border-t border-gray-100 mt-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="text-primary font-heading font-black text-rose-800 text-2xl leading-none">
            {storeName.split(' ')[0]}<br/>
            <span className="text-dark text-xs tracking-widest uppercase font-sans font-bold">AWTAR</span>
          </div>
        </div>
        
        <div className="flex gap-6 text-sm font-bold text-gray-500">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <Link to="/shop" className="hover:text-primary">تسوق الآن</Link>
          <Link to="/brands" className="hover:text-primary">العلامات التجارية</Link>
          <Link to="/contact" className="hover:text-primary">اتصل بنا</Link>
        </div>

        <div className="text-sm font-bold text-gray-400">
          &copy; {new Date().getFullYear()} {storeName}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
