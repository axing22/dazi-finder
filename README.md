# 🎯 找搭子平台 - 春节限定

一个帮助用户在春节期间快速找到活动伙伴的社交平台。

## ✨ 功能特点

- ✅ **快速发布**: 3步完成找搭子帖子发布
- ✅ **多用户数据共享**: 使用 Supabase 数据库，所有用户可实时看到彼此发布的帖子
- ✅ **首页信息流**: 按时间倒序展示本地最新搭子需求
- ✅ **地区筛选**: 支持按省市区筛选（全国34个省市）
- ✅ **搜索功能**: 支持搜索活动类型、地点、描述
- ✅ **详情查看**: 查看完整活动信息和联系方式
- ✅ **移动端优先**: 完美适配手机端和PC端
- ✅ **实时更新**: 发布后立即可见，无需刷新页面

## 🚀 快速开始

### 1. 安装依赖

```bash
cd dazi-finder
npm install
```

### 2. 配置 Supabase 数据库（必选）

为了启用多用户数据共享功能，你需要配置 Supabase 数据库：

1. **创建 Supabase 项目**
   - 访问 https://supabase.com/dashboard
   - 创建新项目（免费）

2. **获取 API 密钥**
   - 进入 Settings → API
   - 复制 Project URL 和 anon public key

3. **创建数据库表**
   - 进入 SQL Editor
   - 执行项目根目录下的 `supabase-schema.sql` 文件

4. **配置环境变量**
   ```bash
   cp .env.local.example .env.local
   ```
   然后编辑 `.env.local` 文件，填入你的 Supabase 配置：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=你的项目URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥
   ```

详细配置指南请查看：**[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 打开浏览器

访问: http://localhost:3000

## 📱 功能说明

### 首页
- 展示本地最新搭子需求
- 顶部搜索框(活动类型搜索)
- 地区筛选器(省市区三级联动)
- 卡片式信息流展示

### 发布流程(3步)

**Step 1: 选择活动类型**
- 6种预设类型:打麻将/打篮球/看电影/吃饭/逛街/其他

**Step 2: 填写时间地点**
- 必填:省/市/区、期望时间
- 选填:具体地点、人数要求

**Step 3: 填写联系方式**
- 必填:微信号或手机号
- 选填:活动详情说明

### 详情页面
- 完整活动信息展示
- 一键复制联系方式
- 移动端支持直接拨打

## 🎨 设计特点

- **移动端优先**: 针对手机端优化
- **卡片式设计**: 清晰的信息层级
- **流畅动画**: Framer Motion增强体验
- **活力配色**: 主色#FF6B6B,适合过年氛围

## 📊 技术栈

- **框架**: Next.js 14 (App Router)
- **数据库**: Supabase (PostgreSQL)
- **UI**: React + Tailwind CSS
- **动画**: Framer Motion
- **语言**: TypeScript

## 🔧 部署到 Vercel

1. **设置环境变量**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **部署**
   ```bash
   vercel --prod
   ```

## 🔮 后续扩展

- [ ] 用户注册/登录（Supabase Auth）
- [ ] 实时订阅（Realtime）
- [ ] 置顶加急功能
- [ ] 实时聊天
- [ ] 评价系统
- [ ] 地图模式
- [ ] 图片上传

## 📝 License

MIT

---

**💬 春节期间找搭子,就上找搭子平台!**

**📚 需要帮助? 查看 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 配置指南**

