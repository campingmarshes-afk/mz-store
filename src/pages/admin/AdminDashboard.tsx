import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const { products, orders } = useData();
  const { user } = useAuth();

  const filteredOrders = user?.role === 'admin' 
    ? orders 
    : orders.filter(order => order.salesRepId === user?.id);

  const totalRevenue = filteredOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { title: 'إجمالي المنتجات', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', show: user?.role === 'admin' },
    { title: 'إجمالي الطلبات', value: filteredOrders.length, icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-100', show: true },
    { title: 'إجمالي المبيعات (المكتملة)', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100', show: true },
    { title: 'معدل النمو', value: '+12.5%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100', show: user?.role === 'admin' },
  ].filter(s => s.show);

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-dark mb-8">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col justify-between ${stats.length === 2 ? 'lg:col-span-2' : ''}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <p className="text-base text-gray-500 font-bold">{stat.title}</p>
            </div>
            <div className="text-right w-full" dir="ltr">
              <h3 className="text-4xl font-sans font-black text-dark tracking-tight">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark">أحدث الطلبات</h2>
          <Link to="/admin/orders" className="text-primary font-bold text-sm hover:underline">عرض الكل</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50/50 text-gray-500 text-sm">
              <tr>
                <th className="px-8 py-5 font-bold">رقم الطلب</th>
                <th className="px-8 py-5 font-bold">العميل</th>
                {user?.role === 'admin' && <th className="px-8 py-5 font-bold">المندوب</th>}
                <th className="px-8 py-5 font-bold">التاريخ</th>
                <th className="px-8 py-5 font-bold">الحالة</th>
                <th className="px-8 py-5 font-bold">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-dark">{order.id}</td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-700">{order.customerName}</td>
                  {user?.role === 'admin' && (
                    <td className="px-8 py-5 text-sm font-medium text-gray-500">
                      {order.salesRepId === 'rep1' ? 'مندوب 1' : order.salesRepId === 'rep2' ? 'مندوب 2' : 'أونلاين'}
                    </td>
                  )}
                  <td className="px-8 py-5 text-sm font-medium text-gray-500" dir="ltr">{order.date}</td>
                  <td className="px-8 py-5">
                     <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'in-transit' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'booked' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status === 'delivered' ? 'مكتمل (Delivered)' :
                       order.status === 'in-transit' ? 'في الطريق' : 'محجوز (Booked)'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-lg font-sans font-bold text-dark" dir="ltr">${order.total.toFixed(2)}</td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={user?.role === 'admin' ? 6 : 5} className="px-8 py-12 text-center text-gray-500 font-medium">لا توجد طلبات حتى الآن</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
