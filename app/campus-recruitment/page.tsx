"use client";

import React, { useState } from 'react';
import BackToHomeButton from '@/components/BackToHomeButton';
import Navigation from '../../components/Navigation';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  icon: string;
  color: string;
}

export default function CampusRecruitmentPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const jobPositions: JobPosition[] = [
    {
      id: 'frontend',
      title: '前端开发工程师',
      department: '技术研发部',
      type: '全职',
      location: '南京',
      salary: '8K-15K',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      requirements: [
        '计算机相关专业本科及以上学历',
        '熟练掌握 HTML5、CSS3、JavaScript/TypeScript',
        '熟悉 React、Vue.js 等主流前端框架',
        '了解前端工程化工具（Webpack、Vite等）',
        '有良好的代码风格和团队协作能力',
        '对新技术有学习热情，有开源项目经验优先'
      ],
      responsibilities: [
        '负责公司产品的前端界面开发和维护',
        '与后端工程师协作完成产品功能开发',
        '优化前端性能，提升用户体验',
        '参与技术方案讨论和代码评审',
        '编写技术文档和开发规范'
      ],
      benefits: [
        '五险一金 + 补充医疗保险',
        '年终奖金 + 项目奖金',
        '带薪年假 + 病假',
        '免费工作餐 + 下午茶',
        '定期团建活动',
        '技术培训和学习机会',
        '弹性工作制',
        '股票期权激励'
      ]
    },
    {
      id: 'backend',
      title: '后端开发工程师',
      department: '技术研发部',
      type: '全职',
      location: '南京',
      salary: '10K-18K',
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      requirements: [
        '计算机相关专业本科及以上学历',
        '熟练掌握 Java、Python、Go 等至少一门编程语言',
        '熟悉 Spring Boot、Django 等后端框架',
        '了解 MySQL、Redis、MongoDB 等数据库',
        '熟悉微服务架构和容器化技术',
        '有良好的系统设计能力和问题解决能力',
        '有高并发、大数据处理经验优先'
      ],
      responsibilities: [
        '负责后端服务的设计、开发和维护',
        '设计并实现高效的数据库结构',
        '确保系统的安全性、稳定性和可扩展性',
        '参与系统架构设计和技术选型',
        '编写技术文档和API文档',
        '协助前端工程师完成接口对接'
      ],
      benefits: [
        '五险一金 + 补充医疗保险',
        '年终奖金 + 项目奖金',
        '带薪年假 + 病假',
        '免费工作餐 + 下午茶',
        '定期团建活动',
        '技术培训和学习机会',
        '弹性工作制',
        '股票期权激励'
      ]
    },
    {
      id: 'ip',
      title: '知识产权工程师',
      department: '法务部',
      type: '全职',
      location: '南京',
      salary: '8K-15K',
      icon: '📋',
      color: 'from-purple-500 to-pink-500',
      requirements: [
        '法学、知识产权、理工科等相关专业本科及以上学历',
        '熟悉专利法、商标法、著作权法等知识产权法律法规',
        '具备专利检索、分析、撰写能力',
        '了解专利申请流程和审查标准',
        '有良好的文字表达能力和逻辑思维能力',
        '通过专利代理人资格考试优先',
        '有知识产权相关工作经验优先'
      ],
      responsibilities: [
        '负责公司知识产权的申请、维护和管理',
        '进行专利检索和分析，评估技术方案的专利性',
        '撰写专利申请文件，跟进专利申请流程',
        '协助处理知识产权纠纷和侵权案件',
        '参与技术项目的知识产权风险评估',
        '制定公司知识产权保护策略',
        '提供知识产权相关法律咨询'
      ],
      benefits: [
        '五险一金 + 补充医疗保险',
        '年终奖金 + 项目奖金',
        '带薪年假 + 病假',
        '免费工作餐 + 下午茶',
        '定期团建活动',
        '专业培训和资格考试支持',
        '弹性工作制',
        '股票期权激励'
      ]
    }
  ];

  const handleApply = () => {
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 加入橙龙科技，共创未来</h1>
          <p className="text-xl text-gray-600 mb-6">我们正在寻找优秀的应届毕业生加入我们的团队</p>
          <div className="bg-orange-100 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-orange-800 mb-2">📅 招聘时间</h2>
            <p className="text-orange-700">2025年秋季校园招聘 | 持续进行中</p>
          </div>
        </div>

        {/* 职位列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {jobPositions.map((job) => (
            <div
              key={job.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                selectedJob === job.id ? 'ring-4 ring-orange-300' : ''
              }`}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            >
              {/* 职位卡片头部 */}
              <div className={`bg-gradient-to-r ${job.color} text-white p-6 rounded-t-2xl`}>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{job.icon}</div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">{job.department}</div>
                    <div className="text-xs opacity-75">{job.type}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-4">{job.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm opacity-90">📍 {job.location}</span>
                  <span className="text-sm font-semibold">💰 {job.salary}</span>
                </div>
              </div>

              {/* 职位卡片内容 */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* 职位要求 */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="text-blue-500 mr-2">📋</span>职位要求
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-orange-600 text-xs">+{job.requirements.length - 3} 更多要求...</li>
                      )}
                    </ul>
                  </div>

                  {/* 工作职责 */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="text-green-500 mr-2">🎯</span>工作职责
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.responsibilities.slice(0, 2).map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {resp}
                        </li>
                      ))}
                      {job.responsibilities.length > 2 && (
                        <li className="text-orange-600 text-xs">+{job.responsibilities.length - 2} 更多职责...</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* 申请按钮 */}
                <button 
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply();
                  }}
                >
                  立即申请
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 详细职位信息 */}
        {selectedJob && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {jobPositions.find(job => job.id === selectedJob)?.title} - 详细职位信息
              </h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            {jobPositions.find(job => job.id === selectedJob) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 职位要求详情 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-blue-500 mr-2">📋</span>详细职位要求
                  </h3>
                  <ul className="space-y-2">
                    {jobPositions.find(job => job.id === selectedJob)?.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 工作职责详情 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-green-500 mr-2">🎯</span>详细工作职责
                  </h3>
                  <ul className="space-y-2">
                    {jobPositions.find(job => job.id === selectedJob)?.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 福利待遇 */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-purple-500 mr-2">🎁</span>福利待遇
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {jobPositions.find(job => job.id === selectedJob)?.benefits.map((benefit, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-3 text-center">
                    <span className="text-orange-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 公司介绍 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🏢 关于橙龙科技</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-800 mb-2">创新驱动</h3>
              <p className="text-gray-600 text-sm">专注于前沿科技研究，致力于将创新技术转化为实用产品</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-800 mb-2">团队协作</h3>
              <p className="text-gray-600 text-sm">扁平化管理，鼓励创新思维，提供广阔的发展空间</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-gray-800 mb-2">持续学习</h3>
              <p className="text-gray-600 text-sm">提供丰富的培训资源，支持员工职业发展和技能提升</p>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">📧 联系我们</h2>
          <p className="text-lg mb-4">准备好加入我们了吗？</p>
          <div className="space-y-2 text-lg">
            <p>📧 邮箱：zhchen2000@foxmail.com</p>
            <p>📞 电话：+86 13201301067</p>
            <p>📍 地址：南京市秦淮区光华路127号3层304F室</p>
          </div>
          <button 
            className="mt-6 bg-white text-orange-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={handleApply}
          >
            投递简历
          </button>
        </div>
      </div>

      {/* 返回按钮 */}
      <div className="fixed bottom-6 right-6">
        <BackToHomeButton />
      </div>

      {/* HR联系方式模态框 */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            {/* 关闭按钮 */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
            
            {/* 模态框内容 */}
            <div className="text-center">
              <div className="text-4xl mb-4">👩‍💼</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">HR联系方式</h2>
              <p className="text-gray-600 mb-6">请通过以下方式联系我们的人力资源部门</p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <div className="font-semibold text-gray-800">邮箱</div>
                    <div className="text-orange-600">hr@orangedragon.com</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <div className="font-semibold text-gray-800">电话</div>
                    <div className="text-orange-600">025-12345678</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-2xl mr-3">💬</span>
                  <div>
                    <div className="font-semibold text-gray-800">微信</div>
                    <div className="text-orange-600">OrangeDragon_HR</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-2xl mr-3">⏰</span>
                  <div>
                    <div className="font-semibold text-gray-800">工作时间</div>
                    <div className="text-orange-600">周一至周五 9:00-18:00</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>温馨提示：</strong>请准备好您的简历，并在邮件中注明您申请的职位名称。
                </p>
              </div>
              
              <button
                onClick={() => setShowContactModal(false)}
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 