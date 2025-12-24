import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { birthdaySchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = birthdaySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { dateOfBirth } = validation.data;

    const profile = await prisma.userProfile.upsert({
      where: { userId: user.userId },
      update: {
        dateOfBirth: new Date(dateOfBirth),
        updatedAt: new Date(),
      },
      create: {
        userId: user.userId,
        dateOfBirth: new Date(dateOfBirth),
      },
    });

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Error updating birthday:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
