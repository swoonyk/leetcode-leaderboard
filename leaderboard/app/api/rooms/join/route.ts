import { NextResponse, type NextRequest } from 'next/server';
import { getSessionUser } from '../../../lib/session';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const joinRoomSchema = z.object({
  code: z.string().length(6, 'Room code must be 6 characters long.'),
});

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = joinRoomSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const { code } = validation.data;

    const room = await prisma.room.findUnique({
      where: { code },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // This will fail if the user is already a member, due to the unique constraint.
    // We can catch the error and return a more friendly message.
    try {
      await prisma.membership.create({
        data: {
          userId: user.id,
          roomId: room.id,
        },
      });
    } catch (error: any) {
        if (error.code === 'P2002') { // Prisma unique constraint violation
            return NextResponse.json({ error: 'User is already a member of this room' }, { status: 409 });
        }
        throw error;
    }


    return NextResponse.json(room);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 