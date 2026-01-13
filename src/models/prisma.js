import { PrismaClient } from "@prisma/client";

// Singleton Prisma client
let prisma;

if (!global.prisma) {
  prisma = new PrismaClient();
  global.prisma = prisma;
} else {
  prisma = global.prisma;
}

export { prisma };
