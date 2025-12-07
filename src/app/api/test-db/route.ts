import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 测试数据库连接
    await db.$connect();
    
    // 测试查询
    const groupCount = await db.group.count();
    const websiteCount = await db.website.count();
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      counts: {
        groups: groupCount,
        websites: websiteCount,
      },
      env: {
        hasUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasDirectUrl: !!process.env.POSTGRES_URL_NON_POOLING,
        nodeEnv: process.env.NODE_ENV,
        urlPrefix: process.env.POSTGRES_PRISMA_URL?.substring(0, 20) + '...',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('[TEST_DB]', error);
    
    return NextResponse.json({
      status: 'error',
      error: errorMessage,
      stack: errorStack,
      env: {
        hasUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasDirectUrl: !!process.env.POSTGRES_URL_NON_POOLING,
        nodeEnv: process.env.NODE_ENV,
      },
    }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
