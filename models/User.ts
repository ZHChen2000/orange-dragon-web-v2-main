import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
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

// 确保模型只被创建一次
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

