# 邀请码使用指南

## 📋 概述

邀请码系统允许用户通过输入邀请码来免费激活会员资格。每个邀请码只能使用一次，使用后会被标记为已使用。

## 🎯 功能特点

- ✅ 每个邀请码只能使用一次
- ✅ 支持月付会员和年付会员两种类型
- ✅ 邀请码存储在数据库中，安全可靠
- ✅ 自动验证邀请码有效性
- ✅ 如果用户已有会员，会在现有到期时间基础上延长

## 📝 使用方法

### 用户使用流程

1. **登录账户**
   - 确保已登录您的账户

2. **访问会员页面**
   - 导航到 `/membership` 页面

3. **输入邀请码**
   - 在"使用邀请码"区域输入您的邀请码
   - 邀请码会自动转换为大写格式

4. **验证邀请码**
   - 点击"验证"按钮检查邀请码是否有效
   - 系统会显示验证结果：
     - ✅ 有效：显示可兑换的会员类型（月付/年付）
     - ❌ 无效：显示错误原因（已使用、不存在、已过期等）

5. **兑换会员**
   - 如果邀请码有效，点击"兑换月付会员"或"兑换年付会员"按钮
   - 系统会自动激活您的会员资格
   - 会员到期时间会根据邀请码类型设置

### 邀请码格式

- 邀请码为8-16位大写字母和数字组合
- 示例：`INVITE2024ABC`、`TEST12345678`

## 🔧 管理员操作

### 创建邀请码

邀请码需要通过数据库操作或管理脚本创建。参考 `scripts/generate-invite-codes.ts` 脚本。

### 邀请码数据结构

```typescript
{
  code: string;              // 邀请码（唯一，大写）
  membershipType: 'monthly' | 'yearly';  // 会员类型
  used: boolean;             // 是否已使用
  usedBy?: ObjectId;         // 使用者ID
  usedAt?: Date;             // 使用时间
  expiresAt?: Date;           // 过期时间（可选，null表示永不过期）
  createdAt: Date;           // 创建时间
  updatedAt: Date;           // 更新时间
}
```

### API 接口

#### 1. 验证邀请码

**GET** `/api/membership/invite-code?code=INVITE_CODE`

**响应示例：**
```json
{
  "valid": true,
  "code": "INVITE2024ABC",
  "membershipType": "monthly"
}
```

#### 2. 使用邀请码

**POST** `/api/membership/invite-code`

**请求头：**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**请求体：**
```json
{
  "code": "INVITE2024ABC"
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "邀请码使用成功",
  "membership": {
    "type": "monthly",
    "status": "active",
    "expiresAt": "2024-02-01T00:00:00.000Z"
  }
}
```

## ⚠️ 注意事项

1. **每个邀请码只能使用一次**
   - 使用后无法再次使用
   - 系统会记录使用者信息和使用时间

2. **会员到期时间计算**
   - 如果用户没有会员或会员已过期：从当前时间开始计算
   - 如果用户已有会员且未过期：在现有到期时间基础上延长

3. **邀请码过期**
   - 如果设置了 `expiresAt`，过期后无法使用
   - 未设置过期时间的邀请码永久有效

4. **并发安全**
   - 使用 MongoDB 事务确保邀请码使用的原子性
   - 防止同一邀请码被多个用户同时使用

## 🐛 常见问题

### Q: 邀请码显示"已被使用"怎么办？
A: 每个邀请码只能使用一次。如果您之前已经使用过该邀请码，将无法再次使用。

### Q: 邀请码显示"不存在"怎么办？
A: 请检查邀请码是否正确输入。邀请码不区分大小写，系统会自动转换为大写。

### Q: 邀请码显示"已过期"怎么办？
A: 该邀请码已超过有效期。请联系管理员获取新的邀请码。

### Q: 使用邀请码后会员没有激活？
A: 请刷新页面或重新登录。如果问题仍然存在，请联系技术支持。

## 📊 测试邀请码

以下是为测试准备的20个邀请码（已包含在生成脚本中）：

### 月付会员邀请码（10个）
1. `TEST2024MONTH01`
2. `TEST2024MONTH02`
3. `TEST2024MONTH03`
4. `TEST2024MONTH04`
5. `TEST2024MONTH05`
6. `TEST2024MONTH06`
7. `TEST2024MONTH07`
8. `TEST2024MONTH08`
9. `TEST2024MONTH09`
10. `TEST2024MONTH10`

### 年付会员邀请码（10个）
1. `TEST2024YEAR01`
2. `TEST2024YEAR02`
3. `TEST2024YEAR03`
4. `TEST2024YEAR04`
5. `TEST2024YEAR05`
6. `TEST2024YEAR06`
7. `TEST2024YEAR07`
8. `TEST2024YEAR08`
9. `TEST2024YEAR09`
10. `TEST2024YEAR10`

**注意**：这些测试邀请码需要先运行生成脚本才能使用。脚本会将这些邀请码插入到数据库中。

## 🚀 生成测试邀请码

运行以下命令生成测试邀请码：

```bash
# 使用 Node.js 运行脚本
npx ts-node scripts/generate-invite-codes.ts
```

或者使用 npm script（如果已配置）：

```bash
npm run generate-invite-codes
```

## 📚 相关文件

- `models/InviteCode.ts` - 邀请码数据模型
- `app/api/membership/invite-code/route.ts` - 邀请码API接口
- `app/membership/page.tsx` - 会员页面（包含邀请码输入）
- `scripts/generate-invite-codes.ts` - 生成邀请码脚本

## 🔒 安全建议

1. **邀请码生成**
   - 使用足够长度的随机字符串
   - 避免使用可预测的模式
   - 定期更换生成算法

2. **访问控制**
   - 邀请码创建接口应该限制为管理员权限
   - 记录所有邀请码的使用日志

3. **数据保护**
   - 定期备份邀请码数据
   - 监控异常使用模式

## 📞 技术支持

如有问题，请联系技术支持或查看相关文档。

