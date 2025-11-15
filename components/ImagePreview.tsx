'use client';

import { Download, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ProcessedImage } from '@/lib/types';

interface ImagePreviewProps {
  image: ProcessedImage;
  onDownload: () => void;
  onRemove: () => void;
}

export function ImagePreview({ image, onDownload, onRemove }: ImagePreviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <div className="grid grid-cols-2 gap-2 p-4">
          {/* Original Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={image.originalUrl}
              alt="Original"
              fill
              className="object-contain"
            />
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Оригинал
            </div>
          </div>

          {/* Processed Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {image.status === 'processing' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}
            {image.status === 'completed' && image.processedUrl && (
              <>
                <Image
                  src={image.processedUrl}
                  alt="Processed"
                  fill
                  className="object-contain"
                  style={{ backgroundColor: 'transparent' }}
                />
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Готово
                </div>
              </>
            )}
            {image.status === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                <div className="text-center p-4">
                  <p className="text-red-600 text-sm font-medium">Ошибка</p>
                  <p className="text-red-500 text-xs mt-1">{image.error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4 border-t">
          <button
            onClick={onDownload}
            disabled={image.status !== 'completed'}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Скачать</span>
          </button>
          
          <button
            onClick={onRemove}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            <span>Удалить</span>
          </button>
        </div>
      </div>
    </div>
  );
}
