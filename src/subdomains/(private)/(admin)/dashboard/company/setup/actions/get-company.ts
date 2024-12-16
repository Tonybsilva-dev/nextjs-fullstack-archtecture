'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';
import { AppError } from '@/shared/modules/utils/errors';

export const getCompany = async (tenantId: string, document: string) => {
  if (!tenantId) {
    throw new AppError('Tenant ID is required. (FSA-JF7CV)', true);
  }

  const company = await db.company.findFirst({
    where: {
      document,
      tenantId,
    },
  });

  return company;
};
