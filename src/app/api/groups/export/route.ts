import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const groups = await db.group.findMany({
      orderBy: { sort_order: 'asc' },
    });
    const websites = await db.website.findMany({
      orderBy: { sort_order: 'asc' },
    });

    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      data: {
        groups,
        websites,
      },
    };

    return NextResponse.json(exportData);
  } catch (error) {
    console.error('[EXPORT_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
