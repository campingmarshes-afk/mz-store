import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Plus, Star, Box, Compass } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export function Home() {
  const { addItem } = useCart();
  const brands = [
    { name: "Yamaha", logo: "yamaha" },
    { name: "Fender", logo: "fender" },
    { name: "Gibson", logo: "gibson" },
    { name: "Roland", logo: "roland" },
    { name: "Korg", logo: "korg" },
    { name: "Stradivarius", logo: "stradivarius" },
  ];

  return (
    <div className="w-full bg-[#f8f9fa] pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12">
        
        {/* Top Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[480px]">
          
          {/* Main Hero Banner */}
          <div className="lg:col-span-8 bg-dark rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10 w-full max-w-sm">
              <h3 className="text-primary font-medium text-lg mb-2">أروع الآلات الموسيقية</h3>
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4 drop-shadow-xl">
                ألحان<br/>تُسعد الروح
              </h1>
              <p className="text-white/60 font-medium mb-8">خصم ٢٠٪ على جميع أجهزة البيانو هذا الأسبوع</p>
              <Link 
                to="/shop"
                className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-dark transition-colors shadow-lg"
              >
                تسوق الآن
              </Link>
            </div>
            
            {/* Main Hero Image */}
            <div className="absolute right-0 md:left-0 md:right-auto bottom-[-5%] w-[80%] md:w-[65%] h-[120%] pointer-events-none transform -scale-x-100">
              <img 
                src="https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2999&auto=format&fit=crop" 
                alt="Piano" 
                className="w-full h-full object-contain drop-shadow-2xl translate-x-12 translate-y-12 scale-[1.2] origin-bottom-left mix-blend-lighten"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Side Banners */}
          <div className="lg:col-span-4 grid grid-rows-2 gap-4 h-full">
            {/* Top Right Banner */}
            <div className="bg-[#1e1e1e] rounded-[2rem] overflow-hidden relative group cursor-pointer h-full min-h-[220px]">
              <img 
                src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=1000&auto=format&fit=crop" 
                alt="Classic Guitar" 
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-white/80 text-[12px] font-bold tracking-wider mb-1">جيتار كلاسيكي</p>
                  <h3 className="text-white font-heading text-2xl font-bold">صوت دافئ</h3>
                </div>
                <div className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-primary font-bold" dir="ltr">
                  $320
                </div>
              </div>
            </div>

            {/* Bottom Right Banner */}
            <div className="bg-[#2c1d11] rounded-[2rem] overflow-hidden relative group cursor-pointer h-full min-h-[220px]">
              <img 
                src="https://images.unsplash.com/photo-1623864070005-728b7eaddce1?q=80&w=1000&auto=format&fit=crop" 
                alt="Oud" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-center">
                <h3 className="text-white font-heading text-4xl font-bold leading-tight">
                  أصالة النغم<br/>
                  <span className="text-primary">الشرقي!</span>
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Brands Carousel */}
        <section className="py-6">
          <h3 className="text-center text-sm font-bold text-gray-500 tracking-widest mb-6 border-b border-gray-200 inline-block mx-auto pb-2">أشهر العلامات التجارية</h3>
          <div className="flex justify-between items-center bg-white px-8 py-5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto gap-12 no-scrollbar" dir="ltr">
            {brands.map((brand, i) => (
              <div key={i} className="flex-shrink-0 w-16 h-10 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-pointer text-dark">
                <div className="font-heading font-black text-xl italic">{brand.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories / Promos Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PromoCard 
            title="بيانو فاخر للمحترفين" 
            bgClass="bg-[#2c3e50]"
            imgSrc="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop"
          />
          <PromoCard 
            title="جيتار أكوستيك إسباني" 
            bgClass="bg-[#8e44ad]"
            imgSrc="https://images.unsplash.com/photo-1550985543-f47f38aee660?q=80&w=800&auto=format&fit=crop"
          />
          <PromoCard 
            title="أوتار كمان أصلية" 
            bgClass="bg-[#c0392b]"
            imgSrc="https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=800&auto=format&fit=crop"
          />
          <PromoCard 
            title="معدات ستوديو حديثة" 
            bgClass="bg-[#27ae60]"
            imgSrc="https://images.unsplash.com/photo-1598488035139-2ce129188e73?q=80&w=800&auto=format&fit=crop"
          />
        </section>

        {/* Discounted Goods */}
        <section className="pt-8">
          <div className="flex items-center gap-2 mb-6">
            <Box className="w-6 h-6 text-dark" />
            <h2 className="font-heading text-2xl font-bold text-dark">أحدث الآلات الموسيقية</h2>
          </div>
          
          <div className="relative">
            <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white shadow-md rounded-full p-2 text-gray-400 hover:text-dark transition-colors border border-gray-100 hidden md:flex">
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 px-2 no-scrollbar">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-[1.5rem] p-4 flex flex-col hover:shadow-xl transition-shadow border border-gray-100 min-w-[200px]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex items-center gap-1.5 pt-2">
                      <span className="bg-red-100 text-red-600 outline outline-1 outline-red-200 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">جديد</span>
                      <div className="flex items-center text-primary text-xs font-bold gap-0.5" dir="ltr">
                        4.8 <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 mt-2">
                    <h4 className="font-heading font-bold text-sm text-dark mb-1 line-clamp-1">{product.name}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed h-8">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <button 
                      onClick={() => addItem(product)}
                      className="bg-dark hover:bg-primary text-white flex items-center justify-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm"
                    >
                      إضافة <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                    <div className="text-left flex flex-col" dir="ltr">
                      <span className="font-heading font-bold text-dark text-sm">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white shadow-md rounded-full p-2 text-gray-400 hover:text-dark transition-colors border border-gray-100 hidden md:flex">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Little Bite About Us */}
        <section className="pt-8 pb-12">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-6 h-6 text-dark" />
            <h2 className="font-heading text-2xl font-bold text-dark">عن متجر أوتار</h2>
          </div>
          
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center min-h-[300px]">
            <div className="flex-1 z-10 mb-8 md:mb-0 relative text-right md:pr-12">
              <h3 className="font-medium text-gray-600 mb-2">استمتع بالعزف، في أي وقت، في أي مكان</h3>
              <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.2]">
                آلات موسيقية <br/> <span className="text-primary">عالمية الجودة</span>
              </h2>
            </div>
            <div className="w-full md:w-1/2 relative h-64 md:h-full">
              <img 
                src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop" 
                alt="Musician" 
                className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function PromoCard({ title, bgClass, imgSrc, textColor = "text-white" }: { title: string, bgClass: string, imgSrc: string, textColor?: string }) {
  return (
    <div className={`rounded-3xl p-6 relative overflow-hidden h-[240px] group cursor-pointer ${bgClass}`}>
      <h3 className={`font-heading font-bold text-2xl leading-tight max-w-[75%] relative z-10 ${textColor}`}>
        {title}
      </h3>
      
      <div className="absolute -bottom-4 left-[-10%] w-[120%] h-[120%] object-contain origin-bottom-left group-hover:scale-105 transition-transform duration-500 transform -scale-x-100">
        <img 
          src={imgSrc} 
          alt={title} 
          className="w-full h-full object-cover rounded-full mix-blend-luminosity opacity-40 group-hover:opacity-60 transition-opacity"
          referrerPolicy="no-referrer"
        />
        {/* Colorful image overlay */}
        <img 
          src={imgSrc} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-contain scale-75 translate-x-12 translate-y-8 drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className={`absolute bottom-6 right-6 text-xs font-bold flex items-center gap-1 ${textColor} opacity-90 group-hover:opacity-100`}>
        تسوق الآن <ChevronLeft className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}
