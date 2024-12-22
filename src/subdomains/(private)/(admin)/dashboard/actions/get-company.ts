'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';
import { AppError } from '@/shared/modules/utils/errors';

export const getCompanyById = async (tenantId: string) => {
  if (!tenantId) {
    throw new AppError('Tenant ID is required. (TEMPERO-NM2JB)', true);
  }

  const company = await db.company.findFirst({
    where: {
      tenantId,
    },
  });

  return company;
};
