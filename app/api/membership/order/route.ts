import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
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

    const { searchParams } = new URL(request.url);
    const orderNo = searchParams.get('orderNo');

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
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('获取订单信息错误:', error);
    return NextResponse.json(
      { error: error.message || '获取订单信息失败' },
      { status: 500 }
    );
  }
}

