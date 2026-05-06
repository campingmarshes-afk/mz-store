import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, products as initialProducts } from '../data/products';

interface OrderItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'booked' | 'in-transit' | 'delivered';
  date: string;
  items: OrderItem[];
  salesRepId?: string | null;
}

interface DataContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  deductInventory: (productId: string, quantity: number) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  updateStoreName: (name: string) => void;
  getAvailableStock: (productId: string) => number;
  storeName: string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockOrders: Order[] = [
  { id: 'ORD-001', customerName: 'أحمد محمود', total: 3500.00, status: 'delivered', date: '2023-10-25', items: [{ productId: 'obj-001', quantity: 1}], salesRepId: 'rep1' },
  { id: 'ORD-002', customerName: 'سارة خالد', total: 320.00, status: 'in-transit', date: '2023-10-26', items: [{ productId: 'obj-002', quantity: 1}], salesRepId: 'rep2' },
  { id: 'ORD-003', customerName: 'محمد علي', total: 1130.00, status: 'booked', date: '2023-10-27', items: [{ productId: 'obj-005', quantity: 1}, {productId: 'obj-004', quantity: 1}], salesRepId: null },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('store_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('store_orders');
    return saved ? JSON.parse(saved) : mockOrders;
  });

  const [storeName, setStoreName] = useState(() => {
    return localStorage.getItem('store_name') || 'متجر الآلات الموسيقية';
  });

  useEffect(() => {
    localStorage.setItem('store_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('store_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('store_name', storeName);
  }, [storeName]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `obj-${Math.random().toString(36).substring(2, 9)}`,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  const deductInventory = (productId: string, quantity: number) => {
    setProducts((prev) => prev.map(p => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, (p.stock || 0) - quantity) };
      }
      return p;
    }));
  };

  const addOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
    };
    setOrders((prev) => [newOrder, ...prev]);
    // NOTE: "Inventory Logic: When an order is placed, the system will reserve the instrument...
    // The final permanent deduction ... will trigger automatically when the admin manually changes the order status to "Delivered."
    // In our context, we don't strictly deduct stock on "addOrder" unless it's booked. But wait, if it's booked, maybe we just don't touch stock until "Delivered".
    // Alternatively, if we just rely on "stock", we should probably not subtract here, but we will subtract when updateOrderStatus sets to 'delivered'.
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => {
      const order = prev.find(o => o.id === id);
      if (order && order.status !== 'delivered' && status === 'delivered') {
        // Automatically deduct inventory when order status hits "Delivered"
        order.items.forEach(item => {
          deductInventory(item.productId, item.quantity);
        });
      }
      return prev.map(o => o.id === id ? { ...o, status } : o);
    });
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter(o => o.id !== id));
  };

  const updateStoreName = (name: string) => {
    setStoreName(name);
  };

  const getAvailableStock = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    
    let reservedQuantity = 0;
    orders.forEach(order => {
      if (order.status === 'booked' || order.status === 'in-transit') {
        const item = order.items.find(i => i.productId === productId);
        if (item) reservedQuantity += item.quantity;
      }
    });
    
    return Math.max(0, (product.stock || 0) - reservedQuantity);
  };

  return (
    <DataContext.Provider value={{ 
      products, addProduct, updateProduct, deleteProduct, deductInventory,
      orders, addOrder, updateOrderStatus, deleteOrder,
      storeName, updateStoreName, getAvailableStock
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
