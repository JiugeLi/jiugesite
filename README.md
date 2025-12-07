# JiugeSite (UpUpNav)

一个现代化的个人网站导航管理系统，基于 Next.js 14 和 Supabase 构建。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ 特性

- 📁 **分组管理** - 创建、编辑、删除网站分组，支持自定义图标
- 🌐 **网站管理** - 添加、编辑、删除网站链接
- 🎨 **自动获取 Logo** - 自动抓取网站图标
- 🔍 **智能搜索** - 按名称、URL、描述搜索网站
- 🔐 **用户认证** - 基于 Supabase Auth 的安全认证
- 📊 **点击统计** - 记录网站访问次数
- 📤 **数据导入/导出** - 支持数据备份和迁移
- 📱 **响应式设计** - 完美支持移动端和桌面端
- 🎯 **现代化 UI** - 使用 Tailwind CSS 打造精美界面

## 🚀 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **数据库**: [PostgreSQL](https://www.postgresql.org/) (via Supabase)
- **ORM**: [Prisma](https://www.prisma.io/)
- **认证**: [Supabase Auth](https://supabase.com/auth)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **部署**: [Vercel](https://vercel.com/)

## 📦 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- Supabase 账号
- Vercel 账号（用于部署）

### 本地开发

1. **克隆仓库**

```bash
git clone https://github.com/your-username/jiugesite.git
cd jiugesite
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

复制 `.env.example` 到 `.env.local` 并填入你的配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
POSTGRES_PRISMA_URL=postgresql://...?pgbouncer=true
POSTGRES_URL=postgresql://...
```

4. **初始化数据库**

```bash
# 生成 Prisma Client
npx prisma generate

# 推送数据库架构
npx prisma db push

# 运行种子数据（可选）
npm run db:init
```

5. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🌐 部署到 Vercel

详细的部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成！

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/jiugesite)

## 📁 项目结构

```
jiugesite/
├── prisma/
│   ├── schema.prisma      # 数据库模型定义
│   └── seed.js            # 种子数据
├── src/
│   ├── app/
│   │   ├── api/           # API 路由
│   │   │   ├── groups/    # 分组相关 API
│   │   │   └── websites/  # 网站相关 API
│   │   ├── auth/          # 认证回调
│   │   ├── globals.css    # 全局样式
│   │   ├── layout.tsx     # 根布局
│   │   └── page.tsx       # 首页
│   ├── components/        # React 组件
│   │   ├── Dashboard.tsx
│   │   ├── GroupModal.tsx
│   │   ├── WebsiteModal.tsx
│   │   ├── LoginModal.tsx
│   │   └── SettingsModal.tsx
│   ├── lib/
│   │   ├── db.ts          # Prisma 客户端
│   │   ├── supabase/      # Supabase 客户端
│   │   └── utils.ts       # 工具函数
│   ├── types/
│   │   └── index.ts       # TypeScript 类型定义
│   └── middleware.ts      # Next.js 中间件
├── .env.example           # 环境变量示例
├── next.config.mjs        # Next.js 配置
├── tailwind.config.ts     # Tailwind 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖
```

## 🔧 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint
npm run db:init      # 初始化数据库并运行种子数据
```

## 🎯 核心功能

### 分组管理
- 创建、编辑、删除分组
- 自定义分组图标（支持 Emoji）
- 拖拽排序（计划中）

### 网站管理
- 添加网站链接
- 自动获取网站 Logo
- 存储网站描述
- 保存登录凭证（加密存储）
- 点击统计

### 搜索功能
- 实时搜索
- 支持名称、URL、描述搜索
- 高亮显示搜索结果

### 数据管理
- 导出所有数据为 JSON
- 从 JSON 导入数据
- 支持合并或替换模式

## 🔐 安全性

- 使用 Supabase Auth 进行用户认证
- 环境变量保护敏感信息
- API 路由保护（计划中）
- XSS 防护
- CSRF 保护

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)

## 📧 联系方式

如有问题或建议，请提交 Issue 或联系维护者。

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
