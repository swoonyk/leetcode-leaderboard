"use client"

import Link from "next/link"
import { Trophy } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LeetCode Leaderboard</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
