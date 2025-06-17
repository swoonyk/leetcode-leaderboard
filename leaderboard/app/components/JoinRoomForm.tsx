"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { joinRoom } from "../lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JoinRoomForm() {
  const [inviteCode, setInviteCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteCode.trim()) return

    setLoading(true)
    setError("")

    try {
      const room = await joinRoom(inviteCode)
      router.push(`/rooms/${room.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join room")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="inviteCode">Invite Code</Label>
          <Input
            id="inviteCode"
            type="text"
            placeholder="Enter room invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="mt-1"
          />
        </div>

        {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>}

        <Button type="submit" disabled={loading || !inviteCode.trim()} className="w-full">
          {loading ? "Joining..." : "Join Room"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Don't have an invite code?</p>
        <p>Ask a room member to share their invite link with you.</p>
      </div>
    </div>
  )
}
