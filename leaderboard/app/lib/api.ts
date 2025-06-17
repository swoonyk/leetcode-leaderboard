import type { User, LeaderboardFilters, Room } from './types';
import { toast } from "sonner"
import type { RankingType } from "./types"

// The base URL for our API routes
const API_BASE_URL = '/api';

export async function fetchGlobalLeaderboard(filters: LeaderboardFilters): Promise<User[]> {
  const params = new URLSearchParams();
  params.append('ranking', filters.ranking);
  // Note: The new backend doesn't support difficulty/tag filtering on the main leaderboard endpoint directly.
  // The frontend can implement client-side filtering if needed, but for now, we pass the main ranking parameter.

  const response = await fetch(`${API_BASE_URL}/users/leaderboard?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  return response.json();
}

export async function addUser(username: string, accessCode: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, accessCode }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add user");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to add user");
  }
}

export async function login(username: string): Promise<{ success: true; username: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
    }
    return response.json();
}

export async function logout(): Promise<{ success: true }> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    return response.json();
}

export async function fetchUserStats(username: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${username}/stats`);
    if (!response.ok) {
        throw new Error('Failed to fetch user stats');
    }
    return response.json();
}

export async function fetchRooms(): Promise<Room[]> {
    const response = await fetch(`${API_BASE_URL}/rooms`);
    if (!response.ok) {
        throw new Error('Failed to fetch rooms');
    }
    return response.json();
}

export async function createRoom(): Promise<Room> {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to create room');
    }
    return response.json();
}

export async function joinRoom(code: string): Promise<Room> {
    const response = await fetch(`${API_BASE_URL}/rooms/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join room');
    }
    return response.json();
}

export async function fetchRoomLeaderboard(roomId: string, ranking: string): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/leaderboard?ranking=${ranking}`);
    if (!response.ok) {
        throw new Error('Failed to fetch room leaderboard');
    }
    return response.json();
}

export async function removeUser(username: string, accessCode: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, accessCode }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove user');
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to remove user');
  }
}

export async function getRooms(): Promise<Room[]> {
  const response = await fetch(`${API_BASE_URL}/rooms`)
  if (!response.ok) {
    throw new Error('Failed to fetch rooms');
  }
  return response.json();
}
