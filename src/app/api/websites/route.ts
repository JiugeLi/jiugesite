import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// 启用 Node.js Runtime 并配置缓存
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 60; // 缓存 60 秒

export async function GET() {
  try {
    const websites = await db.website.findMany({
      orderBy: [
        { group_id: 'asc' },
        { click_count: 'desc' },
        { sort_order: 'asc' },
      ],
      // 只选择需要的字段
      select: {
        id: true,
        group_id: true,
        name: true,
        url: true,
        logo_url: true,
        logo_type: true,
        description: true,
        sort_order: true,
        click_count: true,
        created_at: true,
        // 不返回 username 和 password，提高安全性和速度
      },
    });
    
    // 添加缓存头
    return NextResponse.json(websites, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('[WEBSITES_GET]', error);
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
    const {
      group_id,
      name,
      url,
      logo_url,
      logo_type,
      description,
      username,
      password,
      sort_order,
    } = body;

    if (!group_id || !name || !url) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const website = await db.website.create({
      data: {
        group_id: parseInt(group_id),
        name,
        url,
        logo_url,
        logo_type: logo_type || 'default',
        description,
        username,
        password,
        sort_order: sort_order || 0,
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    console.error('[WEBSITES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
