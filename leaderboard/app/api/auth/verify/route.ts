import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("session")?.value

    if (!sessionToken) {
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    const username = sessionToken.split("_")[1]

    if (!username) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      // If user from cookie doesn't exist, invalidate cookie and return 401
      cookieStore.delete("session")
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    return NextResponse.json({
      username,
      sessionToken,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
