"use client"

import { useState, useEffect } from "react"
import type { User } from "../lib/types"
import { X, Trophy, Calendar, Target, Clock, Zap, Star } from "lucide-react"

interface UserProfileModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
  rank?: number
}

export default function UserProfileModal({ user, isOpen, onClose, rank }: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "recent" | "stats">("overview")

  // Add event listener for escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null

  const displayRank = rank || user.ranking || 1

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
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog" 
      aria-modal="true"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"></div>
      
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal panel */}
        <div 
          className="relative inline-block w-full max-w-4xl bg-white rounded-xl shadow-xl transform transition-all my-8 max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Custom User Badge Header - This is likely what's causing the rank #10 issue */}
          <div className="bg-blue-500 p-3 flex items-center space-x-3">
            <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl text-white font-bold">{user.username.replace(/0+$/, '')}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center space-x-1 text-white text-sm">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>Rank #{displayRank}</span>
                </div>
                <div className="flex items-center space-x-1 text-white text-sm">
                  <Zap className="h-3.5 w-3.5" />
                  <span>{user.streak} day streak</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Header - We'll keep this as a secondary UI element for now */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative" style={{ display: 'none' }}>
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
                <h2 className="text-3xl font-bold">{user.username.replace(/0+$/, '')}</h2>
                <div className="flex items-center space-x-4 mt-2 text-blue-100">
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4" />
                    <span>Rank #{displayRank}</span>
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
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-colors z-50"
          >
            <X className="h-4 w-4" />
          </button>
          
          {/* Tabs */}
          <div className="border-b">
            <div className="flex space-x-8 px-4">
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
          <div className="p-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
            {activeTab === "overview" && (
              <div className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{user.easySinceCutoff}</div>
                    <div className="text-sm text-green-700">Easy</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{user.mediumSinceCutoff}</div>
                    <div className="text-sm text-yellow-700">Medium</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{user.hardSinceCutoff}</div>
                    <div className="text-sm text-red-700">Hard</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.acceptanceRate}%</div>
                    <div className="text-sm text-blue-700">Accuracy</div>
                  </div>
                </div>
              
                {/* Progress Overview */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold mb-2">Progress Overview</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                      <span>{user.competitionSolves} Problems Solved</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Streak</span>
                      <span className="font-semibold">{user.streak} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Max Streak</span>
                      <span className="font-semibold">{user.maxStreak} days</span>
                    </div>
                  </div>
                </div>
              
                {/* Favorite Topics */}
                <div>
                  <h3 className="font-semibold mb-2">Favorite Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.favoriteTopics.length > 0 ? (
                      user.favoriteTopics.map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {topic}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No favorite topics yet</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "recent" && (
              <div className="space-y-3">
                <h3 className="font-semibold">Recently Solved Problems</h3>
                {user.recentProblems.map((problem) => (
                  <div key={problem.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{problem.title}</h4>
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-1">
                          {problem.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeSpent(problem.timeSpent)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>
                              {problem.attempts} attempt{problem.attempts !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
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
              <div className="p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Acceptance Rate</span>
                        <span className="font-medium">{user.acceptanceRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recent Activity</span>
                        <span className="font-medium">{user.recentSolves} problems</span>
                      </div>
                      {user.contestRating && user.contestRating > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contest Rating</span>
                          <span className="font-medium">{user.contestRating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Activity</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Streak</span>
                        <span className="font-medium">{user.streak} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best Streak</span>
                        <span className="font-medium">{user.maxStreak} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Active</span>
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
    </div>
  )
}
