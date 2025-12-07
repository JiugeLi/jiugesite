import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const website = await db.website.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!website) {
      return new NextResponse('Website not found', { status: 404 });
    }

    return NextResponse.json(website);
  } catch (error) {
    console.error('[WEBSITE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    if (!params.id) {
      return new NextResponse('Website ID is required', { status: 400 });
    }

    const website = await db.website.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        group_id: group_id ? parseInt(group_id) : undefined,
        name,
        url,
        logo_url,
        logo_type,
        description,
        username,
        password,
        sort_order,
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    console.error('[WEBSITE_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('Website ID is required', { status: 400 });
    }

    await db.website.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: 'Website deleted' });
  } catch (error) {
    console.error('[WEBSITE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
