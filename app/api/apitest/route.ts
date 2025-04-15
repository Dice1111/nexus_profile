// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/database/supabase-client';

// GET: fetch all 
export async function GET() {
  const { data, error } = await supabase.from('test').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: create a new 
export async function POST(req: Request) {
  const body = await req.json();
  const { name, color } = body;

  const { data, error } = await supabase.from('test').insert({ name,color }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
