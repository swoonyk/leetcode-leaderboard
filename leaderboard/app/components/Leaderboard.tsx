"use client"

import { useState } from "react"
import { useLeaderboard } from "../hooks/useLeaderboard"
import UserCard from "./UserCard"
import UserProfileModal from "./UserProfileModal"
import FilterControls from "./FilterControls"
import LoadingSpinner from "./LoadingSpinner"
import type { LeaderboardFilters, RankingType, User } from "../lib/types"

export default function Leaderboard() {
  const [filters, setFilters] = useState<LeaderboardFilters>({
    difficulty: "all",
    tags: [],
    ranking: "total" as RankingType,
  })

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: users, loading, error } = useLeaderboard(filters)

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load leaderboard</p>
        <p className="text-gray-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <FilterControls filters={filters} onFiltersChange={setFilters} />

      <div className="space-y-4">
        {users?.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            rank={index + 1}
            rankingType={filters.ranking}
            onClick={() => handleUserClick(user)}
          />
        ))}

        {users?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found with the current filters</p>
          </div>
        )}
      </div>

      {selectedUser && <UserProfileModal user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  )
}
