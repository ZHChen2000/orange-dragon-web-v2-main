"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

// 标记为动态页面
export const dynamic = 'force-dynamic';

interface OrderInfo {
  orderNo: string;
  paymentNo?: string;
  paidAt?: string;
  type?: 'monthly' | 'yearly';
}

interface MembershipInfo {
  type?: 'monthly' | 'yearly';
  status?: string;
  expiresAt?: string;
}

export default function PaySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNo = searchParams.get('orderNo');
  const { user } = useAuth();
  
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [membership, setMembership] = useState<MembershipInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderNo) {
      fetchOrderAndMembership();
    } else {
      setIsLoading(false);
    }
  }, [orderNo]);

  const fetchOrderAndMembership = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // 获取订单信息
      const orderResponse = await fetch(`/api/membership/order?orderNo=${orderNo}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        setOrder(orderData.order);
      }

      // 获取会员信息
      const membershipResponse = await fetch('/api/membership/status', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (membershipResponse.ok) {
        const membershipData = await membershipResponse.json();
        setMembership(membershipData.membership);
      }
    } catch (error) {
      console.error('获取信息失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPlanName = (type?: string) => {
    return type === 'monthly' ? '月付会员' : type === 'yearly' ? '年付会员' : '会员';
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          {/* 成功图标 */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <span className="text-5xl">✓</span>
            </div>
          </div>

          {/* 成功信息 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">支付成功！</h1>
          <p className="text-lg text-gray-600 mb-2">
            恭喜您已成为橙龙科技{getPlanName(membership?.type || order?.type)}
          </p>
          
          {/* 订单信息 */}
          {order && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="space-y-2 text-sm">
                {order.orderNo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">订单号：</span>
                    <span className="font-mono text-gray-900">{order.orderNo}</span>
                  </div>
                )}
                {order.paymentNo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">支付流水号：</span>
                    <span className="font-mono text-gray-900">{order.paymentNo}</span>
                  </div>
                )}
                {order.paidAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">支付时间：</span>
                    <span className="text-gray-900">{formatDate(order.paidAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 会员到期时间 */}
          {membership?.expiresAt && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">会员有效期</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {formatDate(membership.expiresAt)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  到期后会员权益将自动失效
                </p>
              </div>
            </div>
          )}

          {/* 会员权益提示 */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">会员权益</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>无限下载资料</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>优先技术支持</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>专属会员标识</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>新功能优先体验</span>
              </li>
            </ul>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/downloads"
              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
            >
              立即使用会员权益
            </Link>
            <Link
              href="/profile"
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
            >
              查看会员信息
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

