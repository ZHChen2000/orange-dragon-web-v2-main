"use client";

import React, { useState } from 'react';
import BackToHomeButton from '@/components/BackToHomeButton';
import Navigation from '../../components/Navigation';

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  frequency: string;
  participants: string;
  highlights: string[];
  images: string[];
}

export default function TeamBuildingPage() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activities: Activity[] = [
    {
      id: 'entertainment',
      title: '员工娱乐活动',
      description: '丰富多彩的娱乐活动，增进团队感情，提升工作氛围',
      icon: '🎮',
      color: 'from-purple-500 to-pink-500',
      frequency: '每月1-2次',
      participants: '全体员工',
      highlights: [
        '桌游比赛 - 狼人杀、三国杀等策略游戏',
        '户外拓展 - 团队协作挑战赛',
        '电竞比赛 - 英雄联盟、王者荣耀等',
        'KTV聚会 - 放松心情，展示才艺',
        '电影之夜 - 集体观影，分享感受',
        '生日派对 - 为员工庆祝生日'
      ],
      images: ['🎮', '🏃‍♂️', '🎵', '🎬', '🎂', '🎯']
    },
    {
      id: 'dining',
      title: '团队聚餐',
      description: '美食与交流的完美结合，在轻松氛围中增进了解',
      icon: '🍽️',
      color: 'from-orange-500 to-red-500',
      frequency: '每季度1次',
      participants: '全体员工',
      highlights: [
        '中式聚餐 - 传统美食，温馨氛围',
        '西式晚宴 - 精致料理，优雅体验',
        '烧烤派对 - 户外烧烤，自由交流',
        '火锅聚会 - 热闹氛围，增进感情',
        '下午茶时光 - 轻松聊天，分享生活',
        '节日聚餐 - 庆祝传统节日'
      ],
      images: ['🍜', '🍕', '🍖', '🍲', '☕', '🎊']
    },
    {
      id: 'conference',
      title: '学术会议',
      description: '参与行业前沿会议，拓展视野，提升专业能力',
      icon: '🎓',
      color: 'from-blue-500 to-cyan-500',
      frequency: '每年3-5次',
      participants: '技术团队 + 管理层',
      highlights: [
        '技术峰会 - 了解最新技术趋势',
        '行业论坛 - 与同行交流经验',
        '学术研讨会 - 深入探讨专业话题',
        '创业大会 - 学习创新思维',
        '国际会议 - 拓展国际视野',
        '专家讲座 - 聆听行业专家分享'
      ],
      images: ['🏛️', '🌐', '📚', '💡', '✈️', '👨‍🏫']
    },
    {
      id: 'training',
      title: '技能培训',
      description: '系统化的技能提升计划，助力员工职业发展',
      icon: '📚',
      color: 'from-green-500 to-emerald-500',
      frequency: '每月2-3次',
      participants: '全体员工',
      highlights: [
        '技术培训 - 编程语言、框架学习',
        '软技能培训 - 沟通、领导力提升',
        '管理培训 - 项目管理、团队管理',
        '产品培训 - 产品思维、用户体验',
        '安全培训 - 信息安全、数据保护',
        '职业规划 - 个人发展路径指导'
      ],
      images: ['💻', '🗣️', '📊', '🎨', '🔒', '🎯']
    }
  ];

  const handleActivityClick = (activityId: string) => {
    setSelectedActivity(selectedActivity === activityId ? null : activityId);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const activity = activities.find(a => a.id === selectedActivity);
    if (activity) {
      setCurrentImageIndex((prev) => (prev + 1) % activity.images.length);
    }
  };

  const prevImage = () => {
    const activity = activities.find(a => a.id === selectedActivity);
    if (activity) {
      setCurrentImageIndex((prev) => (prev - 1 + activity.images.length) % activity.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 橙龙科技团建活动</h1>
          <p className="text-xl text-gray-600 mb-6">丰富多彩的团队活动，让工作与生活完美平衡</p>
          <div className="bg-orange-100 rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-orange-800 mb-2">🌟 团建理念</h2>
            <p className="text-orange-700">我们相信，优秀的团队不仅需要专业能力，更需要良好的团队氛围和凝聚力。通过多样化的团建活动，我们致力于打造一个充满活力、互帮互助的工作环境。</p>
          </div>
        </div>

        {/* 活动统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
            <div className="text-gray-600">年度活动次数</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">员工参与率</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
            <div className="text-gray-600">活动满意度</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
            <div className="text-gray-600">活动类型</div>
          </div>
        </div>

        {/* 活动列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                selectedActivity === activity.id ? 'ring-4 ring-orange-300' : ''
              }`}
              onClick={() => handleActivityClick(activity.id)}
            >
              {/* 活动卡片头部 */}
              <div className={`bg-gradient-to-r ${activity.color} text-white p-6 rounded-t-2xl`}>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{activity.icon}</div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">{activity.frequency}</div>
                    <div className="text-xs opacity-75">{activity.participants}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-4">{activity.title}</h3>
                <p className="text-sm opacity-90 mt-2">{activity.description}</p>
              </div>

              {/* 活动卡片内容 */}
              <div className="p-6">
                <div className="space-y-3">
                  {activity.highlights.slice(0, 3).map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </div>
                  ))}
                  {activity.highlights.length > 3 && (
                    <div className="text-orange-600 text-xs">+{activity.highlights.length - 3} 更多活动...</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 详细活动信息 */}
        {selectedActivity && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activities.find(activity => activity.id === selectedActivity)?.title} - 详细活动
              </h2>
              <button
                onClick={() => setSelectedActivity(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            {activities.find(activity => activity.id === selectedActivity) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 活动亮点 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-orange-500 mr-2">🎯</span>活动亮点
                  </h3>
                  <ul className="space-y-2">
                    {activities.find(activity => activity.id === selectedActivity)?.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 活动图片展示 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-blue-500 mr-2">📸</span>活动展示
                  </h3>
                  <div className="relative">
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <div className="text-6xl mb-4">
                        {activities.find(activity => activity.id === selectedActivity)?.images[currentImageIndex]}
                      </div>
                      <p className="text-gray-600">
                        {activities.find(activity => activity.id === selectedActivity)?.highlights[currentImageIndex]}
                      </p>
                    </div>
                    
                    {/* 图片导航按钮 */}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={prevImage}
                        className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        ←
                      </button>
                      <div className="text-sm text-gray-600">
                        {currentImageIndex + 1} / {activities.find(activity => activity.id === selectedActivity)?.images.length}
                      </div>
                      <button
                        onClick={nextImage}
                        className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 团建成果 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🏆 团建成果</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold text-gray-800 mb-2">团队凝聚力</h3>
              <p className="text-gray-600 text-sm">通过多样化活动，团队成员关系更加融洽，协作效率显著提升</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-800 mb-2">技能提升</h3>
              <p className="text-gray-600 text-sm">定期培训和学习活动，员工专业技能和综合素质持续提升</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😊</div>
              <h3 className="font-semibold text-gray-800 mb-2">工作满意度</h3>
              <p className="text-gray-600 text-sm">丰富的工作生活平衡，员工满意度和工作积极性大幅提高</p>
            </div>
          </div>
        </div>

        {/* 参与方式 */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🎯 如何参与</h2>
          <p className="text-lg mb-6">想要参与我们的团建活动吗？</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">📅 活动安排</h3>
              <ul className="space-y-1 text-sm">
                <li>• 活动时间会提前一周通知</li>
                <li>• 可通过公司内部系统报名</li>
                <li>• 活动费用由公司承担</li>
                <li>• 支持请假和调休安排</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💡 参与建议</h3>
              <ul className="space-y-1 text-sm">
                <li>• 积极参与，放松心情</li>
                <li>• 与同事多交流互动</li>
                <li>• 分享活动照片和感受</li>
                <li>• 提出活动建议和想法</li>
              </ul>
            </div>
          </div>
          <button className="mt-6 bg-white text-orange-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            查看活动日历
          </button>
        </div>
      </div>

      {/* 返回按钮 */}
      <div className="fixed bottom-6 right-6">
        <BackToHomeButton />
      </div>
    </div>
  );
} 