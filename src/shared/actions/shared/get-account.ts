'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';

export const getAccountByProviderId = async (email: string) => {
  return await db.account.findFirst({
    where: {
      providerAccountId: email,
    },
  });
};

export const getAccountByTenantId = async (tenantId: string) => {
  return await db.account.findFirst({
    where: {
      tenantId,
    },
  });
};
