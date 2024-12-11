'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';

export const createAccount = async (
  userId: string,
  tenantId: string,
  email: string
) => {
  return await db.account.create({
    data: {
      userId,
      type: 'ADMIN',
      provider: 'credentials',
      providerAccountId: email,
      tenantId,
    },
  });
};
