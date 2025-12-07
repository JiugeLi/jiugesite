# 🚀 快速开始指南

## 本地开发已就绪 ✅

你的项目现在已经可以正常运行了！

### 当前状态
- ✅ 数据库连接正常
- ✅ Prisma Client 已生成
- ✅ 数据库表已创建
- ✅ 种子数据已加载
- ✅ 开发服务器运行中

### 访问应用
打开浏览器访问: **http://localhost:3000**

## 📋 下一步：部署到 Vercel

### 步骤 1: 推送到 GitHub

```bash
# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# 添加远程仓库
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

### 步骤 2: 在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Import"

### 步骤 3: 配置环境变量

在 Vercel 项目设置中添加以下 4 个环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=https://qzjkqcmejkwalqrktfau.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6amtxY21lamt3YWxxcmt0ZmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTg2MjcsImV4cCI6MjA4MDY3NDYyN30.8D7txfFxGLpxweV5L-2yxIvBGHRNZuj-A3EAmJdesqg
POSTGRES_PRISMA_URL=postgres://postgres.qzjkqcmejkwalqrktfau:fucVc3d9%5EW*lpT@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://postgres.qzjkqcmejkwalqrktfau:fucVc3d9%5EW*lpT@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres?sslmode=require
```

### 步骤 4: 部署

点击 "Deploy" 按钮，Vercel 会自动：
1. 安装依赖
2. 生成 Prisma Client
3. 构建 Next.js 应用
4. 部署到全球 CDN

### 步骤 5: 配置 Supabase

部署成功后，获取你的 Vercel 域名（例如：`your-app.vercel.app`），然后：

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Authentication > URL Configuration**
4. 设置：
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: 添加 `https://your-app.vercel.app/auth/callback`

## 🎉 完成！

现在你的应用已经部署到 Vercel 了！

### 测试部署
1. 访问你的 Vercel 域名
2. 尝试注册/登录
3. 创建分组和添加网站
4. 测试所有功能

## 🔧 常用命令

### 本地开发
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
```

### 数据库管理
```bash
npx prisma studio    # 打开数据库管理界面
npx prisma db push   # 推送 schema 变更
npx prisma generate  # 重新生成 Prisma Client
```

### 数据管理
```bash
node prisma/seed.js  # 运行种子数据
```

## 📚 文档

- [DEPLOYMENT.md](./DEPLOYMENT.md) - 详细部署指南
- [FIXES_APPLIED.md](./FIXES_APPLIED.md) - 已修复的问题
- [CHECKLIST.md](./CHECKLIST.md) - 完整检查清单
- [README.md](./README.md) - 项目说明

## 💡 提示

### 开发技巧
- 使用 `npx prisma studio` 可视化管理数据库
- 修改 schema 后运行 `npx prisma db push`
- 环境变量修改后需要重启开发服务器

### 部署技巧
- Vercel 会自动检测 Git 推送并重新部署
- 环境变量修改后需要重新部署
- 查看 Vercel 部署日志排查问题

## 🆘 需要帮助？

如果遇到问题：
1. 查看 [FIXES_APPLIED.md](./FIXES_APPLIED.md) 了解常见问题
2. 检查 Vercel 部署日志
3. 查看浏览器控制台错误
4. 检查 Supabase 项目状态

---

✨ **祝你部署顺利！**
