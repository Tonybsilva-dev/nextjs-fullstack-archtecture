import 'next-auth';
import 'next-auth/jwt';

import { AccountType, Status } from '@prisma/client';

type Role = AccountType;
type TenantStatus = Status;
type TenantContext = Role extends 'ADMIN'
  ? {
      tenant: {
        id: string;
        name: string;
        status: TenantStatus;
      };
      company: {
        id?: string;
      } | null;
    }
  : {
      tenant?: {
        id?: string;
        name?: string;
        status?: TenantStatus;
      };
      company: {
        id?: string;
      } | null;
    };

declare module 'next-auth' {
  interface User {
    id: string;
    role: Role;
    context: TenantContext;
  }
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    context: TenantContext;
  }
}
