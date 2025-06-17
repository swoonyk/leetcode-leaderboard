"use client"

import type { User, RankingType } from "../lib/types"
import { Trophy, Target, Calendar, TrendingUp, Zap, Star } from "lucide-react"

interface UserCardProps {
  user: User
  rank: number
  rankingType: RankingType
  onClick: () => void
}

export default function UserCard({ user, rank, rankingType, onClick }: UserCardProps) {
  const getRankingValue = () => {
    switch (rankingType) {
      case "recent":
        return `${user.recentSolves} recent`
      case "accuracy":
        return `${user.acceptanceRate}% accuracy`
      default:
        return `${user.totalSolved} solved`
    }
  }

  const getRankingIcon = () => {
    switch (rankingType) {
      case "recent":
        return <Calendar className="h-4 w-4" />
      case "accuracy":
        return <Target className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getRankColor = () => {
    if (rank === 1) return "text-yellow-600 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg"
    if (rank === 2) return "text-gray-600 bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-md"
    if (rank === 3) return "text-orange-600 bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md"
    return "text-gray-500 bg-gray-100"
  }

  const getRankBadge = () => {
    if (rank <= 3) {
      return (
        <div className="flex items-center space-x-1">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor()}`}
          >
            {rank === 1 ? "🏆" : rank === 2 ? "🥈" : "🥉"}
          </div>
          <div className="text-sm font-medium text-gray-600">#{rank}</div>
        </div>
      )
    }
    return (
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor()}`}>
        {rank}
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-blue-200 hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getRankBadge()}

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {user.streak > 0 && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {user.streak}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-lg text-gray-900">{user.username}</h3>
                  {user.contestRating && user.contestRating > 2000 && <Star className="h-4 w-4 text-yellow-500" />}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                  {getRankingIcon()}
                  <span className="font-medium">{getRankingValue()}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>{user.streak} day streak</span>
                  </div>
                  {user.contestRating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{user.contestRating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="font-bold text-green-600 text-lg">{user.easySolved}</div>
                <div className="text-green-700 text-xs font-medium">Easy</div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="font-bold text-yellow-600 text-lg">{user.mediumSolved}</div>
                <div className="text-yellow-700 text-xs font-medium">Medium</div>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <div className="font-bold text-red-600 text-lg">{user.hardSolved}</div>
                <div className="text-red-700 text-xs font-medium">Hard</div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="font-bold text-blue-600 text-lg">{user.acceptanceRate}%</div>
                <div className="text-blue-700 text-xs font-medium">Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>{user.recentSolves} solved in last 7 days</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Last active: {new Date(user.lastActive).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
