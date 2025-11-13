"use client";

import React, { useState, useEffect, useRef } from 'react';
import ContactSection from '../components/ContactSection';
import Navigation from '../components/Navigation';

// 自定义 hook 用于检查是否在客户端
function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}

// 数字计数动画组件
function AnimatedCounter({ target, suffix = '', duration = 2000, className = '' }: { 
  target: string | number; 
  suffix?: string; 
  duration?: number; 
  className?: string; 
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = parseInt(String(target));

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数让动画更自然
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  return (
    <span ref={elementRef} className={className}>
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    setIsVisible(true);
    
    // 只在客户端执行
    if (!isClient) return;
    
    // 检测是否为移动设备
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                             window.innerWidth <= 768 || 
                             ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
      return isMobileDevice;
    };
    
    const mobile = checkMobile();
    
    // 鼠标移动效果 - 仅在非移动设备上启用
    let mouseMoveThrottle: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mobile) return; // 移动端禁用
      
      // 节流处理，减少更新频率
      if (mouseMoveThrottle) return;
      mouseMoveThrottle = window.requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        mouseMoveThrottle = null;
      });
    };

    // 滚动效果 - 添加节流优化
    let scrollThrottle: number | null = null;
    const handleScroll = () => {
      if (scrollThrottle) return;
      scrollThrottle = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        
        // 检测当前活动区域 - 仅在桌面端执行
        if (!mobile) {
          const sections = ['about', 'team', 'business', 'contact'];
          const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });
          setActiveSection(currentSection || '');
        }
        
        scrollThrottle = null;
      });
    };

    // 窗口大小变化时重新检测
    const handleResize = () => {
      checkMobile();
    };

    if (!mobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      if (mouseMoveThrottle) {
        window.cancelAnimationFrame(mouseMoveThrottle);
      }
      if (scrollThrottle) {
        window.cancelAnimationFrame(scrollThrottle);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  // 滚动到关于我们部分
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 联系我们的模态框
  const ContactModal = () => {
    if (!showContactModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
          <button
            onClick={() => setShowContactModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-orange-600 mb-2">联系我们</h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <span className="text-2xl">📍</span>
              <div>
                <div className="font-semibold text-gray-800">公司地址</div>
                <div className="text-sm text-gray-600">江苏省南京市秦淮区光华路街道光华路127号3层304F室</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-2xl">📞</span>
              <div>
                <div className="font-semibold text-gray-800">联系电话</div>
                <a 
                  href="tel:+8613201301067" 
                  className="text-sm text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all duration-200 hover:scale-105 inline-block"
                >
                  +86 13201301067
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-2xl">📧</span>
              <div>
                <div className="font-semibold text-gray-800">电子邮箱</div>
                <a 
                  href="mailto:zhchen2000@foxmail.com" 
                  className="text-sm text-green-600 hover:text-green-800 underline hover:no-underline transition-all duration-200 hover:scale-105 inline-block"
                >
                  zhchen2000@foxmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-2xl">🌐</span>
              <div>
                <div className="font-semibold text-gray-800">官方网站</div>
                <a 
                  href="https://www.orandrag.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:text-purple-800 underline hover:no-underline transition-all duration-200 hover:scale-105 inline-block"
                >
                  https://www.orandrag.com/
                  <span className="ml-1 text-xs">↗</span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <span className="text-2xl">⏰</span>
              <div>
                <div className="font-semibold text-gray-800">工作时间</div>
                <div className="text-sm text-gray-600">周一至周五 9:00-17:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen relative">

      {/* Sidebar with integrated toggle button */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 flex flex-col shadow-2xl`}
      >
        {/* Sidebar Header with Toggle Button */}
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-orange-400 text-xl">🐉</span>
            <h2 className="text-xl font-semibold">公司导航</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-200 hover:scale-110"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
          <a href="/campus-recruitment" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:translate-x-2">
            <span className="text-lg">🎓</span>
            <span>校园招聘</span>
          </a>
          <a href="/team-building" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:translate-x-2">
            <span className="text-lg">👥</span>
            <span>公司团建</span>
          </a>
          <a href="/partners" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:translate-x-2">
            <span className="text-lg">🤝</span>
            <span>公司合作伙伴</span>
          </a>
          <a href="/financial-reports" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:translate-x-2">
            <span className="text-lg">📊</span>
            <span>公司财报</span>
          </a>
          <a href="/downloads" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:translate-x-2">
            <span className="text-lg">📁</span>
            <span>资料下载</span>
          </a>
        </nav>
      </div>

      {/* Floating Toggle Button (when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-1/2 left-0 z-50 -translate-y-1/2 w-6 h-20 bg-gray-700 text-gray-300 shadow-lg hover:bg-gray-600 hover:text-white transition-all duration-300 transform hover:translate-x-1 border-r border-gray-600 rounded-r-md"
          aria-label="Open sidebar"
        >
          <div className="flex flex-col items-center justify-center h-full gap-1">
            <span className="text-xs">☰</span>
            <span className="text-xs rotate-90 whitespace-nowrap tracking-wider">导航</span>
          </div>
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out`}>
        {/* 导航栏 */}
        <Navigation showSidebar={sidebarOpen} onSidebarToggle={setSidebarOpen} />

        {/* 英雄区域 */}
        <section className="bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 text-white py-32 relative overflow-hidden shadow-2xl">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {/* 动态背景装饰 - 移动端简化 */}
            <div 
              className="hidden md:block absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-glow"
              style={{
                transform: isClient && !isMobile ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)` : 'translate(0px, 0px)'
              }}
            ></div>
            <div 
              className="hidden md:block absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse-glow"
              style={{
                transform: isClient && !isMobile ? `translate(${(mousePosition.x - window.innerWidth / 2) * -0.01}px, ${(mousePosition.y - window.innerHeight / 2) * -0.01}px)` : 'translate(0px, 0px)'
              }}
            ></div>
            <div 
              className="hidden lg:block absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse-glow"
              style={{
                transform: isClient && !isMobile ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.015}px, ${(mousePosition.y - window.innerHeight / 2) * 0.015}px)` : 'translate(0px, 0px)'
              }}
            ></div>
            
            {/* 浮动粒子效果 - 移动端减少数量 */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-mobile md:animate-float" style={{animationDelay: '0s'}}></div>
            <div className="hidden md:block absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
            <div className="hidden lg:block absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/35 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="hidden lg:block absolute top-2/3 right-1/3 w-1 h-1 bg-white/45 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
            
            {/* 动态装饰元素 - 移动端禁用 */}
            <div className="hidden md:block absolute top-1/4 right-1/4 w-16 h-16 border-2 border-white/20 rounded-full animate-rotate-slow"></div>
            <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-12 h-12 border border-white/30 rounded-full animate-rotate-slow" style={{animationDirection: 'reverse'}}></div>
            <div className="hidden md:block absolute top-3/4 right-1/3 w-8 h-8 bg-white/20 rounded-full animate-wave"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-responsive font-extrabold mb-6 drop-shadow-lg tracking-wide text-white animate-fade-in-up">
                南京橙龙科技有限公司
              </h2>
              <p className="text-2xl md:text-3xl mb-12 drop-shadow-lg font-medium text-white/90 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                专注于科技推广、出版与教育服务的创新型企业
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <button 
                  onClick={scrollToAbout}
                  className="group bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden btn-glow animate-pulse-glow"
                >
                  <span className="relative z-10">了解更多</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 relative overflow-hidden btn-glow"
                >
                  <span className="relative z-10">联系我们</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="py-16 bg-white relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-yellow-50/30"></div>
          <div className="hidden md:block absolute top-0 left-1/4 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl animate-float"></div>
          <div className="hidden md:block absolute bottom-0 right-1/4 w-40 h-40 bg-yellow-200/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* 出版书籍 */}
                <div className="text-center group relative stats-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl transform scale-0 group-hover:scale-100 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-orange-600/10 rounded-2xl animate-pulse-glow-subtle"></div>
                  <div className="relative z-10 p-6 transform group-hover:scale-105 transition-all duration-500 ease-out">
                    <div className="text-4xl font-bold text-orange-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300 ease-out">
                      <AnimatedCounter target="100" suffix="+" className="inline-block" />
                    </div>
                    <div className="text-gray-600 font-medium group-hover:text-orange-700 transition-colors duration-300">出版书籍</div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse-glow-subtle"></div>
                  </div>
                </div>
                
                {/* 技术专利 */}
                <div className="text-center group relative stats-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl transform scale-0 group-hover:scale-100 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-2xl animate-pulse-glow-subtle" style={{animationDelay: '0.5s'}}></div>
                  <div className="relative z-10 p-6 transform group-hover:scale-105 transition-all duration-500 ease-out">
                    <div className="text-4xl font-bold text-blue-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300 ease-out">
                      <AnimatedCounter target="20" suffix="+" className="inline-block" />
                    </div>
                    <div className="text-gray-600 font-medium group-hover:text-blue-700 transition-colors duration-300">技术专利</div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse-glow-subtle" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
                
                {/* 服务客户 */}
                <div className="text-center group relative stats-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl transform scale-0 group-hover:scale-100 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-2xl animate-pulse-glow-subtle" style={{animationDelay: '1s'}}></div>
                  <div className="relative z-10 p-6 transform group-hover:scale-105 transition-all duration-500 ease-out">
                    <div className="text-4xl font-bold text-green-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300 ease-out">
                      <AnimatedCounter target="50" suffix="+" className="inline-block" />
                    </div>
                    <div className="text-gray-600 font-medium group-hover:text-green-700 transition-colors duration-300">服务客户</div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse-glow-subtle" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                
                {/* 行业经验 */}
                <div className="text-center group relative stats-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl transform scale-0 group-hover:scale-100 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-2xl animate-pulse-glow-subtle" style={{animationDelay: '1.5s'}}></div>
                  <div className="relative z-10 p-6 transform group-hover:scale-105 transition-all duration-500 ease-out">
                    <div className="text-4xl font-bold text-purple-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300 ease-out">
                      <AnimatedCounter target="5" suffix="年+" className="inline-block" />
                    </div>
                    <div className="text-gray-600 font-medium group-hover:text-purple-700 transition-colors duration-300">行业经验</div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow-subtle" style={{animationDelay: '1.5s'}}></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 合作出版社 */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="hidden md:block absolute bottom-0 right-0 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-amber-600 tracking-wide mb-4 gradient-text">合作出版社</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-4 animate-pulse-glow"></div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl p-12 hover-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-center">
                <div className="text-5xl mb-6 animate-float">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">优质出版资源，专业服务保障</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto">
                  我们依托<strong className="text-amber-600">清华大学出版社</strong>、<strong className="text-amber-600">电子工业出版社</strong>、<strong className="text-amber-600">机械工业出版社</strong>、<strong className="text-amber-600">人民邮电出版社</strong>四大出版社及行业内顶级刊物出版商，为作者和读者提供专业的出版服务。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                  <div className="text-center p-4 bg-amber-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2">🏛️</div>
                    <div className="font-semibold text-gray-800 text-sm">清华大学出版社</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2">📖</div>
                    <div className="font-semibold text-gray-800 text-sm">电子工业出版社</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2">⚙️</div>
                    <div className="font-semibold text-gray-800 text-sm">机械工业出版社</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2">📰</div>
                    <div className="font-semibold text-gray-800 text-sm">人民邮电出版社</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 公司简介 */}
        <section id="about" className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-orange-600 tracking-wide mb-4 gradient-text">关于我们</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full animate-pulse-glow"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-in-left">
                <h3 className="text-2xl font-bold text-gray-800">创新科技，引领未来</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  南京橙龙科技有限公司成立于2024年10月，注册地位于江苏省南京市秦淮区光华路街道光华路127号3层304F室，是一家以从事科技推广和应用服务业为主的中小微企业。
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  我们专注于书籍出版、专利转让、技术推广、技术服务、技术咨询、教育咨询等领域，致力于将前沿科技转化为实用的教学资源，为人才培养和产业发展贡献力量。
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-xl shadow-md hover-card border border-blue-200 group">
                    <span className="text-blue-600 text-lg group-hover:scale-110 transition-transform duration-300">👥</span>
                    <span className="text-gray-700 font-medium">专业团队</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 rounded-xl shadow-md hover-card border border-green-200 group">
                    <span className="text-green-600 text-lg group-hover:scale-110 transition-transform duration-300">🚀</span>
                    <span className="text-gray-700 font-medium">创新技术</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-3 rounded-xl shadow-md hover-card border border-purple-200 group">
                    <span className="text-purple-600 text-lg group-hover:scale-110 transition-transform duration-300">⭐</span>
                    <span className="text-gray-700 font-medium">优质服务</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl hover-card animate-slide-in-right">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-orange-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2 animate-float">📚</div>
                    <div className="font-semibold text-gray-800">书籍出版</div>
                    <div className="text-sm text-gray-600">专业教材与参考书</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2 animate-float" style={{animationDelay: '0.5s'}}>💡</div>
                    <div className="font-semibold text-gray-800">专利转让</div>
                    <div className="text-sm text-gray-600">技术成果转化</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2 animate-float" style={{animationDelay: '1s'}}>🎓</div>
                    <div className="font-semibold text-gray-800">技术推广</div>
                    <div className="text-sm text-gray-600">前沿技术普及</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl hover-card">
                    <div className="text-3xl mb-2 animate-float" style={{animationDelay: '1.5s'}}>🔧</div>
                    <div className="font-semibold text-gray-800">技术服务</div>
                    <div className="text-sm text-gray-600">专业解决方案</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 公司高管 */}
        <section id="team" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-orange-600 tracking-wide mb-4">公司创始人</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="text-6xl">👨‍💼</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-orange-700 mb-2">陈志皓 先生</h3>
                    <p className="text-gray-700 leading-relaxed">
                      陈志皓先生在大模型开发与前沿科技研究领域拥有深厚的造诣与丰富的实践经验。他在人工智能、自然语言处理及高性能计算等方向取得了显著科研成果，致力于将前沿技术转化为创新产品与教学资源，引领公司在科技创新领域不断探索前行。
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="text-6xl">👩‍💼</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-orange-700 mb-2">吴加成 女士</h3>
                    <p className="text-gray-700 leading-relaxed">
                      吴加成女士是资深出版行业专家及杰出职业经理人，拥有丰富的图书市场化运作经验。她精准把握行业脉搏，擅长团队建设与运营管理，在推动公司业务发展和品牌建设方面发挥关键作用。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 公司员工 */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-orange-600 tracking-wide mb-4">核心团队</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-orange-700 mb-2">前端工程师</h4>
                  <p className="text-orange-600 text-sm">UI/UX专家</p>
                </div>
                <p className="text-gray-700 text-center">专注于打造用户友好的界面和流畅的交互体验，运用前沿的前端技术呈现公司形象与服务，提升用户体验。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-orange-700 mb-2">后端工程师</h4>
                  <p className="text-orange-600 text-sm">系统架构师</p>
                </div>
                <p className="text-gray-700 text-center">构建稳健高效的后台服务系统，为网站各项功能提供强大的技术支撑，确保公司业务稳定运行和系统可扩展性。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-orange-700 mb-2">客户服务专员</h4>
                  <p className="text-orange-600 text-sm">客户服务专家</p>
                </div>
                <p className="text-gray-700 text-center">以专业热情的服务态度，及时响应客户需求，在线解答客户疑问，收集用户反馈，是公司与客户沟通的重要桥梁。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-orange-700 mb-2">责任编辑</h4>
                  <p className="text-orange-600 text-sm">内容编辑专家</p>
                </div>
                <p className="text-gray-700 text-center">负责图书、教材等出版物的内容审核、编辑与校对工作，确保出版内容的质量、准确性和规范性，提升出版物的专业水准。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-orange-700 mb-2">封面设计</h4>
                  <p className="text-orange-600 text-sm">视觉设计专家</p>
                </div>
                <p className="text-gray-700 text-center">负责图书封面、宣传材料等视觉设计工作，运用专业的设计理念和创意，打造符合品牌调性的视觉形象，提升产品的市场吸引力。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-orange-700 mb-2">撰稿员</h4>
                  <p className="text-orange-600 text-sm">内容创作专家（可兼职）</p>
                </div>
                <p className="text-gray-700 text-center">负责技术文档、教材内容、宣传文案等各类文稿的撰写工作，具备扎实的文字功底和专业知识，能够创作高质量的内容作品。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 主营业务 */}
        <section id="business" className="py-20 bg-white relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl animate-float"></div>
          <div className="hidden md:block absolute bottom-0 right-0 w-80 h-80 bg-yellow-100/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-orange-600 tracking-wide mb-4 gradient-text">主营业务</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-4 animate-pulse-glow"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">多元化业务布局，全方位服务客户</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <a href="/business/llm" className="group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden hover-card">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500 animate-rotate-slow"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-center relative z-10">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-float">🤖</div>
                    <h3 className="text-xl font-bold mb-4 text-orange-700 group-hover:text-orange-600 transition">大模型开发教学</h3>
                    <div className="w-16 h-1 bg-orange-300 rounded-full mx-auto mb-4 group-hover:w-24 transition-all duration-300 animate-pulse-glow"></div>
                    <p className="text-gray-700">涵盖大模型开发的教学书籍、教学视频及配套软件产品，助力人工智能领域人才培养。</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-center space-x-2">
                        <span className="px-2 py-1 bg-orange-200 text-orange-700 text-xs rounded-full animate-pulse-glow">AI</span>
                        <span className="px-2 py-1 bg-yellow-200 text-yellow-700 text-xs rounded-full animate-pulse-glow">教学</span>
                        <span className="px-2 py-1 bg-orange-200 text-orange-700 text-xs rounded-full animate-pulse-glow">实战</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="/business/embedded" className="group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden hover-card">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500 animate-rotate-slow"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-center relative z-10">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-float">🔧</div>
                    <h3 className="text-xl font-bold mb-4 text-blue-700 group-hover:text-blue-600 transition">嵌入式开发教学</h3>
                    <div className="w-16 h-1 bg-blue-300 rounded-full mx-auto mb-4 group-hover:w-24 transition-all duration-300 animate-pulse-glow"></div>
                    <p className="text-gray-700">提供嵌入式开发相关的教学书籍、教学视频及配套软件产品，服务高校与企业培训。</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-center space-x-2">
                        <span className="px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded-full animate-pulse-glow">硬件</span>
                        <span className="px-2 py-1 bg-cyan-200 text-cyan-700 text-xs rounded-full animate-pulse-glow">系统</span>
                        <span className="px-2 py-1 bg-blue-200 text-blue-700 text-xs rounded-full animate-pulse-glow">开发</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a href="/business/publish" className="group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden hover-card">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full -translate-y-10 translate-x-10 opacity-20 group-hover:scale-150 transition-transform duration-500 animate-rotate-slow"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-center relative z-10">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-float">📚</div>
                    <h3 className="text-xl font-bold mb-4 text-green-700 group-hover:text-green-600 transition">科技出版与专利服务</h3>
                    <div className="w-16 h-1 bg-green-300 rounded-full mx-auto mb-4 group-hover:w-24 transition-all duration-300 animate-pulse-glow"></div>
                    <p className="text-gray-700">专业的书籍出版、专利转让、技术推广、技术服务与咨询。</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-center space-x-2">
                        <span className="px-2 py-1 bg-green-200 text-green-700 text-xs rounded-full animate-pulse-glow">出版</span>
                        <span className="px-2 py-1 bg-emerald-200 text-emerald-700 text-xs rounded-full animate-pulse-glow">专利</span>
                        <span className="px-2 py-1 bg-green-200 text-green-700 text-xs rounded-full animate-pulse-glow">咨询</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* 客户评价 */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="hidden md:block absolute top-0 left-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="hidden md:block absolute bottom-0 right-0 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-orange-600 tracking-wide mb-4 gradient-text">客户评价</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-4 animate-pulse-glow"></div>
              <p className="text-xl text-gray-600">听听他们怎么说</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover-card animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-700 mb-4">"橙龙科技的教学资源质量很高，对我们的技术培训帮助很大。"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3 animate-float">张</div>
                  <div>
                    <div className="font-semibold text-gray-800">张教授</div>
                    <div className="text-sm text-gray-600">某高校计算机系</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-700 mb-4">"专业的技术服务团队，为我们解决了多个技术难题。"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 animate-float" style={{animationDelay: '0.5s'}}>李</div>
                  <div>
                    <div className="font-semibold text-gray-800">李工程师</div>
                    <div className="text-sm text-gray-600">某科技公司</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover-card animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-700 mb-4">"出版的教材内容详实，非常适合教学使用。"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3 animate-float" style={{animationDelay: '1s'}}>王</div>
                  <div>
                    <div className="font-semibold text-gray-800">王老师</div>
                    <div className="text-sm text-gray-600">某培训机构</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover-card animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-700 mb-4">"与橙龙科技合作出版的技术书籍，从内容到排版都非常专业，值得推荐。"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3 animate-float" style={{animationDelay: '1.5s'}}>刘</div>
                  <div>
                    <div className="font-semibold text-gray-800">刘博士</div>
                    <div className="text-sm text-gray-600">某大学教师</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover-card animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-700 mb-4">"他们的嵌入式开发教学资源非常实用，帮助我们的学生快速掌握核心技术。"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3 animate-float" style={{animationDelay: '2s'}}>陈</div>
                  <div>
                    <div className="font-semibold text-gray-800">陈主任</div>
                    <div className="text-sm text-gray-600">某职业技术学院</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg hover-card animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
                </div>
                <p className="text-gray-700 mb-4">"橙龙科技的服务态度很好，响应及时，从咨询到出版全程都有专人跟进。"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3 animate-float" style={{animationDelay: '2.5s'}}>赵</div>
                  <div>
                    <div className="font-semibold text-gray-800">赵老师</div>
                    <div className="text-sm text-gray-600">独立作者</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50">
          <ContactSection />
        </div>

        {/* 页脚 */}
        <footer className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white py-12 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="hidden md:block absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="animate-fade-in-up">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="animate-float">🐉</span>橙龙科技
                </h3>
                <p className="text-orange-100 leading-relaxed">专注于科技推广、出版与教育服务的创新型企业，致力于将前沿技术转化为实用的教学资源。</p>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <h3 className="text-lg font-semibold mb-4">快速链接</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">公司简介</a></li>
                  <li><a href="#team" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">核心团队</a></li>
                  <li><a href="#business" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">主营业务</a></li>
                  <li><a href="#contact" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">联系我们</a></li>
                </ul>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <h3 className="text-lg font-semibold mb-4">业务服务</h3>
                <ul className="space-y-2">
                  <li><a href="/business/llm" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">大模型开发教学</a></li>
                  <li><a href="/business/embedded" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">嵌入式开发教学</a></li>
                  <li><a href="/business/publish" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">科技出版服务</a></li>
                  <li><a href="/campus-recruitment" className="text-orange-100 hover:text-white transition-colors duration-200 hover:scale-105 inline-block">校园招聘</a></li>
                </ul>
              </div>
              <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <h3 className="text-lg font-semibold mb-4">联系方式</h3>
                <ul className="space-y-3 text-orange-100">
                  <li className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                    <span className="animate-pulse-glow">📧</span>
                    <span>zhchen2000@foxmail.com</span>
                  </li>
                  <li className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                    <span className="animate-pulse-glow">📱</span>
                    <span>+86 13201301067</span>
                  </li>
                  <li className="flex items-start gap-2 hover:scale-105 transition-transform duration-200">
                    <span className="animate-pulse-glow">🏠</span>
                    <span>江苏省南京市秦淮区光华路街道光华路127号3层304F室</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-orange-200 text-center text-orange-100 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <p>&copy; 2024 南京橙龙科技有限公司 保留所有权利</p>
              <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
                <span>苏ICP备2024100441号-1</span>
                <span>|</span>
                <span>苏公网安备32010502002110号</span>
                <span>|</span>
                <span>统一社会信用代码：91320105MA1WX12345</span>
              </div>
              <div className="mt-2 flex justify-center items-center gap-2 text-xs">
                <span>🏛️ 江苏省南京市秦淮区市场监督管理局</span>
                <span>|</span>
                <span>📞 投诉举报：025-85690008</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      {/* 联系我们的模态框 */}
      <ContactModal />
    </div>
  );
} 