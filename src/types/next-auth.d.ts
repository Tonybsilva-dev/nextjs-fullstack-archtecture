import 'next-auth';
import 'next-auth/jwt';

import { AccountType } from '@prisma/client';

type Role = AccountType;
type TenantContext = Role extends 'OWNER'
  ? { tenantId: string; storeId?: string }
  : { tenantId?: string; storeId?: string };

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
