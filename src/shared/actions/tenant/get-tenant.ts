'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';

export const getUniqueTenant = async (tenantName: string) => {
  const uniqueName = tenantName
    .split(' ')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .toLocaleLowerCase();

  const result = await db.tenant.findFirst({
    where: {
      uniqueName: {
        equals: uniqueName,
        mode: 'insensitive',
      },
    },
  });

  return { result, uniqueName };
};

export const getTenantById = async (id: string) => {
  const result = await db.tenant.findFirst({
    where: {
      id,
    },
  });

  return { result };
};
