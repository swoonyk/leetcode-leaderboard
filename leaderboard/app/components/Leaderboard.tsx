"use client"

import { useState } from "react"
import UserCard from "./UserCard"
import FilterControls from "./FilterControls"
import type { LeaderboardFilters, User } from "../lib/types"
import UserProfileModal from "./UserProfileModal"
import { Skeleton } from "@/components/ui/skeleton"

interface LeaderboardProps {
  users: User[] | null
  loading: boolean
  filters: LeaderboardFilters
  onFilterChange: (newFilters: Partial<LeaderboardFilters>) => void
}

export default function Leaderboard({ users, loading, filters, onFilterChange }: LeaderboardProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
  }

  const sortedUsers = users
    ? [...users].sort((a, b) => {
        if (filters.ranking === "accuracy") {
          return b.acceptanceRateSinceCutoff - a.acceptanceRateSinceCutoff
        }
        return b.competitionSolves - a.competitionSolves
      })
    : []

  return (
    <div>
      <FilterControls filters={filters} onFilterChange={onFilterChange} />
      <div className="space-y-4 mt-6">
        {loading && (
          <>
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </>
        )}
        {!loading &&
          sortedUsers.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              rank={index + 1}
              rankingType={filters.ranking}
              onClick={() => handleUserClick(user)}
            />
          ))}
      </div>
      {selectedUser && <UserProfileModal user={selectedUser} isOpen={!!selectedUser} onClose={handleCloseModal} />}
    </div>
  )
}
