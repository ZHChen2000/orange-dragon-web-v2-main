"use client";

import React from 'react';
import BackToHomeButton from '@/components/BackToHomeButton';
import Navigation from '../../components/Navigation';

export default function FinancialReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">公司财报</h1>
        <p className="text-xl text-gray-700 mb-4">财务部门正在整理和审核公司财务数据，财报信息页面正在完善中。</p>
        <p className="text-gray-600">财报即将发布，敬请期待！</p>
      </div>
      <BackToHomeButton />
      </main>
    </div>
  );
} 