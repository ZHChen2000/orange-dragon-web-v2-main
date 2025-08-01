"use client";

import React from 'react';
import Navigation from '../../../components/Navigation';

export default function LLMPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">大模型开发教学</h1>
        <p className="text-lg text-gray-700 mb-6">
          南京橙龙科技有限公司在大模型开发领域拥有丰富的出版与教学资源。我们出版了多本涵盖人工智能、大模型算法、深度学习等方向的专业书籍，配套高质量教学视频和实用软件工具，帮助高校、企业和个人系统学习大模型开发技术。
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>大模型原理与算法解析</li>
          <li>主流开源大模型实战（如ChatGPT、Llama等）</li>
          <li>大模型训练、微调与部署全流程教学</li>
          <li>配套代码、数据集与实验平台</li>
          <li>企业级AI应用开发案例</li>
        </ul>
        <p className="text-gray-600">如需定制化培训或合作出版，欢迎联系我们。</p>
      </div>
      </main>
    </div>
  );
} 