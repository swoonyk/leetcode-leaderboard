import type { User, LeaderboardFilters } from "./types"

const mockUsers: User[] = [
  {
    id: "1",
    username: "CodeMaster2024",
    totalSolved: 1247,
    easySolved: 423,
    mediumSolved: 612,
    hardSolved: 212,
    acceptanceRate: 87.3,
    recentSolves: 23,
    lastActive: "2024-01-15T10:30:00Z",
    tagStats: { Array: 156, "Dynamic Programming": 89, String: 134 },
    streak: 15,
    maxStreak: 47,
    ranking: 1,
    contestRating: 2156,
    joinedDate: "2022-03-15T00:00:00Z",
    favoriteTopics: ["Dynamic Programming", "Array", "Graph"],
    recentProblems: [
      {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
        solvedAt: "2024-01-15T09:30:00Z",
        timeSpent: 12,
        attempts: 1,
        tags: ["Array", "Hash Table"],
      },
      {
        id: "2",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        solvedAt: "2024-01-14T15:45:00Z",
        timeSpent: 35,
        attempts: 3,
        tags: ["String", "Dynamic Programming"],
      },
      {
        id: "3",
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        solvedAt: "2024-01-14T11:20:00Z",
        timeSpent: 67,
        attempts: 2,
        tags: ["Linked List", "Divide and Conquer", "Heap"],
      },
    ],
  },
  {
    id: "2",
    username: "AlgoNinja",
    totalSolved: 1156,
    easySolved: 389,
    mediumSolved: 578,
    hardSolved: 189,
    acceptanceRate: 91.2,
    recentSolves: 18,
    lastActive: "2024-01-14T15:45:00Z",
    tagStats: { Array: 142, "Dynamic Programming": 95, String: 128 },
    streak: 8,
    maxStreak: 32,
    ranking: 2,
    contestRating: 1987,
    joinedDate: "2022-01-20T00:00:00Z",
    favoriteTopics: ["Binary Search", "Two Pointers", "Sliding Window"],
    recentProblems: [
      {
        id: "4",
        title: "Binary Search",
        difficulty: "Easy",
        solvedAt: "2024-01-14T14:20:00Z",
        timeSpent: 8,
        attempts: 1,
        tags: ["Array", "Binary Search"],
      },
      {
        id: "5",
        title: "Container With Most Water",
        difficulty: "Medium",
        solvedAt: "2024-01-13T16:30:00Z",
        timeSpent: 28,
        attempts: 2,
        tags: ["Array", "Two Pointers"],
      },
    ],
  },
  {
    id: "3",
    username: "DataStructureGuru",
    totalSolved: 1089,
    easySolved: 356,
    mediumSolved: 534,
    hardSolved: 199,
    acceptanceRate: 84.7,
    recentSolves: 31,
    lastActive: "2024-01-15T09:20:00Z",
    tagStats: { Array: 138, "Dynamic Programming": 78, String: 119 },
    streak: 12,
    maxStreak: 28,
    ranking: 3,
    contestRating: 1834,
    joinedDate: "2022-05-10T00:00:00Z",
    favoriteTopics: ["Tree", "Graph", "Heap"],
    recentProblems: [],
  },
  {
    id: "4",
    username: "BinarySearchPro",
    totalSolved: 967,
    easySolved: 312,
    mediumSolved: 489,
    hardSolved: 166,
    acceptanceRate: 89.1,
    recentSolves: 15,
    lastActive: "2024-01-13T18:10:00Z",
    tagStats: { Array: 125, "Dynamic Programming": 67, String: 102 },
    streak: 5,
    maxStreak: 21,
    ranking: 4,
    joinedDate: "2023-01-15T00:00:00Z",
    favoriteTopics: ["Binary Search", "Sorting"],
    recentProblems: [],
  },
  {
    id: "5",
    username: "RecursionQueen",
    totalSolved: 834,
    easySolved: 278,
    mediumSolved: 412,
    hardSolved: 144,
    acceptanceRate: 92.5,
    recentSolves: 27,
    lastActive: "2024-01-15T12:00:00Z",
    tagStats: { Array: 108, "Dynamic Programming": 89, String: 95 },
    streak: 9,
    maxStreak: 19,
    ranking: 5,
    joinedDate: "2023-03-20T00:00:00Z",
    favoriteTopics: ["Recursion", "Backtracking"],
    recentProblems: [],
  },
]

export async function fetchGlobalLeaderboard(filters: LeaderboardFilters): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let filteredUsers = [...mockUsers]

  if (filters.difficulty !== "all") {
    filteredUsers = filteredUsers.filter((user) => {
      const difficultyCount =
        filters.difficulty === "easy"
          ? user.easySolved
          : filters.difficulty === "medium"
            ? user.mediumSolved
            : user.hardSolved
      return difficultyCount > 0
    })
  }

  if (filters.tags.length > 0) {
    filteredUsers = filteredUsers.filter((user) => filters.tags.some((tag) => user.tagStats[tag] > 0))
  }

  filteredUsers.sort((a, b) => {
    switch (filters.ranking) {
      case "recent":
        return b.recentSolves - a.recentSolves
      case "accuracy":
        return b.acceptanceRate - a.acceptanceRate
      default:
        return b.totalSolved - a.totalSolved
    }
  })

  return filteredUsers
}
