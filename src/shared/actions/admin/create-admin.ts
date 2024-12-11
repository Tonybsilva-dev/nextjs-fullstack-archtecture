'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';
import { AppError } from '@/shared/modules/utils/errors';

import { getUniqueAdmin } from './get-admin';

export const createAdmin = async (
  adminName: string,
  adminEmail: string,
  hashedPassword: string,
  tenantId: string
) => {
  const admin = await getUniqueAdmin(adminEmail);

  if (admin) {
    throw new AppError('Admin already exists. (FSA-8UFB9)', true);
  }

  return await db.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      tenant: {
        connect: { id: tenantId },
      },
    },
  });
};
