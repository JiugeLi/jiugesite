# 部署指南

本项目支持部署到 **EdgeOne** 和 **Vercel**。

## ✅ 已配置支持

### Prisma Binary Targets
```prisma
binaryTargets = ["native", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x"]
```
- `native` - 本地开发
- `rhel-openssl-1.1.x` - EdgeOne
- `rhel-openssl-3.0.x` - Vercel / 新版 RHEL

### Next.js 配置
```javascript
output: 'standalone'  // 支持 EdgeOne 和 Vercel
```

## 🚀 部署步骤

### 1. 推送代码到 GitHub
```bash
git add .
git commit -m "Optimize performance and support multi-platform deployment"
git push origin main
```

### 2. 配置环境变量

在部署平台（EdgeOne 或 Vercel）配置以下 4 个环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
POSTGRES_PRISMA_URL=postgresql://...?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://...
```

### 3. 部署

#### EdgeOne
- 推送代码后自动部署
- 或在控制台手动触发部署

#### Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 导入 GitHub 仓库
3. 配置环境变量
4. 点击 Deploy

## 📋 环境变量说明

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | `eyJhbGci...` |
| `POSTGRES_PRISMA_URL` | 数据库连接池 URL | `postgresql://...?pgbouncer=true` |
| `POSTGRES_URL_NON_POOLING` | 数据库直连 URL | `postgresql://...` |

## 🎯 性能优化

已应用的优化：
- ✅ Prisma 连接复用
- ✅ API Runtime 配置
- ✅ 前端数据缓存

预期性能：
- 首次请求: 3-5 秒（冷启动）
- 后续请求: < 500ms

## 🔍 测试部署

部署后访问以下端点测试：

```bash
# 健康检查
https://your-domain.com/api/health

# 数据库连接
https://your-domain.com/api/test-db

# 实际 API
https://your-domain.com/api/groups
https://your-domain.com/api/websites
```

## ⚠️ 注意事项

1. **数据库表**: 确保 Supabase 数据库中已有 `groups` 和 `websites` 表
2. **环境变量**: 部署前必须配置所有 4 个环境变量
3. **Supabase 配置**: 在 Supabase 设置回调 URL 为你的部署域名

## 📚 相关文档

- [Next.js 部署](https://nextjs.org/docs/deployment)
- [Prisma 部署](https://www.prisma.io/docs/guides/deployment)
- [Supabase 文档](https://supabase.com/docs)
