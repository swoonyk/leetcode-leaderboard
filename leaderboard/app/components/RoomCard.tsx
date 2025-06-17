import type { Room } from "../lib/types"
import { Users, Calendar, Trophy } from "lucide-react"

interface RoomCardProps {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{room.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{room.description}</p>
        </div>
        <Trophy className="h-5 w-5 text-blue-600 flex-shrink-0" />
      </div>

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>{room.memberCount} members</span>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Created {new Date(room.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Your rank:</span>
          <span className="font-medium text-gray-900">#{room.userRank}</span>
        </div>
      </div>
    </div>
  )
}
