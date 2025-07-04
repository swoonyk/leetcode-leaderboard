import { NextResponse } from 'next/server';
import { LeetCode } from 'leetcode-query';
import { prisma } from '@/lib/prisma';
import { z } from "zod";

const addUserSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty." }),
  accessCode: z.string().min(1, { message: "Access code is required." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = addUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: parsed.error.errors[0].message }, { status: 400 });
    }
    
    const { username, accessCode } = parsed.data;

    // Check access code
    if (accessCode !== process.env.ADD_USER_CODE) {
      return NextResponse.json({ success: false, message: "Invalid access code." }, { status: 403 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists in the leaderboard." }, { status: 409 });
    }

    const lc = new LeetCode();
    const leetcodeUser = await lc.user(username);

    if (!leetcodeUser || !leetcodeUser.matchedUser) {
        return NextResponse.json({ error: 'User not found on LeetCode' }, { status: 404 });
    }

    const user = await prisma.user.create({
      data: {
        username: username,
      },
    });

    return NextResponse.json({ success: true, message: `User "${username}" added successfully!` });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 });
  }
}
