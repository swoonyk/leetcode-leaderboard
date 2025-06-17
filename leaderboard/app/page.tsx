"use client"

import { useState } from "react"
import Leaderboard from "./components/Leaderboard"
import AddUserModal from "./components/AddUserModal"
import { Trophy, TrendingUp, Target, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">LeetCode Leaderboard</h1>
            <p className="text-blue-100 text-lg">Track and compare LeetCode progress with the community</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsAddUserModalOpen(true)}
              variant="secondary"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border-opacity-30"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <Trophy className="h-16 w-16 text-yellow-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span className="text-sm">Total Problems</span>
            </div>
            <div className="text-2xl font-bold mt-1">2,847</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Problems Solved Today</span>
            </div>
            <div className="text-2xl font-bold mt-1">3,291</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span className="text-sm">Average Accuracy</span>
            </div>
            <div className="text-2xl font-bold mt-1">84.2%</div>
          </div>
        </div>
      </div>

      <Leaderboard />

      <AddUserModal isOpen={isAddUserModalOpen} onClose={() => setIsAddUserModalOpen(false)} />
    </div>
  )
}
