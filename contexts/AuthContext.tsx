"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token 管理函数
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 从 API 获取用户信息
  const fetchUser = async () => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token 无效，清除它
        removeToken();
        setUser(null);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化时获取用户信息
  useEffect(() => {
    fetchUser();
  }, []);

  // 注册功能
  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        // 保存 token 和用户信息
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || '注册失败' };
      }
    } catch (error) {
      console.error('注册错误:', error);
      return { success: false, error: '网络错误，请稍后重试' };
    }
  };

  // 登录功能
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 保存 token 和用户信息
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || '登录失败' };
      }
    } catch (error) {
      console.error('登录错误:', error);
      return { success: false, error: '网络错误，请稍后重试' };
    }
  };

  // 登出功能
  const logout = () => {
    setUser(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
