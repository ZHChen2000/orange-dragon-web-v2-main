# 支付宝支付集成指南

## 当前状态

当前系统已实现完整的会员订阅功能，包括：
- ✅ 会员订阅页面
- ✅ 订单创建和管理
- ✅ 支付流程
- ✅ 会员状态管理
- ✅ 会员信息显示

**注意**：项目目前处于开发期，尚未上线生产环境。生产环境需要集成真实的支付宝支付。

## 集成真实支付宝支付

### 前置要求

1. **支付宝开放平台账号**
   - 访问：https://open.alipay.com/
   - 注册/登录企业账号
   - 完成企业认证

2. **创建应用**
   - 在开放平台创建"网页&移动应用"
   - 获取 APPID
   - 配置应用信息

3. **配置密钥**
   - 生成 RSA2 密钥对
   - 上传公钥到支付宝
   - 保存私钥（用于签名）

### 安装支付宝 SDK

```bash
npm install alipay-sdk
```

### 配置环境变量

在 `.env.local` 中添加：

```env
# 支付宝配置
ALIPAY_APP_ID=你的APPID
ALIPAY_PRIVATE_KEY=你的应用私钥
ALIPAY_PUBLIC_KEY=支付宝公钥
ALIPAY_GATEWAY=https://openapi.alipay.com/gateway.do  # 生产环境
# ALIPAY_GATEWAY=https://openapi.alipaydev.com/gateway.do  # 沙箱环境
ALIPAY_SIGN_TYPE=RSA2
ALIPAY_CHARSET=utf-8
ALIPAY_FORMAT=JSON
ALIPAY_VERSION=1.0
```

### 修改支付 API

更新 `app/api/membership/pay/route.ts`，使用真实的支付宝接口：

```typescript
import AlipaySdk from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';

// 初始化支付宝 SDK
const alipaySdk = new AlipaySdk({
  appId: process.env.ALIPAY_APP_ID!,
  privateKey: process.env.ALIPAY_PRIVATE_KEY!,
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY!,
  gateway: process.env.ALIPAY_GATEWAY!,
  signType: 'RSA2',
  charset: 'utf-8',
  version: '1.0',
});

// 创建支付订单
const formData = new AlipayFormData();
formData.setMethod('get');
formData.addField('bizContent', {
  outTradeNo: order.orderNo,
  productCode: 'FAST_INSTANT_TRADE_PAY',
  totalAmount: (order.amount / 100).toFixed(2),
  subject: order.type === 'monthly' ? '橙龙科技月付会员' : '橙龙科技年付会员',
  body: `订阅${order.type === 'monthly' ? '月付' : '年付'}会员服务`,
});
formData.addField('returnUrl', `${process.env.NEXT_PUBLIC_BASE_URL}/membership/success`);
formData.addField('notifyUrl', `${process.env.NEXT_PUBLIC_BASE_URL}/api/membership/alipay/notify`);

const result = await alipaySdk.exec(
  'alipay.trade.page.pay',
  {},
  { formData }
);

// 返回支付页面 HTML
return new NextResponse(result as string, {
  headers: { 'Content-Type': 'text/html' },
});
```

### 创建支付回调接口

创建 `app/api/membership/alipay/notify/route.ts`：

```typescript
import { NextRequest, NextResponse } from 'next/server';
import AlipaySdk from 'alipay-sdk';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

const alipaySdk = new AlipaySdk({
  // ... 配置
});

export async function POST(request: NextRequest) {
  try {
    const params = await request.json();
    
    // 验证签名
    const verified = alipaySdk.checkNotifySign(params);
    if (!verified) {
      return NextResponse.json({ error: '签名验证失败' }, { status: 400 });
    }

    // 处理支付成功
    if (params.trade_status === 'TRADE_SUCCESS') {
      const orderNo = params.out_trade_no;
      
      await connectDB();
      const order = await Order.findOne({ orderNo });
      
      if (order && order.status === 'pending') {
        // 更新订单状态
        order.status = 'paid';
        order.paymentNo = params.trade_no;
        order.paidAt = new Date();
        await order.save();

        // 更新用户会员信息
        const user = await User.findById(order.userId);
        if (user) {
          // ... 更新会员信息逻辑
        }
      }
    }

    return NextResponse.json('success');
  } catch (error) {
    console.error('支付回调错误:', error);
    return NextResponse.json({ error: '处理失败' }, { status: 500 });
  }
}
```

### 支付流程

1. **用户选择订阅计划** → `/membership`
2. **创建订单** → `POST /api/membership/create-order`
3. **跳转到支付页面** → `/membership/pay?orderNo=xxx`
4. **调用支付宝接口** → 生成支付表单
5. **用户完成支付** → 支付宝跳转回 `returnUrl`
6. **支付宝异步通知** → `POST /api/membership/alipay/notify`
7. **更新订单和会员状态**

## 当前开发期支付说明

项目目前处于开发期，支付流程如下：

1. 用户点击"确认支付"
2. 等待 2 秒（支付处理）
3. 调用 `POST /api/membership/pay` 更新订单状态
4. 自动更新用户会员信息
5. 跳转到支付成功页面

**开发期特点**：
- 无需配置支付宝账号即可测试
- 开发环境友好
- 可以快速验证功能

**生产环境要求**：
- 需要集成真实的支付宝支付
- 需要配置支付回调地址
- 需要完成企业认证

## 测试建议

### 开发期
- 使用当前的支付功能进行测试
- 测试完整的订阅流程
- 验证会员状态更新

### 生产环境
- 集成真实的支付宝支付
- 使用支付宝沙箱环境测试
- 配置支付回调地址
- 测试支付成功和失败场景

## 安全注意事项

1. **私钥保护**
   - 私钥存储在环境变量中
   - 不要提交到 Git
   - 定期更换密钥

2. **签名验证**
   - 所有支付回调必须验证签名
   - 防止伪造支付通知

3. **订单验证**
   - 验证订单金额
   - 验证订单状态
   - 防止重复支付

4. **HTTPS**
   - 生产环境必须使用 HTTPS
   - 保护支付数据传输

## 相关文档

- [支付宝开放平台](https://open.alipay.com/)
- [支付宝文档](https://opendocs.alipay.com/)
- [网页支付文档](https://opendocs.alipay.com/open/270/105898)

## 支持

如有问题，请联系技术支持或查看支付宝开放平台文档。

