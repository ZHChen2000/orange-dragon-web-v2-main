"use client";

import React from 'react';
import Link from 'next/link';

export default function Navigation() {
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
          
          {/* 右侧：快速访问链接 */}
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
          </div>
        </div>
      </div>
    </nav>
  );
}
