/**
 * 会员权限检查工具函数
 */

export type MembershipType = 'none' | 'monthly' | 'yearly';
export type MembershipStatus = 'none' | 'active' | 'expired';

export interface MembershipInfo {
  type: MembershipType;
  status: MembershipStatus;
  expiresAt?: string;
  isActive: boolean;
}

/**
 * 检查会员是否有效
 */
export function isMemberActive(membership: MembershipInfo | null | undefined): boolean {
  if (!membership) return false;
  if (membership.status !== 'active') return false;
  if (!membership.expiresAt) return false;
  
  const expiresAt = new Date(membership.expiresAt);
  return new Date() < expiresAt;
}

/**
 * 获取会员类型显示名称
 */
export function getMembershipTypeName(type: MembershipType): string {
  switch (type) {
    case 'monthly':
      return '月付会员';
    case 'yearly':
      return '年付会员';
    default:
      return '普通用户';
  }
}

/**
 * 格式化会员到期时间
 */
export function formatMembershipExpiresAt(expiresAt?: string): string {
  if (!expiresAt) return '未开通';
  
  const date = new Date(expiresAt);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

