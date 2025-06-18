import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/app/lib/session';

const generateCode = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export async function GET() {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const memberships = await prisma.membership.findMany({
      where: { userId: user.id },
      include: {
        room: true,
      },
    });

    const rooms = memberships.map((m) => m.room);

    return NextResponse.json(rooms);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
    try {
        const user = await getSessionUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let roomCode;
        let isCodeUnique = false;
        
        // Generate a unique room code
        while (!isCodeUnique) {
            roomCode = generateCode();
            const existingRoom = await prisma.room.findUnique({
                where: { code: roomCode },
            });
            if (!existingRoom) {
                isCodeUnique = true;
            }
        }

        const room = await prisma.room.create({
            data: {
                code: roomCode!,
                members: {
                    create: {
                        userId: user.id,
                    },
                },
            },
        });

        return NextResponse.json(room, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 