import { createContext, useContext, useState, useEffect } from 'react';
import {
  getToken,
  setToken as saveToken,
  getStoredUser,
  setStoredUser,
  clearAuthStorage,
  loginUser,
} from '../services/api';
import { LOGGED_IN_USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);

  // Synchronize auth state on component mount / storage events
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser();
    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Attempt Real JWT Authentication from ASP.NET Core Backend
      const data = await loginUser(email, password);

      if (data && data.token) {
        // Store JWT token and user info into localStorage
        saveToken(data.token);
        setStoredUser(data.user);

        setTokenState(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      }

      throw new Error('No token returned from server');
    } catch (err) {
      console.warn('Backend login failed, checking fallback credentials:', err.message);

      // Fallback for offline/mock demo testing if server is unreachable
      const mockMatch = Object.values(LOGGED_IN_USERS).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (mockMatch && (err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        // Generate a synthetic client demo token
        const fakeToken = `demo_jwt_header.${btoa(JSON.stringify({ sub: mockMatch.email, role: mockMatch.role }))}.demo_signature`;
        saveToken(fakeToken);
        setStoredUser(mockMatch);
        setTokenState(fakeToken);
        setUser(mockMatch);
        return { success: true, user: mockMatch, isOfflineDemo: true };
      }

      return { success: false, message: err.message || 'Invalid email or password' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthStorage();
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(token && user), login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
