"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-600 flex items-center gap-2 hover:text-orange-700 transition-colors duration-200">
              <span className="text-3xl">🐉</span>
              南京橙龙科技有限公司
            </Link>
          </div>
          <div className="flex items-center">
            {/* 下拉菜单按钮 */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg transition-all duration-200 font-medium group relative"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>快速访问</span>
                {/* 点击小手图标 - 带动画效果 */}
                <span className="text-lg animate-bounce group-hover:animate-none group-hover:scale-110 transition-transform duration-200">👆</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* 下拉菜单 */}
              {dropdownOpen && (
                <>
                  {/* 点击外部关闭菜单的遮罩 */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setDropdownOpen(false)}
                  />
                  {/* 菜单内容 */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl z-50 py-2 overflow-hidden">
                    <Link 
                      href="/#business-gallery"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                    >
                      业务展示
                    </Link>
                    <Link 
                      href="/#publishers"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                    >
                      合作出版社
                    </Link>
                    <Link 
                      href="/#about"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                    >
                      公司简介
                    </Link>
                    <Link 
                      href="/#team"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                    >
                      核心团队
                    </Link>
                    <Link 
                      href="/#business"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                    >
                      主营业务
                    </Link>
                    <Link 
                      href="/#contact"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                    >
                      联系我们
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 