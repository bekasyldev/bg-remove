import { useState } from 'react';
import { ProcessedImage } from '@/lib/types';
import { validateImage, createImagePreview, generateImageId } from '@/lib/utils/image-utils';

export function useImageProcessor() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImages = async (files: File[]) => {
    setIsProcessing(true);
    setError(null);
    
    for (const file of files) {
      // Validate image
      const validation = validateImage(file);
      if (!validation.isValid) {
        setError(validation.error || 'Invalid file');
        continue;
      }

      const imageId = generateImageId();
      const originalUrl = createImagePreview(file);
      
      // Add to state immediately with processing status
      const newImage: ProcessedImage = {
        id: imageId,
        originalUrl,
        processedUrl: null,
        originalFile: file,
        status: 'processing',
        error: null,
      };
      
      setImages(prev => [...prev, newImage]);

      try {
        // Send to server for processing (using server power, not client)
        const formData = new FormData();
        formData.append('image', file);


        const response = await fetch('/api/remove-background', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setImages(prev => prev.map(img => 
            img.id === imageId 
              ? { ...img, processedUrl: result.imageUrl, status: 'completed' }
              : img
          ));
        } else {
          throw new Error(result.error || 'Server processing failed');
        }
        
      } catch (error) {
        console.error('Server processing error:', error);
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { 
                ...img, 
                status: 'error', 
                error: error instanceof Error ? error.message : 'Server processing failed' 
              }
            : img
        ));
      }
    }

    setIsProcessing(false);
  };

  const removeImage = (imageId: string) => {
    setImages(prev => {
      return prev.filter(img => {
        if (img.id === imageId) {
          // Cleanup URLs
          if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
          if (img.processedUrl && img.processedUrl.startsWith('blob:')) {
            URL.revokeObjectURL(img.processedUrl);
          }
          return false;
        }
        return true;
      });
    });
  };

  const downloadProcessedImage = (image: ProcessedImage) => {
    if (image.processedUrl && image.originalFile) {
      // For blob URLs, fetch and download
      if (image.processedUrl.startsWith('blob:')) {
        fetch(image.processedUrl)
          .then(response => response.blob())
          .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `processed_${image.originalFile.name.replace(/\.[^/.]+$/, '')}.png`;
            link.click();
            URL.revokeObjectURL(link.href);
          })
          .catch(console.error);
      }
      // For base64 images
      else if (image.processedUrl.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = image.processedUrl;
        link.download = `processed_${image.originalFile.name.replace(/\.[^/.]+$/, '')}.png`;
        link.click();
      }
    }
  };

  const clearAll = () => {
    // Cleanup all URLs
    images.forEach(img => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
      if (img.processedUrl && img.processedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(img.processedUrl);
      }
    });
    setImages([]);
    setError(null);
  };

  return {
    images,
    isProcessing,
    error,
    processImages,
    removeImage,
    downloadProcessedImage,
    clearAll,
  };
}
