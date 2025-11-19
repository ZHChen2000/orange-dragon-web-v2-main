import AlipaySdk from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';

// 支付宝配置
const alipayConfig = {
  appId: process.env.ALIPAY_APP_ID || '',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
  alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || '',
  gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do',
  signType: 'RSA2' as const,
  charset: 'utf-8',
  version: '1.0',
};

// 初始化支付宝 SDK
let alipaySdk: AlipaySdk | null = null;

export function getAlipaySdk(): AlipaySdk {
  if (!alipaySdk) {
    if (!alipayConfig.appId || !alipayConfig.privateKey) {
      throw new Error('支付宝配置不完整，请检查环境变量 ALIPAY_APP_ID 和 ALIPAY_PRIVATE_KEY');
    }
    
    alipaySdk = new AlipaySdk({
      appId: alipayConfig.appId,
      privateKey: alipayConfig.privateKey,
      alipayPublicKey: alipayConfig.alipayPublicKey,
      gateway: alipayConfig.gateway,
      signType: alipayConfig.signType,
      charset: alipayConfig.charset,
      version: alipayConfig.version,
    });
  }
  
  return alipaySdk;
}

/**
 * 创建支付宝支付表单
 */
export async function createAlipayPaymentForm(
  orderNo: string,
  amount: number,
  subject: string,
  body: string,
  returnUrl: string,
  notifyUrl: string
): Promise<string> {
  const sdk = getAlipaySdk();
  const formData = new AlipayFormData();
  
  formData.setMethod('get');
  formData.addField('bizContent', {
    out_trade_no: orderNo,
    product_code: 'FAST_INSTANT_TRADE_PAY',
    total_amount: (amount / 100).toFixed(2), // 转换为元
    subject: subject,
    body: body,
  });
  
  formData.addField('returnUrl', returnUrl);
  formData.addField('notifyUrl', notifyUrl);
  
  const result = await sdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData }
  );
  
  return result as string;
}

/**
 * 验证支付宝回调签名
 */
export function verifyAlipaySign(params: Record<string, any>): boolean {
  try {
    const sdk = getAlipaySdk();
    return sdk.checkNotifySign(params);
  } catch (error) {
    console.error('支付宝签名验证失败:', error);
    return false;
  }
}

