import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { lifestyleSchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = lifestyleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { drinking, smoking, exercise, pets, dietaryPreference } = validation.data;

    const lifestyle = await prisma.userLifestyle.upsert({
      where: { userId: user.userId },
      update: {
        drinking,
        smoking,
        exercise,
        pets,
        dietaryPreference,
      },
      create: {
        userId: user.userId,
        drinking,
        smoking,
        exercise,
        pets,
        dietaryPreference,
      },
    });

    return NextResponse.json({
      success: true,
      data: lifestyle,
    });
  } catch (error) {
    console.error('Error updating lifestyle:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
