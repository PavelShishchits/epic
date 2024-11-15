import { db } from '@/infrastructure/db/db.server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response('Image ID is required', { status: 400 });
  }

  const image = await db.image.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!image) {
    return new Response('Image not found', { status: 404 });
  }

  return Response.json(image);
}
