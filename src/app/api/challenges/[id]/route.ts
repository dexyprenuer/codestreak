import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
req: NextRequest,
{ params }: { params: Promise<{ id: string }> }
) {
const { userId: clerkId } = await auth();
if (!clerkId) {
return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
}

const { id } = await params;

try {
const user = await prisma.user.findUnique({ where: { clerkId } });
if (!user) {
return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
}

} catch (error) {
console.error('[PATCH /api/challenges/[id]]', error);
return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
}
}
