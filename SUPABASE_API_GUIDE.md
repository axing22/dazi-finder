# 🔑 如何获取 Supabase API 密钥

## 详细步骤（带截图说明）

### 第一步：登录 Supabase

1. 访问 https://supabase.com/dashboard
2. 使用你的账号登录

### 第二步：选择或创建项目

如果你还没有创建项目：
1. 点击 **"New Project"** 按钮
2. 填写项目信息：
   - **Name**: dazi-finder（或任意名称）
   - **Database Password**: 设置密码（请保存好）
   - **Region**: 选择 Northeast Asia (Seoul) 或其他离你近的区域
3. 等待 2-3 分钟项目创建完成

如果你已经有项目：
- 直接点击你的项目进入

### 第三步：找到 API 设置（重点）

1. 在左侧菜单栏，找到并点击 **⚙️ Settings**（齿轮图标）

2. 在 Settings 菜单中，点击 **API**

3. 现在你会看到 API 设置页面，包含以下重要信息：

#### 🔑 需要复制的信息：

**1. Project URL**
- 位置在页面顶部 **"Project API keys"** 部分
- 标签为 **"Project URL"**
- 格式类似：`https://xxxxxxxxxxxxx.supabase.co`
- 示例：`https://abcdefghijklmnopqrst.supabase.co`

**2. anon public key**
- 在同一个部分
- 标签为 **"anon public"** 或 **"anon key"**
- 是一串很长的字符
- 示例：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（非常长）

### 第四步：复制并保存

复制这两个值：

```env
# 示例格式（不要复制这个，复制你自己的）
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的很长很长的匿名密钥
```

### 第五步：配置到项目

1. 在项目根目录创建 `.env.local` 文件：

```bash
cd /Users/xiaowenjie/Documents/肖文杰/AI\ Product/03-正在做/Springfestivalchallenge/dazi-finder
cp .env.local.example .env.local
```

2. 编辑 `.env.local` 文件，将刚才复制的值粘贴进去：

```env
NEXT_PUBLIC_SUPABASE_URL=https://你复制的ProjectURL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你复制的anonKey
```

### 第六步：验证配置

保存文件后，重启开发服务器：

```bash
cd /Users/xiaowenjie/Documents/肖文杰/AI\ Product/03-正在做/Springfestivalchallenge/dazi-finder
npm run dev
```

然后访问 http://localhost:3000，应该不再显示"还未配置数据库"的提示。

---

## 🎨 页面布局参考

Supabase Dashboard 布局：

```
┌─────────────────────────────────────────────────┐
│  Supabase Logo                                  │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│          │  Project API keys                    │
│          │  ┌──────────────────────────────┐    │
│ 左侧菜单  │  │ Project URL                  │    │
│          │  │ https://xxxxx.supabase.co    │    │
│          │  │          [复制按钮]           │    │
│          │  ├──────────────────────────────┤    │
│          │  │ anon public                  │    │
│ ⚙️ API   │  │ eyJhbGciOiJIUzI1NiIsInR...  │    │
│          │  │          [复制按钮]           │    │
│ Database │  └──────────────────────────────┘    │
│ SQL      │                                       │
│          │                                       │
└──────────┴──────────────────────────────────────┘
```

## ❓ 常见问题

### Q1: 找不到 Settings 菜单
- A: Settings 在左侧最下方，齿轮图标 ⚙️

### Q2: 有多个 key，应该用哪个？
- A: 使用 **anon public** key，不是 service_role key

### Q3: API key 太长复制不全
- A: 点击 key 右侧的复制图标 📋，会自动复制完整内容

### Q4: 配置后还是显示错误
- A:
  1. 确认 `.env.local` 文件在项目根目录
  2. 确认没有多余的空格或引号
  3. 重启开发服务器（Ctrl+C 然后 `npm run dev`）

### Q5: 看不到 API 页面
- A: 可能权限不够，确保你是项目的 Owner 或 Developer

---

## ✅ 配置检查清单

- [ ] 已创建 Supabase 项目
- [ ] 已找到 Settings → API 页面
- [ ] 已复制 Project URL
- [ ] 已复制 anon public key
- [ ] 已创建 .env.local 文件
- [ ] 已将配置粘贴到 .env.local
- [ ] 已重启开发服务器
- [ ] 已在浏览器测试（不再显示配置提示）

全部完成后，你的找搭子平台就可以正常使用多用户数据共享功能了！🎉
