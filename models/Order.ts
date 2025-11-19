import mongoose, { Schema, Document, Model } from 'mongoose';

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled';
export type OrderType = 'monthly' | 'yearly';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  orderNo: string; // 订单号
  type: OrderType; // 订阅类型
  amount: number; // 金额（分）
  status: OrderStatus;
  paymentMethod: string; // 支付方式
  paymentNo?: string; // 支付流水号
  paidAt?: Date;
  expiresAt?: Date; // 会员到期时间
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNo: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'alipay',
    },
    paymentNo: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// 生成订单号
OrderSchema.pre('save', async function (next) {
  if (!this.orderNo) {
    // 生成订单号：时间戳 + 随机数
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNo = `ORD${timestamp}${random}`;
  }
  next();
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

