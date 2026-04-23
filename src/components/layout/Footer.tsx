import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white py-12 px-4 md:px-8 border-t border-gray-100 mt-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="text-primary font-heading font-black text-rose-800 text-2xl leading-none">
            أوتار<br/>
            <span className="text-dark text-xs tracking-widest uppercase font-sans font-bold">AWTAR</span>
          </div>
        </div>
        
        <div className="flex gap-6 text-sm font-bold text-gray-500">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <Link to="/instruments" className="hover:text-primary">الآلات</Link>
          <Link to="/brands" className="hover:text-primary">العلامات التجارية</Link>
          <Link to="/contact" className="hover:text-primary">اتصل بنا</Link>
        </div>

        <div className="text-sm font-bold text-gray-400">
          &copy; {new Date().getFullYear()} أوتار للموسيقى. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
