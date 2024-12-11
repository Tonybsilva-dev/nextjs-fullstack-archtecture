'use server';

import { hash } from 'bcryptjs';

import { HASH_ROUNDS } from '@/shared/modules/constants/application.constants';
import { db } from '@/shared/modules/infrastructure/database/prisma';
import { AppError } from '@/shared/modules/utils/errors';

import { getUniqueTenant } from './get-tenant';

export const createTenant = async (tenantName: string) => {
  const tenant = await getUniqueTenant(tenantName);

  if (tenant.result) {
    throw new AppError('Tenant already exists. (FSA-RJ6H9)', true);
  }

  const secret = await hash(tenant.uniqueName, HASH_ROUNDS);

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
