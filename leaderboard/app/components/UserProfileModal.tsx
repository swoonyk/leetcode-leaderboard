"use client"

import { useState } from "react"
import type { User } from "../lib/types"
import { X, Trophy, Calendar, Target, Clock, Zap, Star } from "lucide-react"

interface UserProfileModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
}

export default function UserProfileModal({ user, isOpen, onClose }: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "recent" | "stats">("overview")

  if (!isOpen) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "Hard":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const formatTimeSpent = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{user.username}</h2>
              <div className="flex items-center space-x-4 mt-2 text-blue-100">
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4" />
                  <span>Rank #{user.ranking}</span>
                </div>
                {user.contestRating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{user.contestRating} rating</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>{user.streak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-8 px-6">
            {[
              { id: "overview", label: "Overview" },
              { id: "recent", label: "Recent Activity" },
              { id: "stats", label: "Statistics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{user.easySolved}</div>
                  <div className="text-sm text-green-700">Easy</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{user.mediumSolved}</div>
                  <div className="text-sm text-yellow-700">Medium</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">{user.hardSolved}</div>
                  <div className="text-sm text-red-700">Hard</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{user.acceptanceRate}%</div>
                  <div className="text-sm text-blue-700">Accuracy</div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Progress Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Problems Solved</span>
                    <span className="font-semibold">{user.totalSolved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <span className="font-semibold">{user.streak} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Max Streak</span>
                    <span className="font-semibold">{user.maxStreak} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-semibold">{new Date(user.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Favorite Topics */}
              <div>
                <h3 className="font-semibold mb-3">Favorite Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteTopics.map((topic) => (
                    <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "recent" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Recently Solved Problems</h3>
              {user.recentProblems.map((problem) => (
                <div key={problem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{problem.title}</h4>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {problem.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTimeSpent(problem.timeSpent)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>
                            {problem.attempts} attempt{problem.attempts !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(problem.solvedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              {/* Topic Statistics */}
              <div>
                <h3 className="font-semibold mb-4">Topic Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(user.tagStats)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([topic, count]) => (
                      <div key={topic} className="flex items-center justify-between">
                        <span className="text-sm">{topic}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(count / Math.max(...Object.values(user.tagStats))) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Acceptance Rate</span>
                      <span className="font-medium">{user.acceptanceRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Recent Activity</span>
                      <span className="font-medium">{user.recentSolves} problems</span>
                    </div>
                    {user.contestRating && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Contest Rating</span>
                        <span className="font-medium">{user.contestRating}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Streak</span>
                      <span className="font-medium">{user.streak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Best Streak</span>
                      <span className="font-medium">{user.maxStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Active</span>
                      <span className="font-medium">{new Date(user.lastActive).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
