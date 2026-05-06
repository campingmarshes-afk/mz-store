import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2 } from 'lucide-react';

export function AdminDailySales() {
  const { products, deductInventory } = useData();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || quantity <= 0) return;

    deductInventory(selectedProductId, quantity);
    
    const product = products.find(p => p.id === selectedProductId);
    setSuccessMessage(`تم بنجاح خصم ${quantity} من "${product?.name}"`);
    
    // Reset form
    setSelectedProductId('');
    setQuantity(1);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-heading font-bold text-dark mb-8">مزامنة المبيعات اليومية (المعرض)</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <p className="text-gray-500 mb-8 font-medium">
          هذه الصفحة مخصصة للموظفين لخصم المخزون المباع محلياً في المعرض بنهاية اليوم لتحديث الموقع الإلكتروني. 
          الخصم يتم مباشرة بدون دمج العميل أو إيصال الطلب.
        </p>

        {successMessage && (
          <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 font-medium">
             <CheckCircle2 className="w-5 h-5 text-green-600" />
             {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">اختر المنتج</label>
            <select
              required
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-colors bg-gray-50 text-sm font-medium"
            >
              <option value="" disabled>-- ابحث أو اختر من القائمة --</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (المتوفر: {product.stock || 0})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">الكمية المباعة</label>
            <input
              required
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-colors bg-gray-50 text-sm font-medium"
            />
          </div>

          <button 
            type="submit"
            className="bg-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-primary transition-colors text-sm"
          >
            تأكيد وخصم المخزون
          </button>
        </form>
      </div>
    </div>
  );
}
