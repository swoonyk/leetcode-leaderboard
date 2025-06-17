"use client"

import { useState } from "react"
import Link from "next/link"
import type { Room } from "../lib/types"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Copy, Check, UserPlus, LogIn, Plus } from "lucide-react"

interface RoomHeaderProps {
  room: Room
}

export default function RoomHeader({ room }: RoomHeaderProps) {
  const { isAuthenticated } = useAuth()
  const [copied, setCopied] = useState(false)

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(room.inviteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy invite code:", err)
    }
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{room.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{room.description}</p>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{room.memberCount} members</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Created {new Date(room.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {isAuthenticated ? (
            <>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between space-x-4">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Invite Code</p>
                      <p className="text-lg font-mono font-bold text-blue-700">{room.inviteCode}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyInviteCode}
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">Share this code to invite others</p>
                </CardContent>
              </Card>

              <div className="flex flex-col space-y-2">
                <Link href="/rooms/create">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Room
                  </Button>
                </Link>
                <Link href="/rooms/join">
                  <Button variant="outline" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Room
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Want to join this room or create your own?</p>
                  <Link href="/login">
                    <Button>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
