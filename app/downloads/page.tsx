"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackToHomeButton from '@/components/BackToHomeButton';
import Navigation from '../../components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  fileType: string;
  downloadCount: number;
  lastUpdated: string;
  icon: string;
  color: string;
  downloadUrl: string;
}

export default function DownloadsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 检查用户是否已登录
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // 如果正在加载或用户未登录，显示加载状态或重定向
  if (isLoading) {
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

  // 如果用户未登录，显示提示（实际上会被 useEffect 重定向）
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">需要登录</h2>
            <p className="text-gray-600 mb-6">您需要登录后才能访问资料下载页面</p>
            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
            >
              前往登录
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const downloadItems: DownloadItem[] = [
    // 出版SOP流程
    {
      id: 'sop-1',
      title: '图书出版标准操作流程',
      description: '详细的图书出版流程指南，包含从选题到发行的完整步骤',
      category: 'sop',
      fileSize: '2.5MB',
      fileType: 'PDF',
      downloadCount: 156,
      lastUpdated: '2024-12-01',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      downloadUrl: '#'
    },
    {
      id: 'sop-2',
      title: '技术文档编写规范',
      description: '技术文档的标准格式和编写要求，确保文档质量',
      category: 'sop',
      fileSize: '1.8MB',
      fileType: 'PDF',
      downloadCount: 89,
      lastUpdated: '2024-11-28',
      icon: '📝',
      color: 'from-blue-500 to-cyan-500',
      downloadUrl: '#'
    },
    {
      id: 'sop-3',
      title: '版权申请流程指南',
      description: '版权申请的标准流程和注意事项',
      category: 'sop',
      fileSize: '1.2MB',
      fileType: 'PDF',
      downloadCount: 67,
      lastUpdated: '2024-11-25',
      icon: '⚖️',
      color: 'from-blue-500 to-cyan-500',
      downloadUrl: '#'
    },
    {
      id: 'sop-4',
      title: '质量审核标准',
      description: '出版物的质量审核标准和检查清单',
      category: 'sop',
      fileSize: '3.1MB',
      fileType: 'PDF',
      downloadCount: 134,
      lastUpdated: '2024-11-20',
      icon: '✅',
      color: 'from-blue-500 to-cyan-500',
      downloadUrl: '#'
    },

    // 已出版图书
    {
      id: 'book-1',
      title: '大模型开发实战指南',
      description: '全面介绍大模型开发的技术原理和实践应用',
      category: 'books',
      fileSize: '15.2MB',
      fileType: 'PDF',
      downloadCount: 2341,
      lastUpdated: '2024-12-05',
      icon: '🤖',
      color: 'from-purple-500 to-pink-500',
      downloadUrl: '#'
    },
    {
      id: 'book-2',
      title: '嵌入式系统设计原理',
      description: '嵌入式系统设计的核心原理和实现方法',
      category: 'books',
      fileSize: '12.8MB',
      fileType: 'PDF',
      downloadCount: 1892,
      lastUpdated: '2024-11-30',
      icon: '🔧',
      color: 'from-purple-500 to-pink-500',
      downloadUrl: '#'
    },
    {
      id: 'book-3',
      title: '人工智能技术导论',
      description: '人工智能基础理论和应用技术介绍',
      category: 'books',
      fileSize: '18.5MB',
      fileType: 'PDF',
      downloadCount: 3124,
      lastUpdated: '2024-11-25',
      icon: '🧠',
      color: 'from-purple-500 to-pink-500',
      downloadUrl: '#'
    },
    {
      id: 'book-4',
      title: '软件工程最佳实践',
      description: '现代软件工程的方法论和实践指南',
      category: 'books',
      fileSize: '14.3MB',
      fileType: 'PDF',
      downloadCount: 1678,
      lastUpdated: '2024-11-20',
      icon: '💻',
      color: 'from-purple-500 to-pink-500',
      downloadUrl: '#'
    },
    {
      id: 'book-5',
      title: '数据科学入门教程',
      description: '数据科学的基础知识和实践技能',
      category: 'books',
      fileSize: '16.7MB',
      fileType: 'PDF',
      downloadCount: 2156,
      lastUpdated: '2024-11-15',
      icon: '📊',
      color: 'from-purple-500 to-pink-500',
      downloadUrl: '#'
    },

    // 员工培训手册
    {
      id: 'training-1',
      title: '新员工入职培训手册',
      description: '新员工入职的完整培训指南和流程',
      category: 'training',
      fileSize: '5.2MB',
      fileType: 'PDF',
      downloadCount: 445,
      lastUpdated: '2024-12-03',
      icon: '👋',
      color: 'from-green-500 to-emerald-500',
      downloadUrl: '#'
    },
    {
      id: 'training-2',
      title: '技术技能培训大纲',
      description: '员工技术技能提升的培训计划和大纲',
      category: 'training',
      fileSize: '4.8MB',
      fileType: 'PDF',
      downloadCount: 378,
      lastUpdated: '2024-11-28',
      icon: '🎓',
      color: 'from-green-500 to-emerald-500',
      downloadUrl: '#'
    },
    {
      id: 'training-3',
      title: '团队协作与沟通指南',
      description: '提升团队协作效率和沟通技巧的培训材料',
      category: 'training',
      fileSize: '3.9MB',
      fileType: 'PDF',
      downloadCount: 289,
      lastUpdated: '2024-11-25',
      icon: '🤝',
      color: 'from-green-500 to-emerald-500',
      downloadUrl: '#'
    },
    {
      id: 'training-4',
      title: '项目管理培训手册',
      description: '项目管理的核心概念和实践方法',
      category: 'training',
      fileSize: '6.1MB',
      fileType: 'PDF',
      downloadCount: 234,
      lastUpdated: '2024-11-20',
      icon: '📈',
      color: 'from-green-500 to-emerald-500',
      downloadUrl: '#'
    },

    // 技术文档
    {
      id: 'tech-1',
      title: 'API接口文档',
      description: '公司产品的API接口详细文档',
      category: 'tech',
      fileSize: '2.8MB',
      fileType: 'PDF',
      downloadCount: 567,
      lastUpdated: '2024-12-02',
      icon: '🔌',
      color: 'from-orange-500 to-red-500',
      downloadUrl: '#'
    },
    {
      id: 'tech-2',
      title: '系统架构设计文档',
      description: '公司核心系统的架构设计说明',
      category: 'tech',
      fileSize: '4.5MB',
      fileType: 'PDF',
      downloadCount: 234,
      lastUpdated: '2024-11-29',
      icon: '🏗️',
      color: 'from-orange-500 to-red-500',
      downloadUrl: '#'
    },
    {
      id: 'tech-3',
      title: '数据库设计规范',
      description: '数据库设计和优化的标准规范',
      category: 'tech',
      fileSize: '3.2MB',
      fileType: 'PDF',
      downloadCount: 189,
      lastUpdated: '2024-11-26',
      icon: '🗄️',
      color: 'from-orange-500 to-red-500',
      downloadUrl: '#'
    }
  ];

  const categories = [
    { id: 'all', name: '全部资料', icon: '📁' },
    { id: 'sop', name: 'SOP流程', icon: '📋' },
    { id: 'books', name: '已出版图书', icon: '📚' },
    { id: 'training', name: '培训手册', icon: '🎓' },
    { id: 'tech', name: '技术文档', icon: '💻' }
  ];

  const filteredItems = downloadItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (item: DownloadItem) => {
    alert(`开始下载: ${item.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📥 公司资料下载中心</h1>
          <p className="text-xl text-gray-600 mb-6">获取最新的公司资料、培训手册和技术文档</p>
          <div className="bg-orange-100 rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-orange-800 mb-2">💡 使用说明</h2>
            <p className="text-orange-700">所有资料均为PDF格式，点击下载按钮即可获取。如有疑问，请联系技术支持。</p>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索资料..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
              </div>
            </div>
            
            {/* 分类筛选 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 统计信息 */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
              <span>共找到 {filteredItems.length} 个资料</span>
              <span>总下载量: {downloadItems.reduce((sum, item) => sum + item.downloadCount, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 资料列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {/* 卡片头部 */}
              <div className={`bg-gradient-to-r ${item.color} text-white p-6 rounded-t-2xl`}>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">{item.fileType}</div>
                    <div className="text-xs opacity-75">{item.fileSize}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mt-4 line-clamp-2">{item.title}</h3>
              </div>

              {/* 卡片内容 */}
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{item.description}</p>
                
                {/* 文件信息 */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>下载次数: {item.downloadCount.toLocaleString()}</span>
                    <span>更新: {item.lastUpdated}</span>
                  </div>
                </div>

                {/* 下载按钮 */}
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>⬇️</span>
                  立即下载
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">未找到相关资料</h3>
            <p className="text-gray-600">请尝试调整搜索条件或选择其他分类</p>
          </div>
        )}

        {/* 下载说明 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📋 下载说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-800 mb-2">多设备支持</h3>
              <p className="text-gray-600 text-sm">所有资料支持电脑、平板、手机等多种设备查看</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800 mb-2">安全下载</h3>
              <p className="text-gray-600 text-sm">所有文件经过安全检测，确保无毒无害</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold text-gray-800 mb-2">技术支持</h3>
              <p className="text-gray-600 text-sm">如遇下载问题，请联系技术支持团队</p>
            </div>
          </div>
        </div>
      </div>

      {/* 返回按钮 */}
      <div className="fixed bottom-6 right-6">
        <BackToHomeButton />
      </div>
    </div>
  );
} 