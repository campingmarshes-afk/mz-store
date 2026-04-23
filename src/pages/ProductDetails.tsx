import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ArrowLeft } from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif text-2xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Images Pane (Scrollable on desktop) */}
        <div className="space-y-4">
          <Link to="/shop" className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ink/50 hover:text-ink transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
          
          {product.images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm"
            >
              <img 
                src={img} 
                alt={`${product.name} detail ${idx + 1}`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        {/* Details Pane (Sticky on desktop) */}
        <div className="lg:relative">
          <div className="lg:sticky lg:top-32 font-light">
            <div className="border-b border-ink/10 pb-8 mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-ink/50 mb-4 block">
                {product.category}
              </span>
              <h1 className="font-serif text-5xl md:text-6xl mb-4 leading-tight">{product.name}</h1>
              <span className="text-xl tracking-wide">${product.price} USD</span>
            </div>

            <p className="text-ink/70 leading-relaxed mb-10 text-sm md:text-base">
              {product.description}
            </p>

            <div className="mb-10">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 border-b border-ink/10 pb-2">Details & Dimensions</h3>
              <ul className="space-y-3 text-sm text-ink/70">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 text-ink/30">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center justify-between border border-ink/20 rounded-full px-4 h-14 sm:w-1/3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-ink/60 hover:text-ink transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-ink/60 hover:text-ink transition-colors"
                >
                  <Plus className="w-4 h-4" />
             </button>
              </div>
              
              <button 
                onClick={() => addItem(product, quantity)}
                className="flex-1 bg-ink text-paper h-14 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-ink/90 transition-all flex items-center justify-center"
              >
                Add to Bag — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <div className="mt-8 text-xs text-ink/40 tracking-wide text-center sm:text-left space-y-2">
              <p>Free standard shipping on orders over $500.</p>
              <p>Made-to-order items ship within 4-6 weeks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
