import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export type MembershipType = 'none' | 'monthly' | 'yearly';
export type MembershipStatus = 'active' | 'expired' | 'none';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  avatar?: string;
  loginCount: number;
  lastLoginAt?: Date;
  membershipType: MembershipType;
  membershipStatus: MembershipStatus;
  membershipExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isMemberActive(): boolean;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, '邮箱是必填项'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, '请输入有效的邮箱地址'],
    },
    password: {
      type: String,
      required: [true, '密码是必填项'],
      minlength: [6, '密码长度至少为6位'],
    },
    name: {
      type: String,
      required: [true, '姓名是必填项'],
      trim: true,
    },
    avatar: {
      type: String,
      default: '', // 默认头像，可以使用默认头像 URL 或空字符串
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    lastLoginAt: {
      type: Date,
    },
    membershipType: {
      type: String,
      enum: ['none', 'monthly', 'yearly'],
      default: 'none',
    },
    membershipStatus: {
      type: String,
      enum: ['none', 'active', 'expired'],
      default: 'none',
    },
    membershipExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// 在保存前加密密码
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordString = String(this.password);
    this.password = await bcrypt.hash(passwordString, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// 比较密码的方法
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 检查会员是否有效
UserSchema.methods.isMemberActive = function (): boolean {
  if (this.membershipStatus !== 'active') {
    return false;
  }
  if (!this.membershipExpiresAt) {
    return false;
  }
  return new Date() < this.membershipExpiresAt;
};

// 确保模型只被创建一次
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

