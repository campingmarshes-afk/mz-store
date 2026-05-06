import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Trash2 } from 'lucide-react';

export function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useData();
  const { user } = useAuth();

  const filteredOrders = user?.role === 'admin' 
    ? orders 
    : orders.filter(order => order.salesRepId === user?.id);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-dark mb-8">الطلبات</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50 text-gray-500 text-sm">
              <tr>
                <th className="px-8 py-5 font-bold">رقم الطلب</th>
                <th className="px-8 py-5 font-bold">العميل</th>
                {user?.role === 'admin' && <th className="px-8 py-5 font-bold">المندوب</th>}
                <th className="px-8 py-5 font-bold">التاريخ</th>
                <th className="px-8 py-5 font-bold">الإجمالي</th>
                <th className="px-8 py-5 font-bold">الحالة</th>
                <th className="px-8 py-5 font-bold text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-dark">{order.id}</td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-700">{order.customerName}</td>
                  {user?.role === 'admin' && (
                    <td className="px-8 py-5 text-sm font-medium text-gray-500">
                      {order.salesRepId === 'rep1' ? 'مندوب 1' : order.salesRepId === 'rep2' ? 'مندوب 2' : 'أونلاين'}
                    </td>
                  )}
                  <td className="px-8 py-5 text-sm font-medium text-gray-500" dir="ltr">{order.date}</td>
                  <td className="px-8 py-5 text-lg font-sans font-bold text-dark" dir="ltr">${order.total.toFixed(2)}</td>
                  <td className="px-8 py-5">
                     <select
                      value={order.status}
                      disabled={user?.role !== 'admin' && order.status === 'delivered'} 
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className={`text-sm font-bold rounded-full px-4 py-2 outline-none border border-transparent focus:border-gray-300 transition-colors ${
                        user?.role !== 'admin' && order.status === 'delivered' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                      } ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'booked' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <option value="booked">محجوز (Booked)</option>
                      <option value="in-transit">في الطريق</option>
                      <option value="delivered">مكتمل (Delivered)</option>
                    </select>
                  </td>
                  <td className="px-8 py-5 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
                           deleteOrder(order.id);
                        }
                      }}
                      className={`${user?.role === 'admin' ? 'text-red-600 hover:bg-red-50' : 'text-gray-300 cursor-not-allowed'} p-2.5 rounded-xl transition-colors`}
                      title="حذف"
                      disabled={user?.role !== 'admin'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={user?.role === 'admin' ? 7 : 6} className="px-8 py-12 text-center text-gray-500 font-medium">لا توجد طلبات حتى الآن</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
