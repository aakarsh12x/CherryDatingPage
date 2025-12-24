import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { photosSchema } from '@/lib/validations';

// Upload a new photo
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = photosSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { photoUrl, photoOrder, isPrimary } = validation.data;

    // Check if user already has 9 photos (max limit)
    const existingPhotos = await prisma.userPhoto.count({
      where: { userId: user.userId },
    });

    if (existingPhotos >= 9) {
      return NextResponse.json(
        { error: 'Maximum 9 photos allowed' },
        { status: 400 }
      );
    }

    // If this is set as primary, unset other primary photos
    if (isPrimary) {
      await prisma.userPhoto.updateMany({
        where: { userId: user.userId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    const photo = await prisma.userPhoto.create({
      data: {
        userId: user.userId,
        photoUrl,
        photoOrder,
        isPrimary: isPrimary || false,
      },
    });

    return NextResponse.json({
      success: true,
      data: photo,
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all photos
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const photos = await prisma.userPhoto.findMany({
      where: { userId: user.userId },
      orderBy: { photoOrder: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: photos,
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete a photo
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const user = getUserFromRequest(authHeader);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const photoId = searchParams.get('photoId');

    if (!photoId) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }

    // Verify the photo belongs to the user
    const photo = await prisma.userPhoto.findFirst({
      where: { id: photoId, userId: user.userId },
    });

    if (!photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    await prisma.userPhoto.delete({
      where: { id: photoId },
    });

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
