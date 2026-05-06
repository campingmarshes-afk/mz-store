import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export function Shop() {
  const { products, getAvailableStock } = useData();
  const [filter, setFilter] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = filter 
    ? products.filter(p => p.category === filter)
    : products;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-200 pb-8 gap-8">
        <div>
          <h1 className="font-heading text-5xl font-black text-dark mb-2">تسوق <span className="text-primary italic">الآلات</span></h1>
          <p className="text-sm text-gray-500 font-medium">أفضل الآلات الموسيقية بجودة لا تضاهى.</p>
        </div>
        
        <div className="flex space-x-6 space-x-reverse overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <button 
            onClick={() => setFilter(null)}
            className={`text-sm font-bold whitespace-nowrap transition-colors ${filter === null ? 'text-dark border-b-2 border-primary pb-1' : 'text-gray-400 hover:text-dark'}`}
          >
            جميع المنتجات
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm font-bold whitespace-nowrap transition-colors ${filter === cat ? 'text-dark border-b-2 border-primary pb-1' : 'text-gray-400 hover:text-dark'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, idx) => {
          const availableStock = getAvailableStock(product.id);
          const isOutOfStock = availableStock <= 0;

          return (
            <motion.div 
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`bg-white rounded-[1.5rem] overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all border border-gray-100 group ${isOutOfStock ? 'opacity-70' : ''}`}
            >
              <Link to={`/product/${product.id}`} className="block flex-1 flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50 relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white px-4 py-2 rounded-full text-black font-bold text-xs tracking-wider">نفدت الكمية</span>
                    </div>
                  )}
                  {!isOutOfStock && availableStock <= 2 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                      باقي {availableStock} فقط
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-base text-dark mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-[12px] text-gray-500 font-bold mb-4 bg-gray-100 w-fit px-2 py-1 rounded-full">{product.category}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100/60 flex justify-between items-center">
                     <div className="text-xs font-bold text-gray-400">
                      {isOutOfStock ? 'غير متوفر' : `متوفر: ${availableStock}`}
                     </div>
                     <div dir="ltr">
                      <span className="font-heading font-bold text-primary text-xl tracking-tight">${product.price.toFixed(2)}</span>
                     </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <p className="text-gray-500 font-medium">لا توجد منتجات مطابقة للبحث.</p>
          </div>
        )}
      </div>
    </div>
  );
}
