"use client";

import React from 'react';
import Navigation from '../../../components/Navigation';

export default function EmbeddedPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">嵌入式开发教学</h1>
        <p className="text-lg text-gray-700 mb-6">
          我们专注于嵌入式系统开发领域的教材出版与课程开发，内容涵盖单片机、ARM、FPGA、物联网等方向，配套丰富的教学视频和实验软件，满足高校教学和企业培训的多样化需求。
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>嵌入式系统原理与开发实战</li>
          <li>主流开发板与工具链应用</li>
          <li>物联网与智能硬件项目案例</li>
          <li>配套实验平台与仿真软件</li>
          <li>企业定制化嵌入式培训服务</li>
        </ul>
        <p className="text-gray-600">欢迎高校、企业及个人咨询合作。</p>
      </div>
      </main>
    </div>
  );
} 