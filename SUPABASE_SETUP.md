# 🚀 Supabase 数据库集成指南

## 📋 前提条件

- 已有 Supabase 账号（https://supabase.com）
- Node.js 和 npm 已安装

## 🔧 配置步骤

### 1️⃣ 创建 Supabase 项目

1. 登录 Supabase Dashboard：https://supabase.com/dashboard
2. 点击 **"New Project"** 创建新项目
3. 填写项目信息：
   - **Name**: dazi-finder（或任意名称）
   - **Database Password**: 设置强密码并保存（后续会用到）
   - **Region**: 选择离你最近的区域（如 Northeast Asia (Seoul)）
4. 点击 **"Create new project"**，等待项目创建完成（约 2-3 分钟）

### 2️⃣ 获取 API 密钥

项目创建完成后：

1. 在左侧菜单点击 **Settings** → **API**
2. 复制以下信息：
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public key**: 公开的匿名密钥

### 3️⃣ 创建数据库表

1. 在左侧菜单点击 **SQL Editor**
2. 点击 **"New Query"** 创建新查询
3. 复制并粘贴项目根目录下的 `supabase-schema.sql` 文件内容
4. 点击 **"Run"** 执行 SQL 脚本
5. 确认看到 "Success" 提示

**或者手动创建表**：

1. 在左侧菜单点击 **Table Editor**
2. 点击 **"Create a new table"**
3. 设置表名：`posts`
4. 添加列：
   - `id` (uuid, primary key)
   - `user_id` (text)
   - `activity_type` (text)
   - `province` (text)
   - `city` (text)
   - `district` (text)
   - `location` (text, nullable)
   - `expected_time` (text)
   - `participant_count` (text, nullable)
   - `contact_type` (text)
   - `contact_value` (text)
   - `description` (text, nullable)
   - `is_complete` (boolean)
   - `status` (text)
   - `created_at` (timestamp)

### 4️⃣ 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# 复制示例文件
cp .env.local.example .env.local
```

编辑 `.env.local`，填入你在步骤 2 复制的 API 信息：

```env
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥
```

### 5️⃣ 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 测试应用！

## 🧪 测试功能

### 测试发布功能
1. 点击右上角 **"+ 发布找搭子"** 按钮
2. 选择活动类型（如：打麻将）
3. 填写时间地点
4. 填写联系方式
5. 点击 **"发布"**

### 测试多用户数据共享
1. **方法 1**：打开两个不同的浏览器（如 Chrome 和 Safari）
   - 在浏览器 A 中发布帖子
   - 在浏览器 B 中刷新页面，应该能看到浏览器 A 发布的帖子

2. **方法 2**：使用隐私/无痕模式
   - 正常窗口发布帖子
   - 打开隐私/无痕窗口访问，应该能看到发布的帖子

3. **方法 3**：部署到 Vercel 后分享给朋友
   - 部署到线上
   - 分享 URL 给朋友，你们可以实时看到彼此发布的帖子

## 🔒 安全说明

当前配置使用 **Row Level Security (RLS)**，已设置以下策略：

- ✅ 所有人可以**查看**帖子
- ✅ 所有人可以**创建**帖子
- ✅ 所有人可以**更新/删除**自己的帖子

**注意**：当前版本所有用户都是匿名用户（user_id = 'anonymous'）。如需用户认证功能，后续可以集成 Supabase Auth。

## 📊 数据库结构

### posts 表

| 字段 | 类型 | 说明 | 必填 |
|------|------|------|------|
| id | UUID | 主键 | ✅ |
| user_id | TEXT | 用户ID | ✅ |
| activity_type | TEXT | 活动类型 | ✅ |
| province | TEXT | 省份 | ✅ |
| city | TEXT | 城市 | ✅ |
| district | TEXT | 区县 | ✅ |
| location | TEXT | 具体地点 | ❌ |
| expected_time | TEXT | 期望时间 | ✅ |
| participant_count | TEXT | 人数要求 | ❌ |
| contact_type | TEXT | 联系方式类型 | ✅ |
| contact_value | TEXT | 联系方式值 | ✅ |
| description | TEXT | 活动详情 | ❌ |
| is_complete | BOOLEAN | 信息是否完整 | ✅ |
| status | TEXT | 状态 | ✅ |
| created_at | TIMESTAMP | 创建时间 | ✅ |

## 🚀 部署到 Vercel

1. **安装 Vercel CLI**（如果还没安装）：
   ```bash
   npm i -g vercel
   ```

2. **设置环境变量**：
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

3. **部署**：
   ```bash
   vercel --prod
   ```

4. **访问你的应用**：部署完成后，Vercel 会提供一个 URL

## 🐛 故障排除

### 问题 1: API 返回 500 错误
**解决方案**：
- 检查 `.env.local` 文件是否存在
- 确认 Supabase URL 和 Key 是否正确
- 重启开发服务器：`npm run dev`

### 问题 2: 帖子列表为空
**解决方案**：
- 打开浏览器控制台查看错误信息
- 确认 Supabase 数据库表已创建
- 检查网络请求是否成功（F12 → Network）

### 问题 3: 发布帖子失败
**解决方案**：
- 检查所有必填字段是否已填写
- 确认 Supabase RLS 策略已正确设置
- 查看控制台错误信息

### 问题 4: 数据不同步
**解决方案**：
- 确认两个浏览器访问的是同一个 URL
- 清除浏览器缓存并刷新
- 检查 Supabase Dashboard 中的数据是否存在

## 📚 下一步优化建议

- [ ] 添加用户认证（Supabase Auth）
- [ ] 实现实时订阅（Realtime）
- [ ] 添加帖子编辑/删除功能
- [ ] 添加图片上传功能
- [ ] 添加用户个人主页
- [ ] 添加评价系统
- [ ] 添加消息通知

## 🆘 获取帮助

- Supabase 文档：https://supabase.com/docs
- Next.js 文档：https://nextjs.org/docs
- 问题反馈：在项目 GitHub 提 issue

---

**祝你配置顺利！🎉**
