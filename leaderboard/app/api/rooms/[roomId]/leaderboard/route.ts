import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getSessionUser } from '@/lib/session';
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

const getStatsForUser = async (dbUser: { id: string, username: string, joinedDate: Date }): Promise<User | null> => {
    const { username, id, joinedDate } = dbUser;
    const cachedStats = await prisma.statsCache.findUnique({ where: { username } });

    if (cachedStats) {
        const lastUpdated = new Date(cachedStats.updatedAt);
        if ((Date.now() - lastUpdated.getTime()) / 1000 < TEN_MINUTES_IN_SECONDS) {
            return cachedStats.data as User;
        }
    }

    try {
        const profile = await lc.user(username);

        if (!profile || !profile.matchedUser) {
           return null;
        }

        const stats = await fetchCompetitionStats(username, profile);
        
        const fullUserObject: User = {
            ...stats,
            id,
            username,
            ranking: 0, 
            joinedDate: joinedDate.toISOString(),
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
        return fullUserObject;
    } catch (error) {
        console.error(`Failed to fetch stats for ${username}:`, error);
        return null;
    }
}

const schema = z.object({
  ranking: z.enum(['competition', 'accuracy']).default('competition'),
});

export async function GET(request: NextRequest, { params }: { params: { roomId: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { roomId } = params;

    const membership = await prisma.membership.findFirst({
        where: { userId: user.id, roomId: roomId },
    });

    if (!membership) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const queryParams = schema.safeParse({
      ranking: searchParams.get('ranking') || 'competition',
    });

    if (!queryParams.success) {
      return NextResponse.json(queryParams.error, { status: 400 });
    }

    const { ranking } = queryParams.data;
    
    const roomMembers = await prisma.membership.findMany({
        where: { roomId },
        include: { user: true }
    });
    
    await getProblemDifficulties();

    const allUserStatsPromises = roomMembers.map(member => getStatsForUser(member.user));
    const allUserStats = (await Promise.all(allUserStatsPromises)).filter((u): u is User => u !== null);

    let sortedStats = [...allUserStats];

    if (ranking === 'competition') {
        sortedStats.sort((a, b) => b.competitionSolves - a.competitionSolves);
    } else if (ranking === 'accuracy') {
        sortedStats.sort((a, b) => b.acceptanceRateSinceCutoff - a.acceptanceRateSinceCutoff);
    }

    const finalLeaderboard = sortedStats.map((user, index) => ({
        ...user,
        ranking: index + 1,
    }));

    return NextResponse.json(finalLeaderboard);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 