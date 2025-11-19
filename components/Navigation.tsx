"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface MembershipInfo {
  type?: 'monthly' | 'yearly';
  status?: string;
  expiresAt?: string;
}

export default function Navigation() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [membershipInfo, setMembershipInfo] = useState<MembershipInfo | null>(null);

  // 获取会员详细信息
  useEffect(() => {
    if (user) {
      const fetchMembershipInfo = async () => {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const response = await fetch('/api/membership/status', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              setMembershipInfo(data.membership);
            }
          }
        } catch (error) {
          console.error('获取会员信息失败:', error);
        }
      };
      fetchMembershipInfo();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <nav className="bg-gradient-to-r from-[#1a1a2e]/95 via-[#16213e]/95 to-[#0f3460]/95 backdrop-blur-sm shadow-lg sticky top-0 z-30 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-16 py-3 md:py-0">
          {/* 左侧：Logo */}
          <div className="flex items-center mb-3 md:mb-0">
            <Link href="/" className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 hover:text-orange-300 transition-colors duration-200">
              <span className="text-2xl md:text-3xl">🐉</span>
              <span className="hidden sm:inline">南京橙龙科技有限公司</span>
              <span className="sm:hidden">橙龙科技</span>
            </Link>
          </div>
          
          {/* 右侧：快速访问链接和登录/登出 */}
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-x-4 gap-y-2">
            <Link 
              href="/#business-gallery"
              className="text-xs md:text-sm text-white/70 hover:text-cyan-300 transition-colors duration-200"
            >
              业务展示
            </Link>
            <span className="text-white/30 hidden md:inline">·</span>
            <Link 
              href="/#publishers"
              className="text-xs md:text-sm text-white/70 hover:text-cyan-300 transition-colors duration-200"
            >
              合作出版社
            </Link>
            <span className="text-white/30 hidden md:inline">·</span>
            <Link 
              href="/#about"
              className="text-xs md:text-sm text-white/70 hover:text-cyan-300 transition-colors duration-200"
            >
              公司简介
            </Link>
            <span className="text-white/30 hidden md:inline">·</span>
            <Link 
              href="/#team"
              className="text-xs md:text-sm text-white/70 hover:text-cyan-300 transition-colors duration-200"
            >
              核心团队
            </Link>
            <span className="text-white/30 hidden md:inline">·</span>
            <Link 
              href="/#business"
              className="text-xs md:text-sm text-white/70 hover:text-cyan-300 transition-colors duration-200"
            >
              主营业务
            </Link>
            <span className="text-white/30 hidden md:inline">·</span>
            <Link 
              href="/#contact"
              className="text-xs md:text-sm text-white/70 hover:text-cyan-300 transition-colors duration-200"
            >
              联系我们
            </Link>
            
            {/* 登录/登出按钮 */}
            {!isLoading && (
              <>
                <span className="text-white/30 hidden md:inline">·</span>
                {user ? (
                  <div className="flex items-center gap-3 relative">
                    {/* 用户信息卡片 - 可点击 */}
                    <div
                      className="relative"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <Link
                        href="/profile"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-orange-400/50 transition-all duration-200 cursor-pointer backdrop-blur-sm"
                      >
                        {/* 用户头像/图标 */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* 用户名和会员标识 */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm md:text-base font-semibold text-white group-hover:text-orange-300 transition-colors">
                            {user.name}
                          </span>
                          {user.membershipStatus === 'active' && (
                            <span className="text-orange-400 text-lg animate-pulse" title="会员">⭐</span>
                          )}
                        </div>
                        
                        {/* 下拉箭头 */}
                        <svg 
                          className="w-4 h-4 text-white/70 group-hover:text-orange-300 transition-colors" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>

                      {/* 悬停提示框 */}
                      {showTooltip && (
                        <>
                          {/* 桥接区域：填充用户名区域和悬浮窗之间的间隙 */}
                          <div 
                            className="absolute right-0 top-full w-72 h-2 z-50"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          />
                          <div 
                            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 animate-fade-in-up transition-all duration-150"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                          {/* 用户基本信息 */}
                          <div className="space-y-3">
                            {/* 用户头像和名称 */}
                            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                              </div>
                            </div>

                            {/* 会员状态 */}
                            {membershipInfo?.status === 'active' ? (
                              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-orange-500 text-lg">⭐</span>
                                  <span className="font-semibold text-gray-900">
                                    {membershipInfo.type === 'monthly' ? '月付会员' : '年付会员'}
                                  </span>
                                </div>
                                {membershipInfo.expiresAt && (
                                  <p className="text-xs text-gray-600">
                                    到期时间：{formatDate(membershipInfo.expiresAt)}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-400">👤</span>
                                  <span className="text-sm text-gray-600">普通用户</span>
                                </div>
                                <Link
                                  href="/membership"
                                  className="mt-2 block text-xs text-orange-600 hover:text-orange-700 font-semibold"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  立即开通会员 →
                                </Link>
                              </div>
                            )}

                            {/* 快速操作 */}
                            <div className="pt-2 border-t border-gray-200">
                              <Link
                                href="/profile"
                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                👤 查看个人中心
                              </Link>
                              {membershipInfo?.status !== 'active' && (
                                <Link
                                  href="/membership"
                                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  ⭐ 开通会员
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                        </>
                      )}
                    </div>

                    {/* 登出按钮 */}
                    <button
                      onClick={handleLogout}
                      className="text-xs md:text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 px-3 py-2 border border-white/30 rounded-lg hover:border-orange-400/50"
                    >
                      登出
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="text-xs md:text-sm text-white/70 hover:text-orange-300 transition-colors duration-200 px-3 py-1 border border-white/30 rounded-lg hover:border-orange-300"
                    >
                      登录
                    </Link>
                    <Link
                      href="/register"
                      className="text-xs md:text-sm bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                    >
                      注册
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
