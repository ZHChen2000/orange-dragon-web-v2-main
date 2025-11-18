# 环境变量配置说明

## 创建环境变量文件

在项目根目录创建 `.env.local` 文件，并添加以下内容：

```env
# MongoDB 连接字符串
# 本地 MongoDB: mongodb://localhost:27017/your-database-name
# MongoDB Atlas (云数据库): mongodb+srv://username:password@cluster.mongodb.net/database-name
MONGODB_URI=mongodb://localhost:27017/orange-dragon-web

# JWT 密钥（用于生成和验证 token，请使用强随机字符串）
# 可以使用以下命令生成: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## MongoDB 设置选项

### 选项 1: 本地 MongoDB（开发环境）

1. 安装 MongoDB：
   - macOS: `brew install mongodb-community`
   - Windows: 从 [MongoDB官网](https://www.mongodb.com/try/download/community) 下载安装
   - Linux: `sudo apt-get install mongodb`

2. 启动 MongoDB 服务：
   ```bash
   # macOS/Linux
   brew services start mongodb-community
   # 或
   mongod --dbpath /path/to/data
   ```

3. 在 `.env.local` 中使用：
   ```env
   MONGODB_URI=mongodb://localhost:27017/orange-dragon-web
   ```

### 选项 2: MongoDB Atlas（推荐，免费云数据库）

1. 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. 注册账号并创建免费集群
3. 创建数据库用户
4. 获取连接字符串，格式类似：
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/orange-dragon-web?retryWrites=true&w=majority
   ```
5. 在 `.env.local` 中使用：
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/orange-dragon-web?retryWrites=true&w=majority
   ```

## 生成 JWT_SECRET

使用以下命令生成一个安全的随机密钥：

```bash
openssl rand -base64 32
```

或者使用 Node.js：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 注意事项

- `.env.local` 文件已添加到 `.gitignore`，不会被提交到 Git
- 生产环境请使用强密码和安全的 JWT_SECRET
- 不要将 `.env.local` 文件分享给他人

