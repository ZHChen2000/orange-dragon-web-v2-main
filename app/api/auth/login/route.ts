import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: '请填写所有字段' },
        { status: 400 }
      );
    }

    // 连接数据库
    await connectDB();

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: '邮箱或密码错误' },
        { status: 401 }
      );
    }

    // 更新登录次数和最后登录时间
    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLoginAt = new Date();
    
    // 检查会员是否过期
    const isActive = user.isMemberActive();
    if (!isActive && user.membershipStatus === 'active') {
      user.membershipStatus = 'expired';
    }
    
    await user.save();

    // 生成 token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // 返回用户信息（不包含密码）
    return NextResponse.json(
      {
        message: '登录成功',
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          avatar: user.avatar || '',
          loginCount: user.loginCount,
          lastLoginAt: user.lastLoginAt?.toISOString(),
          createdAt: user.createdAt.toISOString(),
          membershipType: user.membershipType || 'none',
          membershipStatus: user.membershipStatus || 'none',
          membershipExpiresAt: user.membershipExpiresAt?.toISOString(),
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { error: error.message || '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}

