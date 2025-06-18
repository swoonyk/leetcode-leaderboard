import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from "zod";

const removeUserSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty." }),
  accessCode: z.string().min(1, { message: "Access code is required." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = removeUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: parsed.error.errors[0].message }, { status: 400 });
    }
    
    const { username, accessCode } = parsed.data;

    // Check access code
    if (accessCode !== process.env.ADD_USER_CODE) {
      return NextResponse.json({ success: false, message: "Invalid access code." }, { status: 403 });
    }

    // Find the user to be deleted
    const userToDelete = await prisma.user.findUnique({
      where: { username },
    });

    if (!userToDelete) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // Delete user and their cached stats in a transaction
    await prisma.$transaction([
      prisma.membership.deleteMany({ where: { userId: userToDelete.id } }),
      prisma.statsCache.deleteMany({ where: { username } }),
      prisma.user.delete({ where: { username } }),
    ]);

    return NextResponse.json({ success: true, message: `User "${username}" has been removed.` });
  } catch (error) {
    console.error("Error removing user:", error);
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 });
  }
} 