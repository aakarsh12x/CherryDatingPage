import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { interestsSchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = interestsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { interests } = validation.data;

    // Remove existing interests
    await prisma.userInterest.deleteMany({
      where: { userId: user.userId },
    });

    // Add interests to the Interest table if they don't exist, then link to user
    const interestRecords = await Promise.all(
      interests.map(async (interestName) => {
        // Find or create the interest
        const interest = await prisma.interest.upsert({
          where: { name: interestName },
          update: {},
          create: { name: interestName },
        });

        // Create the user-interest relationship
        return prisma.userInterest.create({
          data: {
            userId: user.userId,
            interestId: interest.id,
          },
        });
      })
    );

    return NextResponse.json({
      success: true,
      data: interestRecords,
    });
  } catch (error) {
    console.error('Error updating interests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get user's interests
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userInterests = await prisma.userInterest.findMany({
      where: { userId: user.userId },
      include: { interest: true },
    });

    const interests = userInterests.map((ui: any) => ui.interest.name);

    return NextResponse.json({
      success: true,
      data: interests,
    });
  } catch (error) {
    console.error('Error fetching interests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
