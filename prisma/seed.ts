import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding default users...');

  // Usuário CUSTOMER
  const customerEmail = 'customer@example.com';
  const customerPassword = await bcrypt.hash('password123', 10);

  const customer = await prisma.user.upsert({
    where: { email: customerEmail },
    update: {}, // Não altera se o usuário já existe
    create: {
      name: 'Customer Example',
      email: customerEmail,
      password: customerPassword,
      accounts: {
        create: {
          type: 'CUSTOMER',
          provider: 'credentials',
          providerAccountId: customerEmail,
        },
      },
    },
  });

  console.log('Customer user created or exists:', customer);

  // Usuário OWNER
  const ownerEmail = 'owner@example.com';
  const ownerPassword = await bcrypt.hash('password123', 10);

  const owner = await prisma.user.upsert({
    where: { email: ownerEmail },
    update: {}, // Não altera se o usuário já existe
    create: {
      name: 'Owner Example',
      email: ownerEmail,
      password: ownerPassword,
      accounts: {
        create: {
          type: 'OWNER',
          provider: 'credentials',
          providerAccountId: ownerEmail,
        },
      },
    },
  });

  console.log('Owner user created or exists:', owner);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });