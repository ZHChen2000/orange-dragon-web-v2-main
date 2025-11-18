# 如何在 MongoDB Atlas 查看用户数据

## 方法 1：通过 MongoDB Atlas 网页控制台（推荐）

### 步骤 1：登录 MongoDB Atlas
1. 访问 [MongoDB Atlas](https://cloud.mongodb.com/)
2. 使用你的账号登录（注册时使用的邮箱）

### 步骤 2：进入数据库
1. 登录后，你会看到你的集群（Cluster0）
2. 点击 **"Browse Collections"** 按钮（在集群卡片上）

### 步骤 3：查看用户数据
1. 在左侧边栏，你会看到数据库列表
2. 点击数据库名称：**`orange-dragon-web`**
3. 展开后，你会看到集合（Collections）：
   - **`users`** - 这里存储了所有注册用户的信息
4. 点击 **`users`** 集合
5. 右侧会显示所有用户数据，包括：
   - `_id`: 用户唯一标识符
   - `email`: 用户邮箱
   - `name`: 用户姓名
   - `password`: 加密后的密码（bcrypt 哈希值）
   - `createdAt`: 注册时间
   - `updatedAt`: 更新时间

### 步骤 4：查看具体用户信息
- 点击任意一条记录可以查看详细信息
- 你可以看到完整的用户对象结构

## 方法 2：使用 MongoDB Compass（桌面应用）

### 安装 MongoDB Compass
1. 访问 [MongoDB Compass 下载页面](https://www.mongodb.com/try/download/compass)
2. 下载并安装适合你操作系统的版本

### 连接数据库
1. 打开 MongoDB Compass
2. 在 MongoDB Atlas 控制台获取连接字符串：
   - 点击 "Connect" → "Connect using MongoDB Compass"
   - 复制连接字符串
3. 将连接字符串粘贴到 Compass 的连接框
4. 替换 `<password>` 为你的数据库用户密码
5. 点击 "Connect"

### 查看数据
1. 在左侧数据库列表中找到 `orange-dragon-web`
2. 展开后点击 `users` 集合
3. 查看所有用户数据

## 方法 3：使用命令行工具（高级）

如果你熟悉命令行，可以使用 `mongosh`：

```bash
# 安装 mongosh（如果还没有）
# macOS: brew install mongosh
# 或从 https://www.mongodb.com/try/download/shell 下载

# 连接到 MongoDB Atlas
mongosh "mongodb+srv://zhchen2000_db_user:S2OHpqI5AvLN0JPj@cluster0.5kmve1q.mongodb.net/orange-dragon-web"

# 查看所有数据库
show dbs

# 切换到你的数据库
use orange-dragon-web

# 查看所有集合
show collections

# 查看所有用户
db.users.find().pretty()

# 查看特定用户（按邮箱）
db.users.findOne({ email: "test@example.com" })

# 统计用户数量
db.users.countDocuments()
```

## 数据示例

用户数据在数据库中的格式类似这样：

```json
{
  "_id": ObjectId("..."),
  "email": "test@example.com",
  "password": "$2a$10$...",  // bcrypt 加密后的密码
  "name": "测试用户",
  "createdAt": ISODate("2024-12-XX..."),
  "updatedAt": ISODate("2024-12-XX...")
}
```

## 安全提示

⚠️ **重要**：
- 密码字段显示的是加密后的哈希值，不是原始密码
- 这是安全的，因为使用了 bcrypt 加密
- 即使是数据库管理员也无法看到用户的原始密码
- 这是密码加密的目的 - 即使数据库泄露，密码也是安全的

## 常见操作

### 查看所有用户
在 Atlas 控制台或 Compass 中，直接浏览 `users` 集合即可看到所有用户。

### 搜索特定用户
在 Compass 或 Atlas 控制台的搜索框中，可以输入邮箱或姓名进行搜索。

### 删除用户（如果需要）
1. 在 Atlas 控制台或 Compass 中
2. 找到要删除的用户记录
3. 点击删除按钮（垃圾桶图标）
4. 确认删除

## 注意事项

- 用户数据是实时同步的，注册后立即可以在数据库中看到
- 如果看不到数据，检查：
  1. 数据库名称是否正确（`orange-dragon-web`）
  2. 是否已经注册过用户
  3. 网络连接是否正常

