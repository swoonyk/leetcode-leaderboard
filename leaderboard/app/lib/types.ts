export interface User {
  id: string
  username: string
  ranking: number
  joinedDate: string
  competitionSolves: number
  easySinceCutoff: number
  mediumSinceCutoff: number
  hardSinceCutoff: number
  acceptanceRateSinceCutoff: number
  lastActive: number
  tagStats: { [key: string]: number }
  recentProblems: {
    title: string
    titleSlug: string
    timestamp: string
    statusDisplay: string
  }[]
  streak: number
  maxStreak: number
  contestRating: number | null
  favoriteTopics: any[]
}

export type RankingType = "competition" | "accuracy"

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
