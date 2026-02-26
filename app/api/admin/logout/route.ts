import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/app/lib/adminAuth';

export async function POST() {
  const cookie = clearSessionCookie();
  return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } });
}
