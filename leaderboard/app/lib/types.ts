export interface User {
  id: string
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate: number
  recentSolves: number
  lastActive: string
  tagStats: Record<string, number>
  recentProblems: RecentProblem[]
  streak: number
  maxStreak: number
  ranking: number
  contestRating?: number
  joinedDate: string
  favoriteTopics: string[]
}

export type RankingType = "total" | "recent" | "accuracy"

export interface LeaderboardFilters {
  difficulty: "all" | "easy" | "medium" | "hard"
  tags: string[]
  ranking: RankingType
}

export interface RecentProblem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  solvedAt: string
  timeSpent: number
  attempts: number
  tags: string[]
}
