import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, FileDigit } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth, Role } from '../../context/AuthContext';

export function AdminLayout() {
  const location = useLocation();
  const { storeName } = useData();
  const { user, loginAs } = useAuth();

  const navItems = [
    { name: 'لوحة التحكم', path: '/admin', icon: LayoutDashboard },
    { name: 'المنتجات', path: '/admin/products', icon: Package },
    { name: 'الطلبات', path: '/admin/orders', icon: ShoppingCart },
    { name: 'المبيعات اليومية', path: '/admin/sales', icon: FileDigit },
    { name: 'الإعدادات', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white flex flex-col hidden md:flex">
        <div className="p-6">
          <Link to="/" className="text-2xl font-heading font-black text-white hover:text-primary transition-colors block">
            {storeName} <span className="text-primary text-sm tracking-widest block font-sans">الإدارة</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-primary text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            العودة للمتجر
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mock auth */}
        <div className="bg-white border-b border-gray-200 px-8 py-3 flex justify-between items-center hidden md:flex">
          <div className="text-sm font-medium text-gray-500">
            مرحباً بك، <span className="font-bold text-dark">{user?.name}</span>
          </div>
          <div>
            <select 
              value={user?.role}
              onChange={(e) => {
                const role = e.target.value as Role;
                if (role === 'admin') {
                  loginAs('admin', 'admin-1', 'المدير');
                } else {
                  loginAs('sales_rep', 'rep1', 'مندوب المبيعات 1');
                }
              }}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:border-primary outline-none"
            >
              <option value="admin">صلاحية مدير عام</option>
              <option value="sales_rep">صلاحية مندوب مبيعات</option>
            </select>
          </div>
        </div>

        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between md:hidden">
          <span className="font-heading font-bold text-lg text-dark">لوحة التحكم</span>
          <select 
            value={user?.role}
            onChange={(e) => {
              const role = e.target.value as Role;
              if (role === 'admin') {
                loginAs('admin', 'admin-1', 'المدير');
              } else {
                loginAs('sales_rep', 'rep1', 'مندوب 1');
              }
            }}
            className="text-xs border border-gray-200 rounded px-2 py-1 outline-none"
          >
            <option value="admin">مدير</option>
            <option value="sales_rep">مندوب</option>
          </select>
        </header>

        {/* Mobile Nav */}
        <nav className="bg-white border-b border-gray-200 flex overflow-x-auto md:hidden no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
               <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors border-b-2 ${
                  isActive ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-500'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
