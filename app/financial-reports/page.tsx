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
        <p className="text-xl text-gray-700 mb-4">🐶加班中... 财务总监旺财 正在努力整理财报数据，请稍后查阅！</p>
        <p className="text-gray-600">财报即将发布，敬请期待！</p>
      </div>
      <BackToHomeButton />
      </main>
    </div>
  );
} 