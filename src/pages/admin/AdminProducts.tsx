import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { Product } from '../../data/products';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: [''],
    features: [''],
    stock: 0,
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      images: [''],
      features: [''],
      stock: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      images: [...product.images],
      features: [...product.features],
      stock: product.stock || 0,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      addProduct(formData);
    }
    closeModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-dark">المنتجات</h1>
        <button 
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          إضافة منتج
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50 text-gray-500 text-sm">
              <tr>
                <th className="px-8 py-5 font-bold">المنتج</th>
                <th className="px-8 py-5 font-bold">القسم</th>
                <th className="px-8 py-5 font-bold">السعر</th>
                <th className="px-8 py-5 font-bold">المخزون (الفعلي)</th>
                <th className="px-8 py-5 font-bold text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                 <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 flex items-center gap-4">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-14 h-14 rounded-xl object-cover bg-gray-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-bold text-dark text-base mb-1">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-600">
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold">{product.category}</span>
                  </td>
                  <td className="px-8 py-5 text-lg font-sans font-bold text-dark" dir="ltr">${product.price.toFixed(2)}</td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-600">
                    {product.stock || 0}
                  </td>
                  <td className="px-8 py-5 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => openEditModal(product)}
                      className="text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition-colors"
                      title="تعديل"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                 <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-500 font-medium">لا توجد منتجات، قم بإضافة منتج جديد.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-dark">{editingId ? 'تعديل منتج' : 'إضافة منتج جديد'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-dark">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
                  <input 
                    required
                    type="text" 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">السعر ($)</label>
                  <input 
                    required
                    type="number" 
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المخزون المتوفر</label>
                  <input 
                    required
                    type="number" 
                    min="0"
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                <div className="flex gap-2">
                  <input 
                    required
                    type="url" 
                    value={formData.images[0]}
                    onChange={e => setFormData({...formData, images: [e.target.value]})}
                    className="flex-1 border border-gray-300 rounded-lg p-2 text-left focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    dir="ltr"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button 
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors"
              >
                حفظ المنتج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
