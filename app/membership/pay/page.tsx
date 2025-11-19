"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

// 标记为动态页面
export const dynamic = 'force-dynamic';

interface OrderInfo {
  orderNo: string;
  type: 'monthly' | 'yearly';
  amount: number;
  amountYuan: string;
  status: string;
}

export default function PayPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNo = searchParams.get('orderNo');

  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'alipay'>('alipay');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (!orderNo) {
      router.push('/membership');
      return;
    }

    // 获取订单信息
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/membership/order?orderNo=${orderNo}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrder(data.order);
        } else {
          router.push('/membership');
        }
      } catch (error) {
        console.error('获取订单信息失败:', error);
        router.push('/membership');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && orderNo) {
      fetchOrder();
    }
  }, [user, authLoading, orderNo, router]);

  // 支付流程（开发期）
  const handlePay = async () => {
    if (!orderNo || !user) return;

    setIsPaying(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('未登录，请先登录');
        setIsPaying(false);
        return;
      }
      
      // 支付处理时间（2-3秒）
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      const response = await fetch('/api/membership/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          orderNo,
          paymentNo: `DEV${Date.now()}${Math.floor(Math.random() * 10000)}`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 支付成功，跳转到成功页面
        router.push(`/membership/success?orderNo=${orderNo}`);
      } else {
        // 支付失败
        setError(data.error || '支付失败，请稍后重试');
        setIsPaying(false);
      }
    } catch (error: any) {
      console.error('支付错误:', error);
      setError(error.message || '支付失败，请稍后重试');
      setIsPaying(false);
    }
  };

  const getPlanName = (type?: string) => {
    return type === 'monthly' ? '月付会员' : '年付会员';
  };

  if (authLoading || isLoading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">支付订单</h1>
          <p className="text-gray-600">订单号：{orderNo}</p>
        </div>

        {/* 订单信息卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">订阅类型</span>
              <span className="text-lg font-semibold text-gray-900">
                {order?.type === 'monthly' ? '月付会员' : '年付会员'}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600">订单金额</span>
              <span className="text-2xl font-bold text-orange-600">
                ¥{order?.amountYuan || '0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支付方式</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💳</span>
                <span className="font-semibold">支付宝</span>
              </div>
            </div>
          </div>
        </div>

        {/* 支付按钮 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 错误提示 */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-xl">⚠️</span>
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                关闭
              </button>
            </div>
          )}

          <button
            onClick={handlePay}
            disabled={isPaying || order?.status === 'paid'}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
              isPaying || order?.status === 'paid'
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-105'
            }`}
          >
            {isPaying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                支付处理中...
              </span>
            ) : order?.status === 'paid' ? (
              <span className="flex items-center justify-center gap-2">
                <span>✓</span>
                订单已支付
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>💳</span>
                确认支付 ¥{order?.amountYuan || '0.00'}
              </span>
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            {isPaying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                正在处理支付，请稍候...
              </span>
            ) : order?.status === 'paid' ? (
              <span className="text-green-600">订单已完成支付</span>
            ) : (
              '点击确认支付完成订单支付'
            )}
          </p>
          
          {/* 开发期提示 */}
          {!isPaying && order?.status !== 'paid' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                ⚠️ 项目处于开发期，尚未上线生产环境
              </p>
            </div>
          )}
        </div>

        {/* 返回按钮 */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← 返回
          </button>
        </div>
      </div>
    </div>
  );
}

