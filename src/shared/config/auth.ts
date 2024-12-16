import { PrismaAdapter } from '@auth/prisma-adapter';
import { cookies } from 'next/headers';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { z } from 'zod';

import { db } from '../modules/infrastructure/database/prisma';
import { verifyPassword } from '../modules/utils/crypto';

const signInZodSchema = z.object({
  email: z.string().email({ message: 'Email is required.' }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .max(12),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {},
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const cookieStore = cookies();

        // Valida as credenciais usando o Zod
        const parsedCredentials = signInZodSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error('Error user credentials validation');
        }

        const user = await db.user.findUnique({
          where: { email: parsedCredentials.data.email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            tenant: {
              select: {
                id: true,
                uniqueName: true,
              },
            },
            accounts: {
              select: { type: true },
            },
          },
        });

        if (!user) throw new Error('User not found');

        const passwordRecord = await db.user.findUnique({
          where: { email: parsedCredentials.data.email },
          select: { password: true },
        });

        if (!passwordRecord)
          throw new Error('Invalid credentials. (FSA-FAX5P)');

        const isValidPassword = await verifyPassword(
          parsedCredentials.data.password,
          passwordRecord.password as string
        );

        if (!isValidPassword)
          throw new Error('Invalid credentials. (FSA-FAX5P)');

        const role = user.accounts[0]?.type || 'CUSTOMER';
        const tenantId = user.tenant?.id || undefined;

        const company = tenantId
          ? await db.company.findFirst({
              where: { tenantId },
              select: { id: true },
            })
          : null;

        cookieStore.set('sub', user.id);
        return {
          ...user,
          role,
          context: {
            tenantId,
            company,
          },
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await db.user.findUnique({
          where: { email: user.email ?? undefined },
          include: { tenant: true },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name?.toUpperCase(),
              image: user.image,
              accounts: {
                create: {
                  type: 'CUSTOMER',
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Primeiro login: popula o token com informações do usuário
        token.id = user.id;
        token.role = user.role;

        // Inclui tenantId no contexto
        const tenant = user.context?.tenant || undefined;
        token.context = { tenant, company: { id: undefined } }; // companyId inicialmente undefined

        // O companyId será preenchido após criação da loja
      } else {
        // Requisições subsequentes: buscar dados se necessário
        if (!token.role || !token.context?.tenant?.id) {
          const userFromDb = await db.user.findUnique({
            where: { id: token.id },
            include: {
              tenant: true, // Agora válido devido ao relacionamento no modelo
              accounts: { select: { type: true } },
            },
          });

          token.role = userFromDb?.accounts[0]?.type || 'CUSTOMER';

          const tenantId = userFromDb?.tenant?.id || undefined;
          const tenantStatus = userFromDb?.tenant?.status || undefined;
          token.context = {
            tenant: { id: tenantId, status: tenantStatus },
            company: { id: undefined },
          };
        }

        // Para ADMIN, verificar loja associada ao tenantId
        if (
          token.role === 'ADMIN' &&
          token.context.tenant?.id &&
          (!token.context.company || !token.context.company.id)
        ) {
          const company = await db.company.findFirst({
            where: { tenantId: token.context.tenant.id },
            select: { id: true },
          });

          token.context.company = {
            id: company?.id,
          };
        }
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.context = token.context;
      }
      return session;
    },
  },
};
