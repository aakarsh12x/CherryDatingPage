import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { nameSchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = nameSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { firstName } = validation.data;

    // Create or update profile
    const profile = await prisma.userProfile.upsert({
      where: { userId: user.userId },
      update: {
        firstName,
        updatedAt: new Date(),
      },
      create: {
        userId: user.userId,
        firstName,
      },
    });

    // Calculate completion percentage
    const completionPercentage = calculateProfileCompletion(profile);
    await prisma.userProfile.update({
      where: { id: profile.id },
      data: { profileCompletionPercentage: completionPercentage },
    });

    return NextResponse.json({
      success: true,
      data: profile,
      completionPercentage,
    });
  } catch (error) {
    console.error('Error updating name:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateProfileCompletion(profile: any): number {
  let completed = 0;
  const fields = [
    'firstName',
    'dateOfBirth',
    'gender',
    'interestedIn',
    'height',
    'city',
    'occupation',
    'bio',
    'relationshipGoal',
  ];

  fields.forEach((field) => {
    if (profile[field]) completed++;
  });

  return Math.round((completed / fields.length) * 100);
}
