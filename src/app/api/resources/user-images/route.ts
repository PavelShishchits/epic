import { NextResponse } from 'next/server';

import { prisma } from '@/infrastructure/db/db.server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response('Image ID is required', { status: 400 });
  }

  try {
    const image = await prisma.userImage.findUnique({
      where: {
        id: id,
      },
      select: {
        blob: true,
        contentType: true,
        altText: true,
      },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return new NextResponse(image.blob, {
      headers: {
        'Content-Type': image.contentType,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
