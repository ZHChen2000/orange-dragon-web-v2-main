"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  loginCount: number;
  lastLoginAt?: string;
  createdAt: string;
  membershipType?: 'none' | 'monthly' | 'yearly';
  membershipStatus?: 'none' | 'active' | 'expired';
  membershipExpiresAt?: string;
}

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 如果未登录，重定向到登录页
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    // 获取用户详细信息
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router]);

  // 生成默认头像（基于用户名首字母）
  const getDefaultAvatar = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const colors = [
      'bg-orange-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
    ];
    const colorIndex = firstLetter.charCodeAt(0) % colors.length;
    return (
      <div className={`w-32 h-32 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-4xl font-bold`}>
        {firstLetter}
      </div>
    );
  };

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return '从未登录';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">个人中心</h1>
          <p className="text-gray-600">查看和管理您的账户信息</p>
        </div>

        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 头像区域 */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 text-center">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="flex justify-center">
                {getDefaultAvatar(profile.name)}
              </div>
            )}
            <h2 className="text-2xl font-bold text-white mt-4">{profile.name}</h2>
            <p className="text-orange-100 mt-2">{profile.email}</p>
          </div>

          {/* 详细信息 */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 用户名 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">👤</span>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase">用户名</h3>
                </div>
                <p className="text-xl font-bold text-gray-900">{profile.name}</p>
              </div>

              {/* 邮箱 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📧</span>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase">邮箱地址</h3>
                </div>
                <p className="text-xl font-bold text-gray-900 break-all">{profile.email}</p>
              </div>

              {/* 注册时间 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📅</span>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase">注册时间</h3>
                </div>
                <p className="text-lg font-semibold text-gray-900">{formatDate(profile.createdAt)}</p>
              </div>

              {/* 登录次数 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔢</span>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase">登录次数</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{profile.loginCount}</p>
              </div>

              {/* 最后登录时间 */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🕐</span>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase">最后登录时间</h3>
                </div>
                <p className="text-lg font-semibold text-gray-900">{formatDate(profile.lastLoginAt)}</p>
              </div>

              {/* 会员状态 */}
              <div className={`p-6 rounded-xl md:col-span-2 ${
                profile.membershipStatus === 'active' 
                  ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{profile.membershipStatus === 'active' ? '⭐' : '👤'}</span>
                      <h3 className="text-sm font-semibold uppercase">
                        {profile.membershipStatus === 'active' ? '会员状态' : '账户类型'}
                      </h3>
                    </div>
                    {profile.membershipStatus === 'active' ? (
                      <div>
                        <p className="text-xl font-bold mb-1">
                          {profile.membershipType === 'monthly' ? '月付会员' : '年付会员'}
                        </p>
                        <p className="text-sm opacity-90">
                          到期时间：{formatDate(profile.membershipExpiresAt)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-lg font-semibold">普通用户</p>
                    )}
                  </div>
                  {profile.membershipStatus === 'active' ? (
                    <Link
                      href="/membership"
                      className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-md"
                    >
                      续费会员
                    </Link>
                  ) : (
                    <Link
                      href="/membership"
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      开通会员
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/downloads"
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 text-center"
              >
                📥 资料下载
              </Link>
              <Link
                href="/membership"
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center ${
                  profile.membershipStatus === 'active'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600'
                }`}
              >
                {profile.membershipStatus === 'active' ? '🔄 续费会员' : '⭐ 开通会员'}
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-center"
              >
                🏠 返回首页
              </Link>
            </div>
          </div>
        </div>

        {/* 统计信息卡片 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-gray-600 text-sm">已下载资料</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-gray-600 text-sm">账户等级</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">
              {profile.membershipStatus === 'active' 
                ? (profile.membershipType === 'monthly' ? '月付会员' : '年付会员')
                : '普通用户'}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-gray-600 text-sm">账户状态</p>
            <p className="text-2xl font-bold text-green-600 mt-2">正常</p>
          </div>
        </div>
      </div>
    </div>
  );
}

