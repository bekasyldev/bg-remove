// Custom hook for image processing logic

import { useState, useCallback } from 'react';
import { removeBackground } from '@/lib/api/background-removal';
import { 
  isValidImageFile, 
  isValidImageSize, 
  createImagePreview,
  downloadBlob,
  generateId 
} from '@/lib/utils/image-utils';
import { UploadedImage, ProcessedImage, ProcessingStatus } from '@/lib/types';

export function useImageProcessor() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  /**
   * Validate and upload image files
   */
  const handleFileUpload = useCallback((files: File[]) => {
    setError(null);
    const validFiles: UploadedImage[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      if (!isValidImageFile(file)) {
        errors.push(`${file.name}: Неподдерживаемый формат файла`);
        return;
      }

      if (!isValidImageSize(file)) {
        errors.push(`${file.name}: Размер файла превышает 10MB`);
        return;
      }

      validFiles.push({
        file,
        preview: createImagePreview(file),
        id: generateId(),
      });
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      setUploadedImages((prev) => [...prev, ...validFiles]);
    }

    return validFiles;
  }, []);

  /**
   * Process a single image
   */
  const processImage = useCallback(async (uploadedImage: UploadedImage) => {
    setStatus('processing');
    setError(null);

    const processedImage: ProcessedImage = {
      id: uploadedImage.id,
      originalUrl: uploadedImage.preview,
      processedUrl: '',
      status: 'processing',
    };

    setProcessedImages((prev) => [...prev, processedImage]);

    try {
      const resultBlob = await removeBackground(uploadedImage.file);
      const processedUrl = URL.createObjectURL(resultBlob);

      setProcessedImages((prev) =>
        prev.map((img) =>
          img.id === uploadedImage.id
            ? { ...img, processedUrl, status: 'completed' }
            : img
        )
      );

      setStatus('completed');
      return { success: true, blob: resultBlob, url: processedUrl };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка обработки изображения';
      
      setProcessedImages((prev) =>
        prev.map((img) =>
          img.id === uploadedImage.id
            ? { ...img, status: 'error', error: errorMessage }
            : img
        )
      );

      setStatus('error');
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Process all uploaded images
   */
  const processAllImages = useCallback(async () => {
    if (uploadedImages.length === 0) {
      setError('Нет изображений для обработки');
      return;
    }

    setStatus('processing');
    setError(null);

    const results = await Promise.allSettled(
      uploadedImages.map((img) => processImage(img))
    );

    const hasErrors = results.some((result) => result.status === 'rejected');
    setStatus(hasErrors ? 'error' : 'completed');
  }, [uploadedImages, processImage]);

  /**
   * Download processed image
   */
  const downloadImage = useCallback(async (processedImage: ProcessedImage) => {
    if (processedImage.status !== 'completed' || !processedImage.processedUrl) {
      setError('Изображение еще не обработано');
      return;
    }

    try {
      const response = await fetch(processedImage.processedUrl);
      const blob = await response.blob();
      downloadBlob(blob, `removed-bg-${processedImage.id}.png`);
    } catch (err) {
      setError('Ошибка при скачивании изображения');
    }
  }, []);

  /**
   * Clear all images
   */
  const clearAll = useCallback(() => {
    // Revoke object URLs to free memory
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    processedImages.forEach((img) => {
      if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
    });

    setUploadedImages([]);
    setProcessedImages([]);
    setStatus('idle');
    setError(null);
  }, [uploadedImages, processedImages]);

  /**
   * Remove specific image
   */
  const removeImage = useCallback((imageId: string) => {
    setUploadedImages((prev) => {
      const img = prev.find((i) => i.id === imageId);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== imageId);
    });

    setProcessedImages((prev) => {
      const img = prev.find((i) => i.id === imageId);
      if (img?.processedUrl) URL.revokeObjectURL(img.processedUrl);
      return prev.filter((i) => i.id !== imageId);
    });
  }, []);

  return {
    uploadedImages,
    processedImages,
    status,
    error,
    handleFileUpload,
    processImage,
    processAllImages,
    downloadImage,
    clearAll,
    removeImage,
  };
}
