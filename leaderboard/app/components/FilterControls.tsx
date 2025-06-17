"use client"

import type { LeaderboardFilters, RankingType } from "../lib/types"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterControlsProps {
  filters: LeaderboardFilters
  onFilterChange: (filters: Partial<LeaderboardFilters>) => void
}

const TOPIC_TAGS = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Database",
  "Breadth-First Search",
  "Tree",
  "Matrix",
  "Two Pointers",
  "Binary Tree",
  "Bit Manipulation",
  "Stack",
  "Design",
  "Heap",
  "Graph",
  "Simulation",
  "Backtracking",
  "Counting",
  "Sliding Window",
]

export default function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  const updateFilters = (updates: Partial<LeaderboardFilters>) => {
    onFilterChange(updates)
  }

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]
    updateFilters({ tags: newTags })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Ranking:</label>
          <Select value={filters.ranking} onValueChange={(value: RankingType) => updateFilters({ ranking: value })}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="competition">Competition Solves</SelectItem>
              <SelectItem value="accuracy">Accuracy Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Difficulty:</label>
          <Select value={filters.difficulty} onValueChange={(value) => updateFilters({ difficulty: value })}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Topics:</label>
          <div className="relative">
            <Select
              value={filters.tags.length > 0 ? "filtered" : "all"}
              onValueChange={(value) => {
                if (value === "all") {
                  updateFilters({ tags: [] })
                }
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue>{filters.tags.length > 0 ? `${filters.tags.length} selected` : "All topics"}</SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <SelectItem value="all">All Topics</SelectItem>
                {TOPIC_TAGS.map((tag) => (
                  <div
                    key={tag}
                    className={`px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                      filters.tags.includes(tag) ? "bg-blue-50 text-blue-700" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleTag(tag)
                    }}
                  >
                    <span>{tag}</span>
                    {filters.tags.includes(tag) && <span className="text-blue-600">✓</span>}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filters.tags.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => updateFilters({ tags: [] })}>
            Clear Tags ({filters.tags.length})
          </Button>
        )}
      </div>
    </div>
  )
}
