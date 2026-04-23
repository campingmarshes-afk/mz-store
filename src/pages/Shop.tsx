import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export function Shop() {
  const [filter, setFilter] = useState<string | null>(null);
  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = filter 
    ? products.filter(p => p.category === filter)
    : products;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-ink/10 pb-8 gap-8">
        <div>
          <h1 className="font-serif text-6xl font-light tracking-tight mb-2">Shop <span className="italic text-ink-light">All</span></h1>
          <p className="text-sm text-ink/60 font-light">Everyday objects, elevated.</p>
        </div>
        
        <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <button 
            onClick={() => setFilter(null)}
            className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${filter === null ? 'text-ink font-medium border-b border-ink' : 'text-ink/40 hover:text-ink'}`}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${filter === cat ? 'text-ink font-medium border-b border-ink' : 'text-ink/40 hover:text-ink'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredProducts.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="aspect-[3/4] overflow-hidden mb-5 bg-gray-100 rounded-sm">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-xl mb-1 group-hover:opacity-70 transition-opacity">{product.name}</h3>
                  <p className="text-[10px] text-ink/50 uppercase tracking-widest">{product.category}</p>
                </div>
                <span className="text-sm tracking-wide">${product.price}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
