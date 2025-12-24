import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { promptsSchema } from '@/lib/validations';

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = promptsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { prompts } = validation.data;

    // Delete existing prompts
    await prisma.userPrompt.deleteMany({
      where: { userId: user.userId },
    });

    // Create new prompts
    const userPrompts = await Promise.all(
      prompts.map((prompt) =>
        prisma.userPrompt.create({
          data: {
            userId: user.userId,
            promptId: prompt.promptId,
            answer: prompt.answer,
            displayOrder: prompt.displayOrder,
          },
          include: {
            prompt: true,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      data: userPrompts,
    });
  } catch (error) {
    console.error('Error updating prompts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get available prompts
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prompts = await prisma.prompt.findMany();

    return NextResponse.json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
