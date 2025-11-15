'use client';

import { useRef, useState, DragEvent } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function ImageUploader({ onFilesSelected, disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    onFilesSelected(fileArray);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        bg-white rounded-2xl shadow-xl p-8 border-2 border-dashed 
        transition-all cursor-pointer
        ${isDragging ? 'border-blue-600 bg-blue-50' : 'border-blue-300 hover:border-blue-500'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />
      
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <Upload className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {isDragging ? 'Отпустите файлы здесь' : 'Загрузите изображение'}
        </h2>
        <p className="text-gray-600 mb-6">
          или перетащите файл сюда
        </p>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
          disabled={disabled}
        >
          Выбрать изображение
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Поддерживаются форматы: JPG, PNG, WebP (макс. 10MB)
        </p>
      </div>
    </div>
  );
}
