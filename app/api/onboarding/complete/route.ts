import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify profile has minimum required fields
    const profile = await prisma.userProfile.findUnique({
      where: { userId: user.userId },
      include: {
        user: {
          include: {
            photos: true,
            interests: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Check minimum requirements
    const requiredFields = [
      profile.firstName,
      profile.dateOfBirth,
      profile.gender,
      profile.interestedIn,
      profile.user.photos.length > 0,
    ];

    const hasRequiredFields = requiredFields.every(Boolean);

    if (!hasRequiredFields) {
      return NextResponse.json(
        { error: 'Please complete all required fields before finishing onboarding' },
        { status: 400 }
      );
    }

    // Mark onboarding as completed
    const updatedProfile = await prisma.userProfile.update({
      where: { id: profile.id },
      data: {
        onboardingCompleted: true,
        profileCompletionPercentage: 100,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      data: updatedProfile,
    });
  } catch (error) {
    console.error('Error completing onboarding:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
