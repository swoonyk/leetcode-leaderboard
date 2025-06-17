import { cookies } from 'next/headers';
import { prisma } from './prisma';

export async function getSessionUser() {
  const cookieStore = cookies();
  const username = cookieStore.get('username')?.value;

  if (!username) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  return user;
} 