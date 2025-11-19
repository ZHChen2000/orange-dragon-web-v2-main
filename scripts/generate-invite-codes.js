/**
 * 生成测试邀请码脚本 (JavaScript 版本)
 * 
 * 使用方法：
 * 1. 确保已设置 MONGODB_URI 环境变量（在 .env.local 文件中）
 * 2. 运行: node scripts/generate-invite-codes.js
 * 
 * 或者使用 npm script:
 * npm run generate-invite-codes-js
 */

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || '';

// 定义邀请码 Schema（简化版，用于脚本）
const InviteCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  membershipType: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  usedAt: {
    type: Date,
    default: null,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

const InviteCode = mongoose.models.InviteCode || mongoose.model('InviteCode', InviteCodeSchema);

// 生成邀请码
function generateInviteCode(prefix, index) {
  const paddedIndex = index.toString().padStart(2, '0');
  return `${prefix}${paddedIndex}`;
}

// 生成测试邀请码
async function generateTestInviteCodes() {
  try {
    // 连接数据库
    if (!MONGODB_URI) {
      throw new Error('请设置 MONGODB_URI 环境变量（在 .env.local 文件中）');
    }

    console.log('正在连接数据库...');
    await mongoose.connect(MONGODB_URI);
    console.log('数据库连接成功！\n');

    // 检查是否已存在邀请码
    const existingCount = await InviteCode.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  警告：数据库中已存在 ${existingCount} 个邀请码`);
      console.log('脚本将继续运行，重复的邀请码将被跳过...\n');
    }

    // 生成月付会员邀请码（10个）
    const monthlyCodes = [];
    for (let i = 1; i <= 10; i++) {
      const code = generateInviteCode('TEST2024MONTH', i);
      monthlyCodes.push(code);
    }

    // 生成年付会员邀请码（10个）
    const yearlyCodes = [];
    for (let i = 1; i <= 10; i++) {
      const code = generateInviteCode('TEST2024YEAR', i);
      yearlyCodes.push(code);
    }

    // 插入月付会员邀请码
    console.log('正在创建月付会员邀请码...');
    const monthlyInviteCodes = monthlyCodes.map(code => ({
      code,
      membershipType: 'monthly',
      used: false,
    }));

    try {
      await InviteCode.insertMany(monthlyInviteCodes, { ordered: false });
      console.log(`✓ 成功创建 ${monthlyCodes.length} 个月付会员邀请码\n`);
    } catch (error) {
      if (error.code === 11000) {
        console.log(`⚠️  部分月付会员邀请码已存在，已跳过重复项\n`);
      } else {
        throw error;
      }
    }

    // 插入年付会员邀请码
    console.log('正在创建年付会员邀请码...');
    const yearlyInviteCodes = yearlyCodes.map(code => ({
      code,
      membershipType: 'yearly',
      used: false,
    }));

    try {
      await InviteCode.insertMany(yearlyInviteCodes, { ordered: false });
      console.log(`✓ 成功创建 ${yearlyCodes.length} 个年付会员邀请码\n`);
    } catch (error) {
      if (error.code === 11000) {
        console.log(`⚠️  部分年付会员邀请码已存在，已跳过重复项\n`);
      } else {
        throw error;
      }
    }

    // 显示所有生成的邀请码
    console.log('='.repeat(60));
    console.log('生成的邀请码列表：');
    console.log('='.repeat(60));
    console.log('\n月付会员邀请码：');
    monthlyCodes.forEach((code, index) => {
      console.log(`${(index + 1).toString().padStart(2, '0')}. ${code}`);
    });

    console.log('\n年付会员邀请码：');
    yearlyCodes.forEach((code, index) => {
      console.log(`${(index + 1).toString().padStart(2, '0')}. ${code}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log(`总计：${monthlyCodes.length + yearlyCodes.length} 个邀请码`);
    console.log('='.repeat(60));

    // 验证插入结果
    const totalCount = await InviteCode.countDocuments();
    const unusedCount = await InviteCode.countDocuments({ used: false });
    console.log(`\n数据库统计：`);
    console.log(`- 总邀请码数：${totalCount}`);
    console.log(`- 未使用数：${unusedCount}`);
    console.log(`- 已使用数：${totalCount - unusedCount}`);

    console.log('\n✅ 邀请码生成完成！');

  } catch (error) {
    console.error('❌ 生成邀请码失败：', error.message);
    console.error('\n请确保：');
    console.error('1. 已创建 .env.local 文件');
    console.error('2. 已设置 MONGODB_URI 环境变量');
    console.error('3. MongoDB 数据库可以正常连接');
    process.exit(1);
  } finally {
    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('\n数据库连接已关闭');
  }
}

// 运行脚本
generateTestInviteCodes();

