"use client"

import { useState, useEffect, useMemo } from "react"
import type { User } from "../lib/types"

export interface LeaderboardStats {
  totalCompetitionSolves: number
  problemsSolvedToday: number
  averageAccuracy: number
}

export function useLeaderboardStats(users: User[] | null): LeaderboardStats {
  const stats = useMemo(() => {
    if (!users || users.length === 0) {
      return {
        totalCompetitionSolves: 0,
        problemsSolvedToday: 0,
        averageAccuracy: 0,
      }
    }

    const totalCompetitionSolves = users.reduce((acc, user) => acc + user.competitionSolves, 0)
    
    // Average accuracy calculation
    const usersWithSubmissions = users.filter(u => u.competitionSolves > 0);
    const totalAccuracy = usersWithSubmissions.reduce((acc, user) => acc + user.acceptanceRateSinceCutoff, 0);
    const averageAccuracy = usersWithSubmissions.length > 0 ? totalAccuracy / usersWithSubmissions.length : 0;

    const today = new Date().toDateString()
    const problemsSolvedToday = users.filter(user => new Date(user.lastActive).toDateString() === today).length

    return { totalCompetitionSolves, problemsSolvedToday, averageAccuracy }
  }, [users])

  return stats
} 