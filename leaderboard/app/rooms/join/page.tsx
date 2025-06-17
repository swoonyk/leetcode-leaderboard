"use client"

import JoinRoomForm from "../../components/JoinRoomForm"
import { useAuth } from "../../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function JoinRoomPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/rooms/join")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Room</h1>
        <p className="text-gray-600">Enter an invite code to join a private leaderboard</p>
      </div>
      <JoinRoomForm />
    </div>
  )
}
