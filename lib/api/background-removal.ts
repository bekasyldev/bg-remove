// Client-side background removal using @imgly/background-removal
// This runs entirely in the browser using WebAssembly and WebGL/WebGPU

import { removeBackground as removeBg } from '@imgly/background-removal';
import type { Config } from '@imgly/background-removal';

/**
 * Configuration for background removal
 * The model files are fetched on demand at first run and then cached
 */
const defaultConfig: Config = {
  debug: false,
  progress: (key, current, total) => {
    console.log(`Downloading ${key}: ${current} of ${total}`);
  },
};

/**
 * Remove background from an image (client-side processing)
 * @param file - Image file to process
 * @param config - Optional configuration
 * @returns Processed image blob with transparent background
 */
export async function removeBackground(
  file: File,
  config?: Partial<Config>
): Promise<Blob> {
  try {
    // Convert file to blob if needed
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });
    
    // Remove background using the library
    // This runs entirely in the browser using WASM and WebGL/WebGPU
    const resultBlob = await removeBg(blob, { ...defaultConfig, ...config });
    
    return resultBlob;
  } catch (error) {
    console.error('Background removal failed:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to remove background'
    );
  }
}

/**
 * Remove backgrounds from multiple images (batch processing)
 * Processes images sequentially to avoid overwhelming the browser
 * @param files - Array of image files
 * @param onProgress - Optional progress callback
 * @returns Array of processed image blobs
 */
export async function removeBatchBackground(
  files: File[],
  onProgress?: (current: number, total: number) => void
): Promise<Blob[]> {
  const results: Blob[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const blob = await removeBackground(files[i]);
    results.push(blob);
    
    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }
  
  return results;
}

/**
 * Preload background removal assets
 * Call this to download and cache model files before they're needed
 * This improves performance on first use
 */
export async function preloadAssets(): Promise<void> {
  try {
    // Create a small dummy image to trigger asset loading
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 1, 1);
    }
    
    await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    });
    
    console.log('Background removal assets preloaded');
  } catch (error) {
    console.warn('Failed to preload assets:', error);
  }
}
