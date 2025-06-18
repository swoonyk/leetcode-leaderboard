import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import type { User } from '@/lib/types';
import { COMPETITION_START } from '@/lib/constants';
import { lc, getProblemDifficulties } from '@/lib/leetcode';
import type { UserProfile, Submission } from 'leetcode-query';

const TEN_MINUTES_IN_SECONDS = 10 * 60;

interface SubmissionWithDifficulty extends Submission {
  difficulty?: string;
}

async function fetchCompetitionStats(username: string, profile: UserProfile) {
  const problemMap = await getProblemDifficulties();
  const accepted: SubmissionWithDifficulty[] = [];
  let totalSince = 0;

  const allSubmissions = profile.recentSubmissionList ?? [];

  if (allSubmissions.length === 0) {
    return {
      competitionSolves: 0, easySinceCutoff: 0, mediumSinceCutoff: 0, hardSinceCutoff: 0,
      acceptanceRateSinceCutoff: 0, lastActive: new Date().toISOString(),
    };
  }
  
  for (const s of allSubmissions) {
    const ms = parseInt(s.timestamp, 10) * 1000;
    if (ms >= COMPETITION_START) {
      totalSince++;
      if (s.statusDisplay === "Accepted") {
        const difficulty = problemMap.get(s.titleSlug) ?? "Medium";
        accepted.push({ ...s, difficulty });
      }
    }
  }

  const diffCounts = accepted.reduce((acc, s) => {
    const key = s.difficulty!.toLowerCase();
    if (key in acc) acc[key]++;
    return acc;
  }, { easy: 0, medium: 0, hard: 0 });

  const lastActive = accepted.length > 0
    ? new Date(parseInt(accepted[0].timestamp) * 1000).toISOString()
    : new Date().toISOString();

  return {
    competitionSolves: accepted.length,
    easySinceCutoff: diffCounts.easy,
    mediumSinceCutoff: diffCounts.medium,
    hardSinceCutoff: diffCounts.hard,
    acceptanceRateSinceCutoff: totalSince ? (accepted.length / totalSince) * 100 : 0,
    lastActive,
  };
}

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    const cachedStats = await prisma.statsCache.findUnique({
      where: { username },
    });

    if (cachedStats) {
      const lastUpdated = new Date(cachedStats.updatedAt);
      if ((Date.now() - lastUpdated.getTime()) / 1000 < TEN_MINUTES_IN_SECONDS) {
        return NextResponse.json(cachedStats.data);
      }
    }

    const profile = await lc.user(username);

    if (!profile || !profile.matchedUser) {
        return NextResponse.json({ error: "User not found on LeetCode" }, { status: 404 });
    }
    
    const dbUser = await prisma.user.findUnique({ where: { username }});

    if (!dbUser) {
      return NextResponse.json({ error: "User not found in leaderboard database" }, { status: 404 });
    }

    const stats = await fetchCompetitionStats(username, profile);
    
    const fullUserObject: User = {
        ...stats,
        id: dbUser.id,
        username,
        ranking: 0, 
        joinedDate: dbUser.joinedDate.toISOString(),
        tagStats: {},
        recentProblems: [],
        streak: 0,
        maxStreak: 0,
        contestRating: profile.matchedUser.contestRating,
        favoriteTopics: [],
    };

    await prisma.statsCache.upsert({
      where: { username },
      update: { data: fullUserObject as any },
      create: { username, data: fullUserObject as any },
    });
    
    return NextResponse.json(fullUserObject);
  } catch (error) {
    console.error(`Error processing stats for ${username}:`, error);
    if (error instanceof Error && (error.message.includes('not found') || error.message.includes('404'))) {
        return NextResponse.json({ error: 'User not found on LeetCode' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
