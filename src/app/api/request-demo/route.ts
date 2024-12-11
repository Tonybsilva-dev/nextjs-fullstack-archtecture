import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

import { createAdmin } from '@/shared/actions/admin/create-admin';
import { createAccount } from '@/shared/actions/shared/create-account';
import { createTenant } from '@/shared/actions/tenant/create-tenant';
import { HASH_ROUNDS } from '@/shared/modules/constants/application.constants';
import { AppError } from '@/shared/modules/utils/errors';
import { FormatEmailProvider } from '@/shared/modules/utils/format-email-provider';
import { generateRandomString } from '@/shared/modules/utils/generate-random-string';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { tenantName, adminName, adminEmail } = body;
    if (!tenantName || !adminName || !adminEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Criar o Tenant
    const tenant = await createTenant(tenantName);

    // 2. Gerar senha aleatória e hash
    const password = generateRandomString({
      length: 6,
      numeric: true,
    });

    const hashedPassword = await hash(password, HASH_ROUNDS);

    const { formattedEmailProvider } = FormatEmailProvider(tenantName);

    // 3. Criar o Usuário
    const user = await createAdmin(
      adminName,
      formattedEmailProvider,
      hashedPassword,
      tenant.id
    );

    // 4. Criar a Conta
    await createAccount(user.id, tenant.id, adminEmail ?? '');

    // 5. Retornar os dados para o cliente
    return NextResponse.json({
      message: 'Tenant and Admin created successfully',
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    console.error('Error creating tenant or user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
