import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/getProjects';

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json(projects);
}
