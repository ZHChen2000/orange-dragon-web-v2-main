"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface NavigationProps {
  showSidebar?: boolean;
  onSidebarToggle?: (open: boolean) => void;
}

export default function Navigation({ showSidebar = false, onSidebarToggle }: NavigationProps) {
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
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/#about" 
              className="px-3 py-2 font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              公司简介
            </Link>
            <Link 
              href="/#team" 
              className="px-3 py-2 font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              核心团队
            </Link>
            <Link 
              href="/#business" 
              className="px-3 py-2 font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              主营业务
            </Link>
            <Link 
              href="/#contact" 
              className="px-3 py-2 font-medium text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              联系我们
            </Link>
          </div>
          {onSidebarToggle && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => onSidebarToggle(!showSidebar)}
                className="p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
              >
                ☰
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 