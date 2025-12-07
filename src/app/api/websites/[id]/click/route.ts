import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('Website ID is required', { status: 400 });
    }

    const website = await db.website.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        click_count: {
          increment: 1,
        },
        last_clicked_at: new Date(),
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    console.error('[WEBSITE_CLICK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
