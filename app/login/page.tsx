"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // 如果已登录，重定向到首页
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('请填写所有字段');
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || '邮箱或密码错误');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">登录账号</h1>
              <p className="text-gray-600">欢迎回来！请登录您的账号</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="请输入您的密码"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                还没有账号？{' '}
                <Link href="/register" className="text-orange-600 hover:text-orange-700 font-semibold">
                  立即注册
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
                ← 返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

