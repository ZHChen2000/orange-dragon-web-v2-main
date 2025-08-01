"use client";

import React from 'react';
import Navigation from '../../../components/Navigation';

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">科技出版与专利服务</h1>
        <p className="text-lg text-gray-700 mb-6">
          南京橙龙科技有限公司为广大作者、科研人员和企业提供专业的科技图书出版、专利转让、技术推广与咨询服务。我们拥有完善的出版流程和丰富的行业资源，助力科技成果转化与推广。
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>科技类图书策划、编辑与出版发行</li>
          <li>专利申请、转让与运营服务</li>
          <li>技术推广与成果转化咨询</li>
          <li>出版物市场化推广与渠道建设</li>
          <li>行业专家团队一对一服务</li>
        </ul>
        <p className="text-gray-600">欢迎有出版、专利及技术推广需求的客户与我们联系。</p>
      </div>
      </main>
    </div>
  );
} 