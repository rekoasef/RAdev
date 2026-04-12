import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, verifySessionToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const token = createSessionToken();

  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 días
    secure: process.env.NODE_ENV === 'production',
  });

  return res;
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value ?? '';

  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.delete('admin_session');
  return res;
}
