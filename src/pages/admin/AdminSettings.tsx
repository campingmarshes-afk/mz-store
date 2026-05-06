import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

export function AdminSettings() {
  const { storeName, updateStoreName } = useData();
  const [name, setName] = useState(storeName);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreName(name);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading font-bold text-dark mb-8">إعدادات المتجر</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم المتجر</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="أدخل اسم المتجر"
            />
            <p className="text-xs text-gray-500 mt-2">سيتم عرض هذا الاسم في أعلى المتجر وفي لوحة التحكم.</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors"
            >
              حفظ التغييرات
            </button>
            {saved && <span className="text-sm font-medium text-green-600">تم الحفظ بنجاح!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
