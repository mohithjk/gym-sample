import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../lib/db';
import { db } from '../lib/db';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name?: string, isSignup?: boolean) => Promise<{ error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('gymUser');
    if (token && stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const login = async (email: string, password: string, name = 'User', isSignup = false): Promise<{ error?: string }> => {
    try {
      const endpoint = isSignup ? '/api/register' : '/api/login';
      const body = isSignup ? { name, email, password } : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) return { error: data.error || 'Something went wrong' };

      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('gymUser', JSON.stringify(data.user));
      return {};
    } catch {
      return { error: 'Could not reach the server. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('gymUser');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('gymUser', JSON.stringify(updated));
    // Persist to client-side DB
    db.saveUser(updated);
    // Persist hasPaid/tier to MongoDB via server so it survives re-login
    if ('hasPaid' in updates || 'tier' in updates) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`/api/users/${updated.id}/payment`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ hasPaid: updated.hasPaid, tier: updated.tier }),
        }).catch(console.error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
