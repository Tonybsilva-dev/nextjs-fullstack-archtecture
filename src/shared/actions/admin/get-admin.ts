import { db } from '@/shared/modules/infrastructure/database/prisma';

export const getUniqueAdmin = async (adminEmail: string) => {
  return await db.user.findUnique({
    where: {
      email: adminEmail,
    },
  });
};
