import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'sales_rep';

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loginAs: (role: Role, id: string, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'admin-1',
    name: 'Admin User',
    role: 'admin'
  }); // Default to admin for now

  const loginAs = (role: Role, id: string, name: string) => {
    setUser({ id, name, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
