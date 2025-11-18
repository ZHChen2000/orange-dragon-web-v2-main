# Vercel 部署指南

## 为什么部署失败？

Vercel 部署失败的主要原因通常是：**环境变量未配置**。

## 解决步骤

### 第 1 步：登录 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 使用 GitHub 账号登录

### 第 2 步：进入项目设置

1. 找到你的项目：`orange-dragon-web-v2-main`
2. 点击项目进入详情页
3. 点击顶部菜单的 **"Settings"**（设置）

### 第 3 步：配置环境变量

1. 在左侧菜单中找到 **"Environment Variables"**（环境变量）
2. 点击进入环境变量配置页面

### 第 4 步：添加环境变量

需要添加以下两个环境变量：

#### 1. MONGODB_URI

- **Key（键）**: `MONGODB_URI`
- **Value（值）**: 你的 MongoDB Atlas 连接字符串
  ```
  mongodb+srv://zhchen2000_db_user:S2OHpqI5AvLN0JPj@cluster0.5kmve1q.mongodb.net/orange-dragon-web?retryWrites=true&w=majority
  ```
- **Environment（环境）**: 选择所有环境（Production、Preview、Development）

#### 2. JWT_SECRET

- **Key（键）**: `JWT_SECRET`
- **Value（值）**: 你的 JWT 密钥
  ```
  JsiDr1WS8MhW30/dwb8R5Iada+TPhFLcjEVk0zmak+c=
  ```
- **Environment（环境）**: 选择所有环境（Production、Preview、Development）

### 第 5 步：保存并重新部署

1. 点击 **"Save"**（保存）按钮
2. 回到项目首页
3. 点击右上角的 **"Redeploy"**（重新部署）按钮
4. 选择 **"Use existing Build Cache"** 或 **"Redeploy"**
5. 等待部署完成

## 详细操作步骤（带截图说明）

### 添加环境变量

1. **进入项目设置**
   ```
   项目首页 → Settings → Environment Variables
   ```

2. **添加第一个环境变量**
   - 点击 **"Add New"** 按钮
   - Key: `MONGODB_URI`
   - Value: 粘贴你的 MongoDB 连接字符串
   - Environment: 勾选 ✅ Production、✅ Preview、✅ Development
   - 点击 **"Save"**

3. **添加第二个环境变量**
   - 再次点击 **"Add New"** 按钮
   - Key: `JWT_SECRET`
   - Value: 粘贴你的 JWT 密钥
   - Environment: 勾选 ✅ Production、✅ Preview、✅ Development
   - 点击 **"Save"**

4. **确认环境变量已添加**
   - 你应该看到两个环境变量：
     - `MONGODB_URI`
     - `JWT_SECRET`

### 重新部署

1. **触发重新部署**
   - 方法 1：在项目首页点击 **"Redeploy"**
   - 方法 2：推送新的代码到 GitHub（会自动触发部署）
   - 方法 3：在 "Deployments" 页面，点击最新部署右侧的 **"..."** → **"Redeploy"**

2. **等待部署完成**
   - 部署通常需要 1-3 分钟
   - 可以在 "Deployments" 页面查看部署进度

## 验证部署是否成功

部署成功后，你应该看到：

1. ✅ **绿色勾号**：表示部署成功
2. **访问链接**：点击 "Visit" 可以访问你的网站
3. **功能测试**：
   - 访问注册页面：`https://your-domain.vercel.app/register`
   - 注册一个新用户
   - 登录测试
   - 访问资料下载页面（需要登录）

## 常见问题

### Q: 部署仍然失败怎么办？

1. **检查环境变量是否正确**
   - 确认 MONGODB_URI 格式正确
   - 确认 JWT_SECRET 已设置
   - 确认环境变量已应用到所有环境（Production、Preview、Development）

2. **查看部署日志**
   - 在 Vercel Dashboard → Deployments → 点击失败的部署
   - 查看 "Build Logs" 和 "Function Logs"
   - 查找错误信息

3. **常见错误**
   - `MONGODB_URI is not defined` → 环境变量未配置
   - `Connection timeout` → MongoDB Atlas 网络访问未配置
   - `Authentication failed` → 数据库用户名或密码错误

### Q: 如何更新环境变量？

1. 进入 Settings → Environment Variables
2. 找到要更新的环境变量
3. 点击右侧的 **"Edit"** 按钮
4. 修改 Value
5. 点击 **"Save"**
6. **重要**：需要重新部署才能生效

### Q: 环境变量在哪里查看？

- Vercel Dashboard → 项目 → Settings → Environment Variables

### Q: 部署后网站无法连接数据库？

1. 检查 MongoDB Atlas 网络访问设置
   - 确保已添加 `0.0.0.0/0`（允许所有 IP）
   - 或者添加 Vercel 的 IP 地址

2. 检查环境变量
   - 确认 MONGODB_URI 在 Vercel 中已正确配置
   - 确认已重新部署

## 安全提示

⚠️ **重要**：
- 不要在代码中硬编码环境变量
- 不要将 `.env.local` 文件提交到 Git
- 生产环境使用强密码和安全的 JWT_SECRET
- 定期更新密码和密钥

## 完成！

配置完成后，你的网站应该可以正常部署和运行了！

如果还有问题，请查看 Vercel 的部署日志，或者告诉我具体的错误信息。

