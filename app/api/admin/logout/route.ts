import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = `tcat_admin=; Path=/; HttpOnly; Max-Age=0`;
  return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } });
}
