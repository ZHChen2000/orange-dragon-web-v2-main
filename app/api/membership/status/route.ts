import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

// 标记为动态路由
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: '无效的 token' },
        { status: 401 }
      );
    }

    await connectDB();

    // 查找用户
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    // 检查会员是否过期
    const isActive = user.isMemberActive();
    if (!isActive && user.membershipStatus === 'active') {
      user.membershipStatus = 'expired';
      await user.save();
    }

    return NextResponse.json(
      {
        membership: {
          type: user.membershipType,
          status: user.membershipStatus,
          expiresAt: user.membershipExpiresAt?.toISOString(),
          isActive: user.isMemberActive(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('获取会员状态错误:', error);
    return NextResponse.json(
      { error: error.message || '获取会员状态失败' },
      { status: 500 }
    );
  }
}

