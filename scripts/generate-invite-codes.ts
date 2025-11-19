/**
 * 生成测试邀请码脚本
 * 
 * 使用方法：
 * 1. 确保已设置 MONGODB_URI 环境变量
 * 2. 运行: npx ts-node scripts/generate-invite-codes.ts
 * 
 * 或者使用 npm script:
 * npm run generate-invite-codes
 */

import mongoose from 'mongoose';
import InviteCode from '../models/InviteCode';

const MONGODB_URI = process.env.MONGODB_URI || '';

// 生成随机邀请码
function generateInviteCode(prefix: string, index: number): string {
  const paddedIndex = index.toString().padStart(2, '0');
  return `${prefix}${paddedIndex}`;
}

// 生成测试邀请码
async function generateTestInviteCodes() {
  try {
    // 连接数据库
    if (!MONGODB_URI) {
      throw new Error('请设置 MONGODB_URI 环境变量');
    }

    console.log('正在连接数据库...');
    await mongoose.connect(MONGODB_URI);
    console.log('数据库连接成功！\n');

    // 检查是否已存在邀请码
    const existingCount = await InviteCode.countDocuments();
    if (existingCount > 0) {
      console.log(`警告：数据库中已存在 ${existingCount} 个邀请码`);
      console.log('是否继续？(y/n)');
      // 在实际使用中，可以添加交互式确认
    }

    // 生成月付会员邀请码（10个）
    const monthlyCodes: string[] = [];
    for (let i = 1; i <= 10; i++) {
      const code = generateInviteCode('TEST2024MONTH', i);
      monthlyCodes.push(code);
    }

    // 生成年付会员邀请码（10个）
    const yearlyCodes: string[] = [];
    for (let i = 1; i <= 10; i++) {
      const code = generateInviteCode('TEST2024YEAR', i);
      yearlyCodes.push(code);
    }

    // 插入月付会员邀请码
    console.log('正在创建月付会员邀请码...');
    const monthlyInviteCodes = monthlyCodes.map(code => ({
      code,
      membershipType: 'monthly' as const,
      used: false,
    }));

    await InviteCode.insertMany(monthlyInviteCodes, { ordered: false });
    console.log(`✓ 成功创建 ${monthlyCodes.length} 个月付会员邀请码\n`);

    // 插入年付会员邀请码
    console.log('正在创建年付会员邀请码...');
    const yearlyInviteCodes = yearlyCodes.map(code => ({
      code,
      membershipType: 'yearly' as const,
      used: false,
    }));

    await InviteCode.insertMany(yearlyInviteCodes, { ordered: false });
    console.log(`✓ 成功创建 ${yearlyCodes.length} 个年付会员邀请码\n`);

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

  } catch (error: any) {
    console.error('❌ 生成邀请码失败：', error.message);
    
    // 处理重复键错误
    if (error.code === 11000) {
      console.error('\n提示：部分邀请码已存在，已跳过重复项');
    }
    
    process.exit(1);
  } finally {
    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('\n数据库连接已关闭');
  }
}

// 运行脚本
if (require.main === module) {
  generateTestInviteCodes();
}

export default generateTestInviteCodes;

