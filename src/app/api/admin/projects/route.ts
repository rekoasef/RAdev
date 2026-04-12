import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase';
import { ProjectInput } from '@/types/project';

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value ?? '';
  return verifySessionToken(token);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body: ProjectInput = await req.json();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from('projects')
    .insert([body])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
