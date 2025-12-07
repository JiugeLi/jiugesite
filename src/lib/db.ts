import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// 优化 Prisma 配置以减少连接时间
export const db = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

// 在生产环境中，确保连接被复用
if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = db;
}
