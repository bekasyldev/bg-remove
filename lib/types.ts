// Type definitions for the application

export interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

export interface ProcessedImage {
  id: string;
  originalUrl: string;
  processedUrl: string | null;
  originalFile: File;
  status: 'processing' | 'completed' | 'error';
  error?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
