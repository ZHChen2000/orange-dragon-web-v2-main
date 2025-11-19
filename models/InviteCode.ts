import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInviteCode extends Document {
  code: string;
  membershipType: 'monthly' | 'yearly';
  used: boolean;
  usedBy?: mongoose.Types.ObjectId;
  usedAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

const InviteCodeSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: [true, '邀请码是必填项'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    membershipType: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: [true, '会员类型是必填项'],
    },
    used: {
      type: Boolean,
      default: false,
    },
    usedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    usedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null, // null 表示永不过期
    },
  },
  {
    timestamps: true,
  }
);

// 创建索引以提高查询性能
InviteCodeSchema.index({ code: 1, used: 1 });
InviteCodeSchema.index({ expiresAt: 1 });

// 确保模型只被创建一次
const InviteCode: Model<IInviteCode> = 
  mongoose.models.InviteCode || mongoose.model<IInviteCode>('InviteCode', InviteCodeSchema);

export default InviteCode;

