import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE');
  const session_token = cookieStore.get('next-auth.session-token');
  const refresh_token = cookieStore.get('next-auth.csrf-token');
  const sub = cookieStore.get('sub');
  const tenant = cookieStore.get('tenant');

  if (!session_token || !refresh_token) {
    return new Response(
      JSON.stringify({
        error: 'Missing essential cookies. (TEMPERO-CU7U2)',
      }),
      {
        status: 400,
      }
    );
  }

  return new Response(
    JSON.stringify({
      locale: locale?.value,
      sessionToken: session_token?.value,
      refreshToken: refresh_token?.value,
      sub: sub?.value,
      tenant: tenant?.value,
    }),
    {
      status: 200,
    }
  );
}
