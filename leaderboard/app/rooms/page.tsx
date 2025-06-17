"use client"

import Link from "next/link"
import RoomsList from "../components/RoomsList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function RoomsPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Rooms</h1>
          <p className="text-gray-600">Explore private leaderboards and compete with groups</p>
        </div>
        {isAuthenticated && (
          <div className="flex space-x-4">
            <Link href="/rooms/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Room
              </Button>
            </Link>
            <Link href="/rooms/join">
              <Button variant="outline">Join Room</Button>
            </Link>
          </div>
        )}
      </div>
      <RoomsList />
    </div>
  )
}
