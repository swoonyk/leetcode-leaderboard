"use client"

import Link from "next/link"
import { useRooms } from "../hooks/useRooms"
import RoomCard from "./RoomCard"
import LoadingSpinner from "./LoadingSpinner"
import { useAuth } from "../contexts/AuthContext"

export default function RoomsList() {
  const { data: rooms, loading, error } = useRooms()
  const { isAuthenticated } = useAuth()

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load rooms</p>
        <p className="text-gray-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms?.map((room) => (
        <Link key={room.id} href={`/rooms/${room.id}`}>
          <RoomCard room={room} />
        </Link>
      ))}

      {rooms?.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 mb-4">No rooms available</p>
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link href="/rooms/create" className="text-blue-600 hover:text-blue-700 block">
                Create your first room
              </Link>
              <Link href="/rooms/join" className="text-blue-600 hover:text-blue-700 block">
                Or join an existing room
              </Link>
            </div>
          ) : (
            <Link href="/login" className="text-blue-600 hover:text-blue-700">
              Sign in to create or join rooms
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
