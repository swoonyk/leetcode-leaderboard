import Leaderboard from "../../components/Leaderboard"
import RoomHeader from "../../components/RoomHeader"
import { getRoomById } from "../../lib/api"

export default async function RoomPage({ params }: { params: { roomId: string } }) {
  const room = await getRoomById(params.roomId)

  if (!room) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h1>
        <p className="text-gray-600">The room you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div>
      <RoomHeader room={room} />
      <Leaderboard type="room" roomId={params.roomId} />
    </div>
  )
}
