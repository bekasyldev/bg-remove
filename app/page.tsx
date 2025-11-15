'use client';

import { Image as ImageIcon, Zap, Download, Sparkles, Menu, X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { ImageUploader } from '@/components/ImageUploader';
import { ImagePreview } from '@/components/ImagePreview';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    uploadedImages,
    processedImages,
    status,
    error,
    handleFileUpload,
    processAllImages,
    downloadImage,
    removeImage,
    clearAll
  } = useImageProcessor();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <nav className="max-w-7xl w-full flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-slate-900">BG Remove</span>
            </div>
            
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="hidden sm:block px-4 py-2 text-sm text-slate-700 hover:text-slate-900 transition-colors">
                Загрузить изображения
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <a 
                href="#business" 
                className="block py-2 text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Для Бизнеса
              </a>
              <a 
                href="#guide" 
                className="block py-2 text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Инструкция
              </a>
              <a 
                href="#pricing" 
                className="block py-2 text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Тарифы
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Удалите фон с изображения
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Высококачественное удаление фона. Мгновенно создавайте 
            прозрачный фон или заменяйте его на любой другой
          </p>
        </div>

        {/* Upload Area */}
        <div className="max-w-3xl mx-auto mb-16">
          <ImageUploader 
            onFilesSelected={handleFileUpload}
            disabled={status === 'processing'}
          />
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm whitespace-pre-line">{error}</p>
            </div>
          )}
          
          {/* Action Buttons */}
          {uploadedImages.length > 0 && (
            <div className="mt-6 flex items-center justify-center space-x-4">
              <button
                onClick={processAllImages}
                disabled={status === 'processing'}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center space-x-2"
              >
                {status === 'processing' && <Loader2 className="w-5 h-5 animate-spin" />}
                <span>
                  {status === 'processing' ? 'Обработка...' : `Обработать (${uploadedImages.length})`}
                </span>
              </button>
              
              <button
                onClick={clearAll}
                disabled={status === 'processing'}
                className="text-gray-600 hover:text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Очистить всё
              </button>
            </div>
          )}
        </div>
        
        {/* Processed Images Grid */}
        {processedImages.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Результаты обработки
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedImages.map((image) => (
                <ImagePreview
                  key={image.id}
                  image={image}
                  onDownload={() => downloadImage(image)}
                  onRemove={() => removeImage(image.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Мгновенная обработка
            </h3>
            <p className="text-gray-600">
              ИИ обрабатывает ваши изображения за секунды с невероятной точностью
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <ImageIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Высокое качество
            </h3>
            <p className="text-gray-600">
              Профессиональные результаты с сохранением всех деталей и краев
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Простое скачивание
            </h3>
            <p className="text-gray-600">
              Скачивайте в PNG с прозрачным фоном или в любом другом формате
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-bold">Для чего использовать?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg mb-2">📸 Портреты и селфи</h3>
              <p className="text-blue-100">
                Создавайте профессиональные фото для резюме и социальных сетей
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🛍️ Товары для e-commerce</h3>
              <p className="text-blue-100">
                Идеальный белый фон для ваших товаров в интернет-магазине
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🎨 Дизайн и графика</h3>
              <p className="text-blue-100">
                Прозрачный фон для логотипов, презентаций и графических проектов
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🚗 Объявления и листинги</h3>
              <p className="text-blue-100">
                Профессиональные фото автомобилей и недвижимости
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Готовы начать?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Присоединяйтесь к миллионам пользователей, которые уже создают 
            профессиональные изображения с нашим инструментом
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl">
            Попробовать бесплатно
          </button>
        </div>
      </div>
    </main>
  );
}