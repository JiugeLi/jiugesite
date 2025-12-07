# EdgeOne 部署清单

## ✅ 代码已准备好

你的代码已经配置正确，可以连接到现有的 Supabase 数据库。

## 📋 部署步骤

### 步骤 1: 提交代码到 GitHub

```bash
git add .
git commit -m "Fix EdgeOne deployment: Add RHEL binary targets for Prisma"
git push origin main
```

### 步骤 2: 在 EdgeOne 配置环境变量

**重要**: 必须在 EdgeOne 控制台配置这 4 个环境变量，使用你 `.env.local` 中的真实值：

```env
NEXT_PUBLIC_SUPABASE_URL=https://qzjkqcmejkwalqrktfau.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6amtxY21lamt3YWxxcmt0ZmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTg2MjcsImV4cCI6MjA4MDY3NDYyN30.8D7txfFxGLpxweV5L-2yxIvBGHRNZuj-A3EAmJdesqg

POSTGRES_PRISMA_URL=postgres://postgres.qzjkqcmejkwalqrktfau:fucVc3d9%5EW*lpT@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true

POSTGRES_URL_NON_POOLING=postgres://postgres.qzjkqcmejkwalqrktfau:fucVc3d9%5EW*lpT@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres?sslmode=require
```

⚠️ **注意**: 
- 这些是你的真实值（从 `.env.local` 复制）
- 只在 EdgeOne 控制台配置，不要提交到 Git
- 配置后需要重新部署才能生效

### 步骤 3: 等待 EdgeOne 部署完成

EdgeOne 会自动：
1. 拉取最新代码
2. 运行 `npm install`
3. 运行 `prisma generate`（生成 RHEL 二进制文件）
4. 运行 `next build`
5. 部署应用

### 步骤 4: 测试部署

部署完成后，访问以下 URL 测试：

#### 1. 健康检查
```
https://www.jiugenote.site/api/health
```
✅ 应该返回: `{"status":"ok"}`

#### 2. 环境变量检查
```
https://www.jiugenote.site/api/test-env
```
✅ 所有值应该是 `true`

#### 3. 数据库连接测试
```
https://www.jiugenote.site/api/test-db
```
✅ 应该返回: `{"status":"ok","database":"connected","counts":{...}}`

#### 4. 实际 API 测试
```
https://www.jiugenote.site/api/groups
https://www.jiugenote.site/api/websites
```
✅ 应该返回你现有的数据

#### 5. 前端页面
```
https://www.jiugenote.site
```
✅ 应该显示你的分组和网站

## 🔍 关键配置说明

### 1. 数据库连接

你的 Prisma 配置会自动连接到现有的 Supabase 数据库：

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")      # 连接池 URL (EdgeOne 使用)
  directUrl = env("POSTGRES_URL_NON_POOLING") # 直连 URL (迁移使用)
}
```

- **POSTGRES_PRISMA_URL**: 端口 6543，带 pgbouncer，用于 Serverless 环境
- **POSTGRES_URL_NON_POOLING**: 端口 5432，直连，用于数据库迁移

### 2. Prisma Binary Targets

已配置支持 EdgeOne (RHEL) 环境：

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x"]
}
```

这解决了之前的 "Prisma Client could not locate Query Engine" 错误。

### 3. 数据库表

你的数据库已经有这些表：
- `groups` - 分组表
- `websites` - 网站表

部署后会直接使用现有的表和数据，**不会重新创建或清空数据**。

## ⚠️ 重要提示

### 数据库不会被重置

- ✅ 部署**不会**运行 `prisma db push`
- ✅ 部署**不会**运行 `prisma migrate`
- ✅ 部署**不会**清空现有数据
- ✅ 只会连接到现有数据库并读取数据

### 如果数据库表不存在

如果这是全新的数据库（没有表），需要手动创建表：

```bash
# 在本地运行
export POSTGRES_PRISMA_URL="你的连接字符串"
export POSTGRES_URL_NON_POOLING="你的直连字符串"
npx prisma db push
```

但根据你的情况，数据库已经存在，所以**不需要**这一步。

## 🎯 预期结果

部署成功后：

1. ✅ EdgeOne 应用连接到你的 Supabase 数据库
2. ✅ 读取现有的 groups 和 websites 数据
3. ✅ 前端显示你现有的所有分组和网站
4. ✅ 可以正常进行 CRUD 操作
5. ✅ 所有数据保持不变

## 🆘 如果出现问题

### 问题 1: 环境变量未配置
**症状**: `/api/test-env` 显示 `false`
**解决**: 在 EdgeOne 控制台添加缺失的环境变量，然后重新部署

### 问题 2: 数据库连接失败
**症状**: `/api/test-db` 返回错误
**解决**: 
- 检查连接字符串是否正确
- 确认密码 URL 编码正确（`^` → `%5E`）
- 验证端口号（6543 用于连接池）

### 问题 3: Prisma Binary 错误
**症状**: 日志显示 "could not locate Query Engine"
**解决**: 
- 确认 `prisma/schema.prisma` 包含 `binaryTargets`
- 检查构建日志中是否有 "Generated Prisma Client"

### 问题 4: 看不到数据
**症状**: API 返回空数组 `[]`
**解决**: 
- 确认数据库中确实有数据
- 检查表名是否正确（`groups` 和 `websites`）
- 访问 `/api/test-db` 查看数据统计

## 📞 需要帮助？

如果部署后仍有问题，请检查：
1. EdgeOne 构建日志
2. `/api/test-env` 的响应
3. `/api/test-db` 的错误信息
4. 浏览器控制台的错误

---

✨ **现在可以安全提交并部署了！你的现有数据不会受到影响。**
