'use server';

import bcrypts from 'bcryptjs';

import { HASH_ROUNDS } from '../constants/application.constants';

export async function encryptPassword(
  plainPassword: string,
  hashRounds: number
) {
  const hash = hashRounds ?? HASH_ROUNDS;
  return await bcrypts.hash(plainPassword, hash);
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypts.compare(plainPassword, hashedPassword);
}
