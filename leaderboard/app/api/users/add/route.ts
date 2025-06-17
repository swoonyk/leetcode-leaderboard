import { type NextRequest, NextResponse } from "next/server"

const existingUsers = new Set(["CodeMaster2024", "AlgoNinja", "DataStructureGuru", "BinarySearchPro", "RecursionQueen"])

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const trimmedUsername = username.trim()

    if (existingUsers.has(trimmedUsername)) {
      return NextResponse.json({ error: "User already exists on the leaderboard" }, { status: 409 })
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const validUsernames = ["testuser1", "testuser2", "newcoder", "pythonpro", "jsmaster"]

    if (!validUsernames.includes(trimmedUsername.toLowerCase())) {
      return NextResponse.json({ error: "LeetCode username not found" }, { status: 404 })
    }

    existingUsers.add(trimmedUsername)

    return NextResponse.json({
      success: true,
      message: `User ${trimmedUsername} added successfully`,
      username: trimmedUsername,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
