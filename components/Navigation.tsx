"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
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
                  <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm text-white/70">
                      欢迎，{user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-xs md:text-sm text-white/70 hover:text-orange-300 transition-colors duration-200 px-3 py-1 border border-white/30 rounded-lg hover:border-orange-300"
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
