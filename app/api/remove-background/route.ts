import { NextRequest, NextResponse } from 'next/server';
import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
  let tempInputPath: string | null = null;
  
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are supported.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      );
    }

    console.log('Processing image on server:', file.name, 'Size:', file.size);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    // Save to temporary file
    tempInputPath = join(tmpdir(), `input-${Date.now()}.png`);
    
    // Convert image to PNG format using Sharp
    console.log('Converting image to compatible PNG format...');
    const pngBuffer = await sharp(inputBuffer)
      .png()
      .toBuffer();
    
    await writeFile(tempInputPath, pngBuffer);
    console.log('Image converted and saved, now removing background...');

    // Remove background using file path
    const blob = await removeBackground(tempInputPath);

    // Convert Blob to buffer
    const resultBuffer = Buffer.from(await blob.arrayBuffer());

    // Generate data URL
    const dataURL = `data:image/png;base64,${resultBuffer.toString('base64')}`;

    console.log('Background removed successfully on server, result size:', resultBuffer.length);

    // Clean up temp file
    if (tempInputPath) {
      await unlink(tempInputPath).catch(console.error);
    }

    // Return the processed image as data URL
    return NextResponse.json({
      success: true,
      imageUrl: dataURL,
      originalName: file.name,
      size: resultBuffer.length
    });
  } catch (error) {
    console.error('Server-side background removal error:', error);
    
    // Clean up temp file on error
    if (tempInputPath) {
      await unlink(tempInputPath).catch(console.error);
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to process image on server',
        details: error instanceof Error ? error.message : 'Unknown server error'
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
