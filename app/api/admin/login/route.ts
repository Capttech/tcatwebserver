import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
      // Set cookie via Set-Cookie header for compatibility with runtimes
      const cookie = `tcat_admin=1; Path=/; HttpOnly; Max-Age=${60 * 60}`;
      return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } });
    }

    return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
}
