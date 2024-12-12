'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';

export const getApprovedTenantsCount = async () => {
  return await db.tenant.count({
    where: {
      status: {
        equals: 'APPROVED',
      },
    },
  });
};
