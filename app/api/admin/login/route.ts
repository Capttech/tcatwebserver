import { NextResponse } from 'next/server';
import { buildSessionCookie } from '@/app/lib/adminAuth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
      const cookie = buildSessionCookie(username);
      return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } });
    }

    return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
}
