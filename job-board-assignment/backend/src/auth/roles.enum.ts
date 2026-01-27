import { Role as PrismaRole } from '@prisma/client';

// Re-export Prisma Role enum so we use a single source of truth
export const Role = PrismaRole;
export type Role = PrismaRole;


