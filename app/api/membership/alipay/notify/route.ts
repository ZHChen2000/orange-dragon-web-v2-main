import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import { verifyAlipaySign } from '@/lib/alipay';

// 标记为动态路由
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 获取支付宝回调参数
    const formData = await request.formData();
    const params: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    // 验证签名
    const verified = verifyAlipaySign(params);
    if (!verified) {
      console.error('支付宝回调签名验证失败:', params);
      return NextResponse.text('fail', { status: 400 });
    }

    // 处理支付成功
    if (params.trade_status === 'TRADE_SUCCESS' || params.trade_status === 'TRADE_FINISHED') {
      const orderNo = params.out_trade_no;
      const tradeNo = params.trade_no; // 支付宝交易号
      const totalAmount = params.total_amount; // 支付金额（元）

      await connectDB();

      // 查找订单
      const order = await Order.findOne({ orderNo });
      
      if (!order) {
        console.error('订单不存在:', orderNo);
        return NextResponse.text('fail', { status: 404 });
      }

      // 验证订单金额（转换为分进行比较）
      const expectedAmount = (order.amount / 100).toFixed(2);
      if (totalAmount !== expectedAmount) {
        console.error('订单金额不匹配:', { totalAmount, expectedAmount });
        return NextResponse.text('fail', { status: 400 });
      }

      // 如果订单已支付，直接返回成功（防止重复处理）
      if (order.status === 'paid') {
        return NextResponse.text('success');
      }

      // 更新订单状态
      order.status = 'paid';
      order.paymentNo = tradeNo;
      order.paidAt = new Date();
      await order.save();

      // 更新用户会员信息
      const user = await User.findById(order.userId);
      if (user) {
        // 如果用户已有会员且未过期，延长到期时间；否则从当前时间开始
        const now = new Date();
        let newExpiresAt = order.expiresAt || new Date();
        
        if (user.membershipStatus === 'active' && user.membershipExpiresAt && user.membershipExpiresAt > now) {
          // 在现有到期时间基础上延长
          const currentExpiresAt = user.membershipExpiresAt;
          if (order.type === 'monthly') {
            newExpiresAt = new Date(currentExpiresAt);
            newExpiresAt.setMonth(newExpiresAt.getMonth() + 1);
          } else {
            newExpiresAt = new Date(currentExpiresAt);
            newExpiresAt.setFullYear(newExpiresAt.getFullYear() + 1);
          }
        }

        user.membershipType = order.type;
        user.membershipStatus = 'active';
        user.membershipExpiresAt = newExpiresAt;
        await user.save();
      }

      console.log('支付成功，订单已更新:', orderNo);
      return NextResponse.text('success');
    }

    // 其他状态（如 TRADE_CLOSED）也返回成功，避免支付宝重复通知
    return NextResponse.text('success');
  } catch (error: any) {
    console.error('支付宝回调处理错误:', error);
    return NextResponse.text('fail', { status: 500 });
  }
}

// 支付宝也可能使用 GET 方式回调（同步回调）
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const params: Record<string, any> = {};
  
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // 同步回调主要用于跳转，实际支付状态以异步通知为准
  // 这里只做基本验证
  if (params.trade_status === 'TRADE_SUCCESS' || params.trade_status === 'TRADE_FINISHED') {
    // 重定向到支付成功页面
    const orderNo = params.out_trade_no;
    return NextResponse.redirect(new URL(`/membership/success?orderNo=${orderNo}`, request.url));
  }

  return NextResponse.redirect(new URL('/membership', request.url));
}

