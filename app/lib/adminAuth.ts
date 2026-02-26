import crypto from 'node:crypto';
import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'tcat_admin';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
    return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASS || 'change-me-in-production';
}

function sign(input: string) {
    return crypto.createHmac('sha256', getSessionSecret()).update(input).digest('base64url');
}

export function buildSessionCookie(username: string) {
    const exp = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString('base64url');
    const signature = sign(payload);
    const token = `${payload}.${signature}`;

    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    return `${ADMIN_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`;
}

export function clearSessionCookie() {
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    return `${ADMIN_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

function isValidToken(token: string | undefined) {
    if (!token) return false;
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;

    const expected = sign(payload);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

    try {
        const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
        if (typeof decoded.exp !== 'number') return false;
        return decoded.exp > Date.now();
    } catch {
        return false;
    }
}

export async function isAdminAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return isValidToken(token);
}
