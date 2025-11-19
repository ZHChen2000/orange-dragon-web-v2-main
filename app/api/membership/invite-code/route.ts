import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import InviteCode from '@/models/InviteCode';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

// 标记为动态路由
export const dynamic = 'force-dynamic';

// 验证邀请码
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: '邀请码不能为空' },
        { status: 400 }
      );
    }

    await connectDB();

    const inviteCode = await InviteCode.findOne({ code: code.toUpperCase() });

    if (!inviteCode) {
      return NextResponse.json(
        { error: '邀请码不存在' },
        { status: 404 }
      );
    }

    if (inviteCode.used) {
      return NextResponse.json(
        { error: '邀请码已被使用' },
        { status: 400 }
      );
    }

    // 检查是否过期
    if (inviteCode.expiresAt && new Date() > inviteCode.expiresAt) {
      return NextResponse.json(
        { error: '邀请码已过期' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      code: inviteCode.code,
      membershipType: inviteCode.membershipType,
    });
  } catch (error: any) {
    console.error('验证邀请码错误:', error);
    return NextResponse.json(
      { error: error.message || '验证邀请码失败' },
      { status: 500 }
    );
  }
}

// 使用邀请码
export async function POST(request: NextRequest) {
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

    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: '邀请码不能为空' },
        { status: 400 }
      );
    }

    await connectDB();

    // 查找邀请码
    const inviteCode = await InviteCode.findOne({ code: code.toUpperCase() });

    if (!inviteCode) {
      return NextResponse.json(
        { error: '邀请码不存在' },
        { status: 404 }
      );
    }

    if (inviteCode.used) {
      return NextResponse.json(
        { error: '邀请码已被使用' },
        { status: 400 }
      );
    }

    // 检查是否过期
    if (inviteCode.expiresAt && new Date() > inviteCode.expiresAt) {
      return NextResponse.json(
        { error: '邀请码已过期' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    // 计算会员到期时间
    const now = new Date();
    let newExpiresAt = new Date();
    
    // 判断是否是续费（在更新之前保存原始状态）
    const wasActive = user.membershipStatus === 'active' && user.membershipExpiresAt && user.membershipExpiresAt > now;
    const isRenewal = wasActive;

    if (wasActive && user.membershipExpiresAt) {
      // 如果用户已有会员且未过期，在现有到期时间基础上延长
      const currentExpiresAt = user.membershipExpiresAt;
      if (inviteCode.membershipType === 'monthly') {
        newExpiresAt = new Date(currentExpiresAt);
        newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);
      } else {
        newExpiresAt = new Date(currentExpiresAt);
        newExpiresAt.setFullYear(newExpiresAt.getFullYear() + 1);
      }
    } else {
      // 如果用户没有会员或已过期，从当前时间开始计算
      if (inviteCode.membershipType === 'monthly') {
        newExpiresAt = new Date(now);
        newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);
      } else {
        newExpiresAt = new Date(now);
        newExpiresAt.setFullYear(newExpiresAt.getFullYear() + 1);
      }
    }

    // 使用事务确保数据一致性
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 标记邀请码为已使用
      inviteCode.used = true;
      inviteCode.usedBy = user._id;
      inviteCode.usedAt = new Date();
      await inviteCode.save({ session });

      // 更新用户会员信息
      user.membershipType = inviteCode.membershipType;
      user.membershipStatus = 'active';
      user.membershipExpiresAt = newExpiresAt;
      await user.save({ session });

      await session.commitTransaction();

      return NextResponse.json({
        success: true,
        message: isRenewal ? '邀请码使用成功，会员已续费' : '邀请码使用成功，会员已激活',
        isRenewal,
        membership: {
          type: user.membershipType,
          status: user.membershipStatus,
          expiresAt: user.membershipExpiresAt?.toISOString(),
        },
      });
    } catch (error: any) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error: any) {
    console.error('使用邀请码错误:', error);
    return NextResponse.json(
      { error: error.message || '使用邀请码失败' },
      { status: 500 }
    );
  }
}

