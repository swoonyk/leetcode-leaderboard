import { PrismaClient } from './generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 