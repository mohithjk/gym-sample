import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../lib/db';
import { db } from '../lib/db';

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('currentUserId');
    if (storedUserId) {
      const users = db.getUsers();
      const foundUser = users.find(u => u.id === storedUserId);
      if (foundUser) setUser(foundUser);
    }
  }, []);

  const login = (email: string, name: string = 'User') => {
    const users = db.getUsers();
    let foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      // Auto-signup for demo purposes
      foundUser = {
        id: Date.now().toString(),
        name,
        email,
        role: email === 'admin@ironcore.com' ? 'admin' : 'user',
        hasPaid: email === 'admin@ironcore.com'
      };
      db.saveUser(foundUser);
    }
    
    setUser(foundUser);
    localStorage.setItem('currentUserId', foundUser.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUserId');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    db.saveUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
