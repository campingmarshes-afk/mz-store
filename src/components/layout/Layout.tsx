import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { motion, AnimatePresence } from 'motion/react';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-ink selection:text-paper">
      <Navbar />
      <CartDrawer />
      <AnimatePresence mode="wait">
        <main className="flex-1">
          <Outlet />
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
