import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId: user.userId },
      include: {
        user: {
          include: {
            photos: true,
            interests: {
              include: {
                interest: true,
              },
            },
            prompts: {
              include: {
                prompt: true,
              },
            },
            lifestyle: true,
          },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({
        success: true,
        data: {
          completed: false,
          completionPercentage: 0,
          profile: null,
        },
      });
    }

    // Check which steps are completed
    const steps = {
      name: !!profile.firstName,
      birthday: !!profile.dateOfBirth,
      gender: !!profile.gender,
      interestedIn: !!profile.interestedIn,
      height: !!profile.height,
      location: !!profile.city,
      photos: profile.user.photos.length > 0,
      interests: profile.user.interests.length > 0,
      workEducation: !!(profile.occupation || profile.education),
      prompts: profile.user.prompts.length > 0,
      bio: !!profile.bio,
      lifestyle: !!profile.user.lifestyle,
      relationshipGoal: !!profile.relationshipGoal,
    };

    const completedSteps = Object.values(steps).filter(Boolean).length;
    const totalSteps = Object.keys(steps).length;
    const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

    return NextResponse.json({
      success: true,
      data: {
        completed: profile.onboardingCompleted,
        completionPercentage,
        steps,
        profile: {
          ...profile,
          interests: profile.user.interests.map((ui) => ui.interest.name),
          photos: profile.user.photos,
          prompts: profile.user.prompts,
          lifestyle: profile.user.lifestyle,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
