// ✅ src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// ⏳ Use globalThis trick for Next.js hot reload
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
