"use client"

import { useState, useEffect } from "react"
import type { User } from "../lib/types"
import { fetchUserStats } from "../lib/api"

export function useUserStats(userId: string) {
  const [data, setData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchUserStats(userId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user stats")
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchData()
    }
  }, [userId])

  return { data, loading, error }
}
