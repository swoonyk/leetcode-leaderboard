"use client"

import { useState, useEffect } from "react"
import type { User, LeaderboardFilters } from "../lib/types"
import { fetchGlobalLeaderboard } from "../lib/api"

export function useLeaderboard(filters?: LeaderboardFilters) {
  const [data, setData] = useState<User[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const defaultFilters: LeaderboardFilters = {
          difficulty: "all",
          tags: [],
          ranking: "total",
        }

        const activeFilters = filters || defaultFilters
        const result = await fetchGlobalLeaderboard(activeFilters)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch leaderboard")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filters])

  return { data, loading, error }
}
