import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/jwt';

// 标记为动态路由
export const dynamic = 'force-dynamic';

// 订阅价格配置（单位：分）
const PRICING: Record<'monthly' | 'yearly', number> = {
  monthly: 1000, // 10元 = 1000分
  yearly: 9900,  // 99元 = 9900分
};

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

    const { type } = await request.json();

    if (!type || (type !== 'monthly' && type !== 'yearly')) {
      return NextResponse.json(
        { error: '无效的订阅类型' },
        { status: 400 }
      );
    }

    const subscriptionType = type as 'monthly' | 'yearly';

    await connectDB();

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
    const expiresAt = new Date();
    if (subscriptionType === 'monthly') {
      expiresAt.setMonth(now.getMonth() + 1);
    } else {
      expiresAt.setFullYear(now.getFullYear() + 1);
    }

    // 生成订单号（确保在创建订单前就生成）
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const orderNo = `ORD${timestamp}${random}`;

    // 创建订单
    const order = new Order({
      userId: user._id,
      orderNo: orderNo, // 直接设置订单号，不依赖 pre-save hook
      type: subscriptionType,
      amount: PRICING[subscriptionType],
      status: 'pending',
      paymentMethod: 'alipay',
      expiresAt,
    });

    await order.save();

    return NextResponse.json(
      {
        order: {
          id: order._id.toString(),
          orderNo: order.orderNo,
          type: order.type,
          amount: order.amount,
          amountYuan: (order.amount / 100).toFixed(2),
          status: order.status,
          expiresAt: order.expiresAt?.toISOString(),
        },
        paymentUrl: `/membership/pay?orderNo=${order.orderNo}`, // 支付页面 URL
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('创建订单错误:', error);
    
    // 处理 Mongoose 验证错误
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: `订单验证失败: ${errors.join(', ')}` },
        { status: 400 }
      );
    }
    
    // 处理重复订单号错误
    if (error.code === 11000) {
      return NextResponse.json(
        { error: '订单号已存在，请重试' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || '创建订单失败，请稍后重试' },
      { status: 500 }
    );
  }
}

