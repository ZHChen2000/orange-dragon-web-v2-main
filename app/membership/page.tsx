"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

interface MembershipStatus {
  type: 'none' | 'monthly' | 'yearly';
  status: 'none' | 'active' | 'expired';
  expiresAt?: string;
  isActive: boolean;
}

export default function MembershipPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [membership, setMembership] = useState<MembershipStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inviteCode, setInviteCode] = useState('');
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [isUsingCode, setIsUsingCode] = useState(false);
  const [codeValidation, setCodeValidation] = useState<{ valid: boolean; membershipType?: string; error?: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchMembershipStatus();
    }
  }, [user, authLoading, router]);

  const fetchMembershipStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/membership/status', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMembership(data.membership);
      }
    } catch (error) {
      console.error('获取会员状态失败:', error);
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
    });
  };

  // 验证邀请码
  const handleValidateCode = async () => {
    if (!inviteCode.trim()) {
      setCodeValidation({ valid: false, error: '请输入邀请码' });
      return;
    }

    setIsValidatingCode(true);
    setCodeValidation(null);

    try {
      const response = await fetch(`/api/membership/invite-code?code=${encodeURIComponent(inviteCode.trim())}`);
      const data = await response.json();

      if (response.ok && data.valid) {
        setCodeValidation({
          valid: true,
          membershipType: data.membershipType,
        });
      } else {
        setCodeValidation({
          valid: false,
          error: data.error || '邀请码无效',
        });
      }
    } catch (error: any) {
      console.error('验证邀请码错误:', error);
      setCodeValidation({
        valid: false,
        error: '验证失败，请稍后重试',
      });
    } finally {
      setIsValidatingCode(false);
    }
  };

  // 使用邀请码
  const handleUseInviteCode = async () => {
    if (!inviteCode.trim() || !codeValidation?.valid) {
      return;
    }

    setIsUsingCode(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/membership/invite-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ code: inviteCode.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 刷新会员状态
        await fetchMembershipStatus();
        // 清空邀请码和验证状态
        setInviteCode('');
        setCodeValidation(null);
        alert(data.message || '邀请码使用成功！');
      } else {
        alert(data.error || '使用邀请码失败，请稍后重试');
        setCodeValidation({
          valid: false,
          error: data.error || '使用失败',
        });
      }
    } catch (error: any) {
      console.error('使用邀请码错误:', error);
      alert(error.message || '使用邀请码失败，请稍后重试');
    } finally {
      setIsUsingCode(false);
    }
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">会员激活/续费</h1>
          <p className="text-xl text-gray-600">使用邀请码激活或续费会员，解锁更多功能</p>
        </div>

        {/* 当前会员状态 */}
        {membership && membership.isActive && (
          <div className="mb-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white text-center">
            <div className="text-2xl mb-2">✨ 您已是会员</div>
            <p className="text-orange-100">
              {membership.type === 'monthly' ? '月付会员' : '年付会员'} · 
              到期时间：{formatDate(membership.expiresAt)}
            </p>
          </div>
        )}

        {/* 邀请码兑换/续费区域 */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-200 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🎁</span>
            <h3 className="text-2xl font-bold text-gray-900">
              {membership?.isActive ? '使用邀请码续费会员' : '使用邀请码激活会员'}
            </h3>
          </div>
          {membership?.isActive ? (
            <p className="text-base text-gray-600 mb-6">
              您的会员将在 <strong>{formatDate(membership.expiresAt)}</strong> 到期。使用邀请码续费将在现有到期时间基础上延长会员期限。
            </p>
          ) : (
            <p className="text-base text-gray-600 mb-6">
              会员资格仅可通过邀请码激活。如果您有邀请码，请在此处输入并兑换会员资格。
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value.toUpperCase());
                setCodeValidation(null);
              }}
              placeholder="请输入邀请码"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={isUsingCode}
            />
            <button
              onClick={handleValidateCode}
              disabled={isValidatingCode || !inviteCode.trim() || isUsingCode}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidatingCode ? '验证中...' : '验证'}
            </button>
            {codeValidation?.valid && (
              <button
                onClick={handleUseInviteCode}
                disabled={isUsingCode}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUsingCode ? '使用中...' : membership?.isActive 
                  ? `续费${codeValidation.membershipType === 'monthly' ? '1个月' : '1年'}`
                  : `兑换${codeValidation.membershipType === 'monthly' ? '月付' : '年付'}会员`}
              </button>
            )}
          </div>
          {codeValidation && (
            <div className={`mt-3 p-3 rounded-lg ${
              codeValidation.valid
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {codeValidation.valid ? (
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>
                    {membership?.isActive 
                      ? `邀请码有效，可续费${codeValidation.membershipType === 'monthly' ? '1个月' : '1年'}会员`
                      : `邀请码有效，可兑换${codeValidation.membershipType === 'monthly' ? '月付' : '年付'}会员`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>✗</span>
                  <span>{codeValidation.error}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 会员权益说明 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">会员权益</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>无限下载资料</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>优先技术支持</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>专属会员标识</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>新功能优先体验</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>年度报告和数据分析</span>
            </li>
          </ul>
        </div>

        {/* 返回链接 */}
        <div className="mt-8 text-center">
          <Link
            href="/profile"
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            ← 返回个人中心
          </Link>
        </div>
      </div>
    </div>
  );
}

