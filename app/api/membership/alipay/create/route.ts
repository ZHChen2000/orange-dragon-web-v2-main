import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/jwt';
import { createAlipayPaymentForm } from '@/lib/alipay';

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

    const { orderNo } = await request.json();

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

    if (order.status === 'paid') {
      return NextResponse.json(
        { error: '订单已支付' },
        { status: 400 }
      );
    }

    // 获取基础 URL（用于回调地址）
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    request.headers.get('origin') || 
                    'http://localhost:3000';

    // 创建支付宝支付表单
    const subject = order.type === 'monthly' ? '橙龙科技月付会员' : '橙龙科技年付会员';
    const body = `订阅${order.type === 'monthly' ? '月付' : '年付'}会员服务`;
    const returnUrl = `${baseUrl}/membership/success?orderNo=${orderNo}`;
    const notifyUrl = `${baseUrl}/api/membership/alipay/notify`;

    const paymentForm = await createAlipayPaymentForm(
      order.orderNo,
      order.amount,
      subject,
      body,
      returnUrl,
      notifyUrl
    );

    // 返回支付表单 HTML
    return new NextResponse(paymentForm, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error('创建支付宝支付表单错误:', error);
    
    // 如果支付宝未配置，返回错误信息
    if (error.message && error.message.includes('支付宝配置不完整')) {
      return NextResponse.json(
        { 
          error: '支付宝支付未配置，请联系管理员',
          details: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || '创建支付表单失败' },
      { status: 500 }
    );
  }
}

