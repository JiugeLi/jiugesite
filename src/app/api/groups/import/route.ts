import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, mode = 'merge' } = body; // data should have { groups, websites }

    if (!data || !data.groups || !data.websites) {
      return new NextResponse('Invalid data format', { status: 400 });
    }

    // If replace, delete everything
    if (mode === 'replace') {
      await db.website.deleteMany({});
      await db.group.deleteMany({});
    }

    // Simple import logic (simplified for MVP)
    // In a real app, we need to map IDs from old to new
    const groupIdMap: Record<number, number> = {};

    for (const grp of data.groups) {
      const newGroup = await db.group.create({
        data: {
          name: grp.name,
          icon: grp.icon,
          sort_order: grp.sort_order,
        },
      });
      groupIdMap[grp.id] = newGroup.id;
    }

    for (const site of data.websites) {
      const newGroupId = groupIdMap[site.group_id];
      if (newGroupId) {
        await db.website.create({
          data: {
            group_id: newGroupId,
            name: site.name,
            url: site.url,
            logo_url: site.logo_url,
            logo_type: site.logo_type,
            description: site.description,
            sort_order: site.sort_order,
          },
        });
      }
    }

    return NextResponse.json({ message: 'Import successful' });
  } catch (error) {
    console.error('[IMPORT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
