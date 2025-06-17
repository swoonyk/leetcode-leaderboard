"use client"

import { useState, useEffect } from "react"
import type { Room } from "../lib/types"
import { fetchAllRooms } from "../lib/api"

export function useRooms() {
  const [data, setData] = useState<Room[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchAllRooms()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch rooms")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
