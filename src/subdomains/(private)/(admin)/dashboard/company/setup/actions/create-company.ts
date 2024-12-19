'use server';

import { db } from '@/shared/modules/infrastructure/database/prisma';
import { AppError } from '@/shared/modules/utils/errors';

import { getCompany } from './get-company';

export const createCompany = async (
  tenantId: string,
  name: string,
  document: string,
  description: string,
  categories: string[],
  address: string,
  phone: string,
  email: string,
  latitude: number,
  longitude: number,
  logoUrl: string
) => {
  try {
    const company = await getCompany(tenantId, document);

    if (company) {
      throw new AppError(
        'Company with this CNPJ already exists for the tenant. (TEMPERO-56CFD)',
        true
      );
    }

    console.log('LOGO URL: ', logoUrl);

    await db.company.create({
      data: {
        document,
        name,
        description,
        address,
        phone,
        email,
        latitude,
        longitude,
        logoUrl,
        tenant: {
          connect: { id: tenantId },
        },
        categories: {
          create: categories.map((categoryName) => ({ name: categoryName })),
        },
        productCount: 0,
        categoryCount: 0,
        customerCount: 0,
      },
    });

    return company;
  } catch (error) {
    throw error;
  }
};
