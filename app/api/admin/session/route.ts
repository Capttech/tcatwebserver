import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export async function GET() {
    const isAuth = await isAdminAuthenticated();
    return NextResponse.json({ ok: true, isAuth });
}
