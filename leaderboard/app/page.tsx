"use client"

import { useState, useEffect } from "react"
import Leaderboard from "./components/Leaderboard"
import ManageUsersModal from "./components/ManageUsersModal"
import { Trophy, TrendingUp, Target, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLeaderboardStats } from "./hooks/useLeaderboardStats"
import { fetchGlobalLeaderboard } from "./lib/api"
import type { User, LeaderboardFilters } from "./lib/types"

export default function HomePage() {
  const [isManageUsersModalOpen, setIsManageUsersModalOpen] = useState(false)
  const [users, setUsers] = useState<User[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<LeaderboardFilters>({
    ranking: "competition",
    difficulty: "all",
    tags: [],
  })
  const stats = useLeaderboardStats(users)

  const loadLeaderboard = async () => {
    setLoading(true)
    try {
      const data = await fetchGlobalLeaderboard(filters)
      setUsers(data)
    } catch (error) {
      console.error("Failed to fetch leaderboard", error)
      setUsers([])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadLeaderboard()
  }, [filters])

  useEffect(() => {
    window.addEventListener("userAdded", loadLeaderboard)
    window.addEventListener("userRemoved", loadLeaderboard)
    return () => {
      window.removeEventListener("userAdded", loadLeaderboard)
      window.removeEventListener("userRemoved", loadLeaderboard)
    }
  }, [filters])

  const handleFilterChange = (newFilters: Partial<LeaderboardFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

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
              onClick={() => setIsManageUsersModalOpen(true)}
              variant="secondary"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border-opacity-30"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Manage Users
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
            <div className="text-2xl font-bold mt-1">
              {loading ? "Loading..." : stats.totalCompetitionSolves.toLocaleString()}
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Problems Solved Recently</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {loading ? "Loading..." : stats.problemsSolvedToday.toLocaleString()}
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span className="text-sm">Average Accuracy</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {loading ? "Loading..." : `${stats.averageAccuracy.toFixed(1)}%`}
            </div>
          </div>
        </div>
      </div>

      <Leaderboard users={users} loading={loading} onFilterChange={handleFilterChange} filters={filters} />

      <ManageUsersModal isOpen={isManageUsersModalOpen} onClose={() => setIsManageUsersModalOpen(false)} />
    </div>
  )
}
