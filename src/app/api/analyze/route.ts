import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { analyzeCodeAction } from '@/server/actions/analyze.action';

export async function POST(req: NextRequest) {
const { userId } = await auth();
if (!userId) {
return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
}

const body = await req.json();
const { language, code } = body;

if (!language || !code) {
return NextResponse.json({ success: false, error: 'Missing language or code' }, { status: 400 });
}

try {
const result = await analyzeCodeAction(language, code);

} catch (error) {
console.error('[POST /api/analyze]', error);
return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
}
}
