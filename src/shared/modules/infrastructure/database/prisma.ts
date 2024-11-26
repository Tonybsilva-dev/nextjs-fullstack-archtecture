import { PrismaClient } from '@prisma/client';

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ['query'],
    });

    global.cachedPrisma.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();

      console.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`
      );

      return result;
    });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
