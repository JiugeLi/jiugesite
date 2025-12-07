import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// 启用 Node.js Runtime 并配置缓存
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 60; // 缓存 60 秒

export async function GET() {
  try {
    const groups = await db.group.findMany({
      orderBy: {
        sort_order: 'asc',
      },
      // 只选择需要的字段，减少数据传输
      select: {
        id: true,
        name: true,
        icon: true,
        sort_order: true,
        created_at: true,
      },
    });
    
    // 添加缓存头
    return NextResponse.json(groups, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('[GROUPS_GET]', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Error', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, icon, sort_order } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const group = await db.group.create({
      data: {
        name,
        icon: icon || '📁',
        sort_order: sort_order || 0,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('[GROUPS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
