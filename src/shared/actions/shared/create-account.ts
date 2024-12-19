'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';
import { AppError } from '@/shared/modules/utils/errors';

import { getAccountByProviderId } from './get-account';

export const createAccount = async (
  userId: string,
  tenantId: string,
  email: string
) => {
  const account = await getAccountByProviderId(email);

  if (account) {
    throw new AppError('Account already exists. (TEMPERO-5DM62)', true);
  }

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
