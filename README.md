# JiugeSite (UpUpNav)

一个现代化的个人网站导航管理系统，基于 Next.js 14 和 Supabase 构建。

## ✨ 特性

- 📁 **分组管理** - 创建、编辑、删除网站分组，支持自定义图标
- 🌐 **网站管理** - 添加、编辑、删除网站链接
- 🎨 **自动获取 Logo** - 自动抓取网站图标
- 🔍 **智能搜索** - 按名称、URL、描述搜索网站
- 🔐 **用户认证** - 基于 Supabase Auth 的安全认证
- 📊 **点击统计** - 记录网站访问次数
- 📤 **数据导入/导出** - 支持数据备份和迁移
- 📱 **响应式设计** - 完美支持移动端和桌面端

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **数据库**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **认证**: Supabase Auth
- **样式**: Tailwind CSS
- **图标**: Lucide React

## 📦 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/your-username/jiugesite.git
cd jiugesite
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# PostgreSQL 数据库
POSTGRES_PRISMA_URL=postgresql://...?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://...
```

### 4. 初始化数据库

```bash
npx prisma generate
npx prisma db push
npm run db:init
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 🌐 部署

### 环境变量配置

部署时需要配置以下环境变量：

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase 匿名密钥
- `POSTGRES_PRISMA_URL` - 数据库连接池 URL
- `POSTGRES_URL_NON_POOLING` - 数据库直连 URL

### Prisma 配置

项目已配置支持多平台部署：

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x"]
}
```

支持的平台：
- 本地开发 (Windows/Mac/Linux)
- Vercel
- EdgeOne / 腾讯云
- 其他 RHEL 环境

## 🔧 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint
npm run db:init      # 初始化数据库并运行种子数据
```

## 📁 项目结构

```
src/
├── app/
│   ├── api/              # API 路由
│   │   ├── groups/       # 分组管理
│   │   ├── websites/     # 网站管理
│   │   ├── health/       # 健康检查
│   │   ├── test-db/      # 数据库测试
│   │   └── test-env/     # 环境变量测试
│   ├── auth/             # 认证回调
│   └── page.tsx          # 主页
├── components/           # React 组件
├── lib/                  # 工具库
│   ├── db.ts            # Prisma 客户端
│   └── supabase/        # Supabase 客户端
└── types/               # TypeScript 类型
```

## 🔐 安全性

- 使用 Supabase Auth 进行用户认证
- 环境变量保护敏感信息
- `.env` 文件已在 `.gitignore` 中排除
- XSS 和 CSRF 防护

## 📝 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
