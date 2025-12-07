# 部署指南

## 前置准备

### 1. Supabase 设置

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 在项目设置中获取以下信息：
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Anon/Public Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
3. 在 Supabase 项目中启用 Email Authentication：
   - 进入 Authentication > Providers
   - 启用 Email provider
   - 配置 Site URL 为你的 Vercel 域名

### 2. 数据库设置

#### 选项 A: 使用 Supabase PostgreSQL (推荐)

1. 在 Supabase 项目设置中找到 Database 部分
2. 获取 Connection String：
   - Connection pooling (推荐用于 Vercel): `POSTGRES_PRISMA_URL`
   - Direct connection: `POSTGRES_URL`

#### 选项 B: 使用 Vercel Postgres

1. 在 Vercel 项目中添加 Postgres 数据库
2. Vercel 会自动设置环境变量

## Vercel 部署步骤

### 1. 推送代码到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. 在 Vercel 中导入项目

1. 访问 [Vercel](https://vercel.com)
2. 点击 "Add New Project"
3. 从 GitHub 导入你的仓库
4. 配置项目：
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `prisma generate && next build`
   - Output Directory: .next

### 3. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
POSTGRES_PRISMA_URL=postgresql://...?pgbouncer=true
POSTGRES_URL=postgresql://...
```

### 4. 初始化数据库

部署成功后，在本地运行数据库迁移：

```bash
# 设置环境变量
export POSTGRES_PRISMA_URL="your-connection-string"
export POSTGRES_URL="your-direct-connection-string"

# 推送数据库架构
npx prisma db push

# 运行种子数据（可选）
npx prisma db seed
```

或者在 Vercel 项目设置中添加部署后命令。

### 5. 配置 Supabase 回调 URL

在 Supabase 项目设置中：
1. 进入 Authentication > URL Configuration
2. 添加以下 URL：
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/auth/callback`

## 本地开发

```bash
# 安装依赖
npm install

# 复制环境变量
cp .env.example .env.local

# 编辑 .env.local 填入你的配置

# 生成 Prisma Client
npx prisma generate

# 推送数据库架构
npx prisma db push

# 运行种子数据
npm run db:init

# 启动开发服务器
npm run dev
```

## 常见问题

### 1. Prisma Client 未生成

确保在 package.json 中有 postinstall 脚本：
```json
"postinstall": "prisma generate"
```

### 2. 数据库连接失败

- 检查环境变量是否正确设置
- 确保使用 connection pooling URL (带 `?pgbouncer=true`)
- 检查数据库防火墙设置

### 3. Supabase 认证失败

- 确保回调 URL 正确配置
- 检查 Site URL 设置
- 验证 API keys 是否正确

## 生产环境检查清单

- [ ] 环境变量已在 Vercel 中配置
- [ ] 数据库架构已推送
- [ ] Supabase 回调 URL 已配置
- [ ] 种子数据已运行（如需要）
- [ ] 测试登录功能
- [ ] 测试 CRUD 操作
- [ ] 检查 API 路由是否正常工作
- [ ] 验证响应式设计
