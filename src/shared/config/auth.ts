import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { signInZodSchema } from '@/subdomains/(public)/sign-in/validations/sign-in.validation';

import { db } from '../modules/infrastructure/database/prisma';
import { verifyPassword } from '../modules/utils/crypto';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signOut: '/',
  },
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
        // Valida as credenciais usando o Zod
        const parsedCredentials = signInZodSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error('Error user credentials validation');
        }

        // Busca o usuário com Tenant e AccountType
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

        if (!passwordRecord) throw new Error('Credenciais inválidas');

        const isValidPassword = await verifyPassword(
          parsedCredentials.data.password,
          passwordRecord.password as string
        );

        if (!isValidPassword) throw new Error('Credenciais inválidas');

        const role = user.accounts[0]?.type || 'CUSTOMER';
        const tenantId = user.tenant?.id || undefined;

        return { ...user, role, context: { tenantId } };
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
        const tenantId = user.context?.tenantId || undefined;
        token.context = { tenantId, storeId: undefined }; // storeId inicialmente undefined

        // O storeId será preenchido após criação da loja
      } else {
        // Requisições subsequentes: buscar dados se necessário
        if (!token.role || !token.context?.tenantId) {
          const userFromDb = await db.user.findUnique({
            where: { id: token.id },
            include: {
              tenant: true, // Agora válido devido ao relacionamento no modelo
              accounts: { select: { type: true } },
            },
          });

          token.role = userFromDb?.accounts[0]?.type || 'CUSTOMER';

          const tenantId = userFromDb?.tenant?.id || undefined;
          token.context = { tenantId, storeId: undefined };
        }

        // Para OWNER, verificar loja associada ao tenantId
        if (
          token.role === 'OWNER' &&
          token.context.tenantId &&
          !token.context.storeId
        ) {
          const store = await db.store.findFirst({
            where: { tenantId: token.context.tenantId },
            select: { id: true },
          });

          token.context.storeId = store?.id || undefined;
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
