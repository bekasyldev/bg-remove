import { NextRequest, NextResponse } from 'next/server';
import { removeBackground } from '@imgly/background-removal-node';
import { createHash } from 'crypto';

const processedCache = new Map<string, { dataURL: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; 

function generateHash(buffer: Buffer): string {
  return createHash('md5').update(buffer).digest('hex');
}

function cleanCache() {
  const now = Date.now();
  for (const [key, value] of processedCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      processedCache.delete(key);
    }
  }
}

export async function POST(request: NextRequest) {
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

    console.log('🚀 Processing image on server:', file.name, 'Size:', file.size);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    // Check cache
    const hash = generateHash(inputBuffer);
    const cached = processedCache.get(hash);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        imageUrl: cached.dataURL,
        originalName: file.name,
        size: cached.dataURL.length,
        cached: true
      });
    }

    cleanCache();

    const processingStart = Date.now();

    // Convert Buffer to Blob (library accepts Blob, not Buffer)
    const inputBlob = new Blob([inputBuffer], { type: file.type });
    
    const blob = await removeBackground(inputBlob, {
      model: 'small',
      output: {
        format: 'image/png',
        quality: 0.9
      }
    });

    const processingTime = Date.now() - processingStart;

    // Convert Blob to buffer
    const resultBuffer = Buffer.from(await blob.arrayBuffer());

    // Generate data URL
    const dataURL = `data:image/png;base64,${resultBuffer.toString('base64')}`;

    // Cache the result
    processedCache.set(hash, { dataURL, timestamp: Date.now() });

    console.log('✅ Background removed successfully in', processingTime, 'ms, result size:', resultBuffer.length);

    return NextResponse.json({
      success: true,
      imageUrl: dataURL,
      originalName: file.name,
      size: resultBuffer.length,
      processingTime,
      cached: false
    });
  } catch (error) {
    console.error('❌ Server-side background removal error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process image on server',
        details: error instanceof Error ? error.message : 'Unknown server error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    cacheSize: processedCache.size,
    model: 'medium',
    features: [
      'Server-side processing with ONNX Runtime',
      'Automatic CPU threading optimization',
      'Result caching with 5min TTL',
      'Direct Buffer processing (no file I/O)'
    ]
  });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
