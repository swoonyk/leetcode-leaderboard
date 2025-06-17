import { LeetCode } from "leetcode-query";

// Create a singleton instance
export const lc = new LeetCode();

let problemDifficultyMap: Map<string, string> | null = null;
let problemMapPromise: Promise<Map<string, string>> | null = null;

// Fetch the global problems list once and cache it
export function getProblemDifficulties(): Promise<Map<string, string>> {
  if (problemDifficultyMap) {
    return Promise.resolve(problemDifficultyMap);
  }

  if (problemMapPromise) {
    return problemMapPromise;
  }

  problemMapPromise = (async () => {
    try {
      const problems = await lc.problems({});
      
      if (!Array.isArray(problems)) {
        problemMapPromise = null;
        return new Map();
      }
      
      const newMap = new Map();
      problems.forEach(problem => {
        if (problem && problem.stat && problem.stat.questionTitleSlug && problem.difficulty) {
          newMap.set(problem.stat.questionTitleSlug, problem.difficulty);
        }
      });
      
      problemDifficultyMap = newMap;
      return problemDifficultyMap;
    } catch (error) {
      console.error("Error fetching problem list:", error);
      problemMapPromise = null; // Reset promise on error
      return new Map();
    }
  })();
  
  return problemMapPromise;
} 