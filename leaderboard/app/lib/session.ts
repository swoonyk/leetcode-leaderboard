import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getSessionUser() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    return null;
  }

  const username = sessionToken.split('_')[1];

  if (!username) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  return user;
} 