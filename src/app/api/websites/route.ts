import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const websites = await db.website.findMany({
      orderBy: [
        { group_id: 'asc' },
        { click_count: 'desc' },
        { sort_order: 'asc' },
      ],
    });
    return NextResponse.json(websites);
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
