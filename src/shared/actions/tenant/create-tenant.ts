'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';
import { AppError } from '@/shared/modules/utils/errors';
import { generateRandomString } from '@/shared/modules/utils/generate-random-string';

import { getUniqueTenant } from './get-tenant';

export const createTenant = async (tenantName: string) => {
  const tenant = await getUniqueTenant(tenantName);

  if (tenant.result) {
    throw new AppError('Tenant already exists. (FSA-RJ6H9)', true);
  }

  const secret = generateRandomString({
    length: 32,
    alphanumeric: true,
    includeSpecial: true,
  });

  return await db.tenant.create({
    data: {
      name: tenantName,
      status: 'PENDING',
      deletedAt: null,
      uniqueName: tenant.uniqueName,
      secret,
    },
  });
};
