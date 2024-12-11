import { AccountType, Status } from '@prisma/client';

export interface MiddlewareFlowParams {
  isLoggedIn: boolean;
  role: AccountType;
  locale: string;
  token?: {
    role: AccountType;
    context?: {
      tenant?: {
        status?: Status;
      };
      store?: {
        id?: string;
      };
    };
  } | null;
}
