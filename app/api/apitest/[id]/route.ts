// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/database/supabase-client';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase.from('test').select('*').eq('id', params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { name, color } = body;

  const { data, error } = await supabase
    .from('test')
    .update({ name, color })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('test').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Post deleted successfully' });
}
