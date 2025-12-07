import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
      hasDirectUrl: !!process.env.POSTGRES_URL_NON_POOLING,
      supabaseUrlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      prismaUrlPrefix: process.env.POSTGRES_PRISMA_URL?.substring(0, 30) + '...',
    },
    timestamp: new Date().toISOString(),
  });
}
