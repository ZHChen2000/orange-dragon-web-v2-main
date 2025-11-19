import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/jwt';

// 标记为动态路由
export const dynamic = 'force-dynamic';

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

    const { orderNo, paymentNo } = await request.json();

    if (!orderNo) {
      return NextResponse.json(
        { error: '订单号不能为空' },
        { status: 400 }
      );
    }

    await connectDB();

    // 查找订单
    const order = await Order.findOne({ orderNo, userId: payload.userId });
    if (!order) {
      return NextResponse.json(
        { error: '订单不存在' },
        { status: 404 }
      );
    }

    // 检查订单状态
    if (order.status === 'paid') {
      return NextResponse.json(
        { error: '订单已支付，请勿重复支付' },
        { status: 400 }
      );
    }

    if (order.status === 'cancelled') {
      return NextResponse.json(
        { error: '订单已取消，无法支付' },
        { status: 400 }
      );
    }

    // 支付处理（开发期：项目尚未上线生产环境）
    // 生成支付流水号
    const paymentNumber = paymentNo || `DEV${Date.now()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // 更新订单状态为已支付
    order.status = 'paid';
    order.paymentNo = paymentNumber;
    order.paidAt = new Date();
    await order.save();

    // 更新用户会员信息
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    // 计算会员到期时间
    const now = new Date();
    let newExpiresAt = order.expiresAt || new Date();
    
    if (user.membershipStatus === 'active' && user.membershipExpiresAt && user.membershipExpiresAt > now) {
      // 如果用户已有会员且未过期，在现有到期时间基础上延长
      const currentExpiresAt = user.membershipExpiresAt;
      if (order.type === 'monthly') {
        newExpiresAt = new Date(currentExpiresAt);
        newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);
      } else {
        newExpiresAt = new Date(currentExpiresAt);
        newExpiresAt.setFullYear(newExpiresAt.getFullYear() + 1);
      }
    } else {
      // 如果用户没有会员或已过期，从当前时间开始计算
      if (order.type === 'monthly') {
        newExpiresAt = new Date(now);
        newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);
      } else {
        newExpiresAt = new Date(now);
        newExpiresAt.setFullYear(newExpiresAt.getFullYear() + 1);
      }
    }

    // 更新用户会员信息
    user.membershipType = order.type;
    user.membershipStatus = 'active';
    user.membershipExpiresAt = newExpiresAt;
    await user.save();

    return NextResponse.json(
      {
        message: '支付成功',
        order: {
          orderNo: order.orderNo,
          status: order.status,
          paymentNo: order.paymentNo,
          paidAt: order.paidAt?.toISOString(),
        },
        membership: {
          type: user.membershipType,
          status: user.membershipStatus,
          expiresAt: user.membershipExpiresAt?.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('支付处理错误:', error);
    return NextResponse.json(
      { error: error.message || '支付处理失败' },
      { status: 500 }
    );
  }
}

