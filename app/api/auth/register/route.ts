import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // 验证输入
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: '请填写所有字段' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6位' },
        { status: 400 }
      );
    }

    // 连接数据库
    await connectDB();

    // 检查用户是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 创建新用户
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    // 生成 token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // 返回用户信息（不包含密码）
    return NextResponse.json(
      {
        message: '注册成功',
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          avatar: user.avatar || '',
          loginCount: user.loginCount || 0,
          createdAt: user.createdAt.toISOString(),
          membershipType: user.membershipType || 'none',
          membershipStatus: user.membershipStatus || 'none',
          membershipExpiresAt: user.membershipExpiresAt?.toISOString(),
        },
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: error.message || '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}

