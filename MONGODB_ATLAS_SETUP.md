# MongoDB Atlas 设置指南（推荐）

## 为什么选择 MongoDB Atlas？

- ✅ **完全免费**：提供 512MB 免费存储空间
- ✅ **无需安装**：云端数据库，无需本地安装 MongoDB
- ✅ **易于使用**：图形化界面，简单易用
- ✅ **跨设备访问**：可在任何地方访问数据库
- ✅ **生产就绪**：适合生产环境部署

## 详细设置步骤

### 第 1 步：注册 MongoDB Atlas 账号

1. 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. 点击 "Try Free" 或 "Sign Up"
3. 使用邮箱注册账号（可以使用 Google 账号快速注册）

### 第 2 步：创建免费集群

1. 注册后，选择 **"Build a Database"**
2. 选择 **FREE (M0)** 套餐（完全免费）
3. 选择云服务提供商和地区：
   - **推荐**：选择离你最近的地区（如 `AWS` → `Asia Pacific (ap-southeast-1) - Singapore`）
4. 集群名称可以保持默认（如 `Cluster0`）
5. 点击 **"Create Cluster"**
6. 等待集群创建完成（大约需要 3-5 分钟）

### 第 3 步：创建数据库用户

1. 在 "Database Access" 页面，点击 **"Add New Database User"**
2. 选择认证方式：**"Password"**
3. 设置用户名和密码：
   - **用户名**：例如 `orange-dragon-user`
   - **密码**：点击 "Autogenerate Secure Password" 生成强密码，**请务必保存这个密码！**
4. 用户权限选择：**"Atlas admin"**（或 "Read and write to any database"）
5. 点击 **"Add User"**

### 第 4 步：配置网络访问

1. 在 "Network Access" 页面，点击 **"Add IP Address"**
2. 为了开发方便，选择 **"Allow Access from Anywhere"**（IP 地址填 `0.0.0.0/0`）
   - ⚠️ **注意**：生产环境应该只添加特定的 IP 地址
3. 点击 **"Confirm"**

### 第 5 步：获取连接字符串

1. 回到 "Database" 页面，点击 **"Connect"** 按钮
2. 选择 **"Connect your application"**
3. 选择驱动：**"Node.js"**，版本：**"5.5 or later"**
4. 复制连接字符串，格式类似：
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **重要**：将 `<username>` 和 `<password>` 替换为你刚才创建的用户名和密码
   - 例如：`mongodb+srv://orange-dragon-user:your-password@cluster0.xxxxx.mongodb.net/orange-dragon-web?retryWrites=true&w=majority`
   - ⚠️ **注意**：在连接字符串末尾添加数据库名称 `/orange-dragon-web`

### 第 6 步：配置项目环境变量

1. 在项目根目录创建 `.env.local` 文件（如果还没有）
2. 添加以下内容：

```env
# MongoDB Atlas 连接字符串
MONGODB_URI=mongodb+srv://orange-dragon-user:your-password@cluster0.xxxxx.mongodb.net/orange-dragon-web?retryWrites=true&w=majority

# JWT 密钥（生成一个随机字符串）
# 可以使用命令生成: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. **替换内容**：
   - 将 `your-password` 替换为第 3 步创建的数据库用户密码
   - 将 `cluster0.xxxxx.mongodb.net` 替换为你的实际集群地址
   - 生成并替换 `JWT_SECRET`（可以使用 `openssl rand -base64 32` 命令）

### 第 7 步：测试连接

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问注册页面：http://localhost:3000/register

3. 尝试注册一个新用户

4. 如果注册成功，说明数据库连接正常！

## 常见问题

### Q: 连接失败怎么办？
- 检查用户名和密码是否正确
- 确认网络访问已配置（允许你的 IP 地址）
- 检查连接字符串格式是否正确

### Q: 忘记数据库用户密码怎么办？
- 在 MongoDB Atlas → Database Access → 找到用户 → 点击 "Edit" → 可以重置密码

### Q: 如何查看数据库中的数据？
- 在 MongoDB Atlas → Database → 点击 "Browse Collections" 可以查看所有数据

### Q: 免费套餐有什么限制？
- 512MB 存储空间
- 共享 CPU 和 RAM
- 对于小型应用完全够用

## 安全建议

1. **不要将 `.env.local` 文件提交到 Git**（已在 .gitignore 中）
2. **生产环境**：只允许特定 IP 地址访问数据库
3. **定期更换密码**
4. **使用强密码**作为 JWT_SECRET

## 完成！

配置完成后，你的后端就可以正常工作了：
- ✅ 用户注册数据会存储到 MongoDB Atlas
- ✅ 用户可以在任何设备上登录
- ✅ 密码会被加密存储
- ✅ 所有数据都在云端，安全可靠

