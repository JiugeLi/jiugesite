import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, icon, sort_order } = body;

    if (!params.id) {
      return new NextResponse('Group ID is required', { status: 400 });
    }

    const group = await db.group.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name,
        icon,
        sort_order,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('[GROUP_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse('Group ID is required', { status: 400 });
    }

    await db.group.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: 'Group deleted' });
  } catch (error) {
    console.error('[GROUP_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
