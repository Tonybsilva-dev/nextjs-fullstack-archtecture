import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { AppError } from '@/shared/modules/utils/errors';
import { createCompany } from '@/subdomains/(private)/(admin)/dashboard/company/setup/actions/create-company';

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const tenant = token?.context.tenant;
  const tenantId = tenant?.id;

  try {
    const body = await req.json();

    const {
      name,
      document,
      description,
      categories,
      address,
      phone,
      email,
      latitude,
      longitude,
      logoUrl,
    } = body;

    // Validar os dados aqui ou garantir que a action `createStore` valide
    if (!tenantId || !name || !document || categories.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Chamada da action para criar a loja
    await createCompany(
      tenantId,
      name,
      document,
      description,
      categories,
      address,
      phone,
      email,
      latitude,
      longitude,
      logoUrl
    );
    return NextResponse.json({
      message: 'Company created successfully',
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
