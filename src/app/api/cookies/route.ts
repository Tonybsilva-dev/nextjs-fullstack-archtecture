import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE');
  const session_token = cookieStore.get('next-auth.session-token');
  const refresh_token = cookieStore.get('next-auth.csrf-token');

  return new Response(
    JSON.stringify({
      locale: locale?.value,
      sessionToken: session_token?.value,
      refreshToken: refresh_token?.value,
    }),
    {
      status: 200,
    }
  );
}
