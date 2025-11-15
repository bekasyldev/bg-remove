import { NextRequest, NextResponse } from 'next/server';
import { removeBackground } from '@imgly/background-removal';

// Set runtime to nodejs for server-side processing
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds timeout

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(image.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are supported.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (image.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      );
    }

    console.log('Processing image:', image.name, 'Size:', image.size);

    const arrayBuffer = await image.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: image.type });

    const resultBlob = await removeBackground(blob);

    const resultArrayBuffer = await resultBlob.arrayBuffer();
    const resultBuffer = Buffer.from(resultArrayBuffer);

    console.log('Background removed successfully');

    return new NextResponse(resultBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="removed-bg-${Date.now()}.png"`,
      },
    });
  } catch (error) {
    console.error('Background removal error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process image' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Background removal API endpoint' },
    { status: 200 }
  );
}
