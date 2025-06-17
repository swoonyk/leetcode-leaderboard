import { type NextRequest, NextResponse } from "next/server"

const validUsernames = ["CodeMaster2024", "AlgoNinja", "DataStructureGuru", "BinarySearchPro", "RecursionQueen"]

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const username = params.username

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (!validUsernames.includes(username)) {
      return NextResponse.json({ error: "Username not found" }, { status: 404 })
    }

    const mockStats = {
      username,
      totalSolved: Math.floor(Math.random() * 1000) + 500,
      easySolved: Math.floor(Math.random() * 300) + 200,
      mediumSolved: Math.floor(Math.random() * 400) + 200,
      hardSolved: Math.floor(Math.random() * 200) + 50,
      acceptanceRate: Math.floor(Math.random() * 30) + 70,
      recentSolves: Math.floor(Math.random() * 50) + 10,
      lastActive: new Date().toISOString(),
    }

    return NextResponse.json(mockStats)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
