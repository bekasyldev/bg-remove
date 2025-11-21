import { WPPage } from './wordpress';
import { WPHomepageACF, HomepageContent } from './types/wordpress';

/**
 * Transform WordPress ACF data to typed HomepageContent
 */
export function transformHomepageData(wpPage: WPPage | null): HomepageContent {
  const acf = (wpPage?.acf as WPHomepageACF) || {};
  
  return {
    hero: {
      title: acf.hero_title || 'Удалите фон с изображения',
      description: acf.hero_description || 
        'Высококачественное удаление фона. Мгновенно создавайте прозрачный фон или заменяйте его на любой другой',
      buttonText: acf.hero_button_text || 'Загрузить изображения'
    },
    features: [
      {
        icon: acf.feature_1_icon || 'zap',
        title: acf.feature_1_title || 'Мгновенная обработка',
        description: acf.feature_1_description || 
          'ИИ обрабатывает ваши изображения за секунды с невероятной точностью'
      },
      {
        icon: acf.feature_2_icon || 'image',
        title: acf.feature_2_title || 'Высокое качество',
        description: acf.feature_2_description || 
          'Профессиональные результаты с сохранением всех деталей и краев'
      },
      {
        icon: acf.feature_3_icon || 'download',
        title: acf.feature_3_title || 'Простое скачивание',
        description: acf.feature_3_description || 
          'Скачивайте в PNG с прозрачным фоном или в любом другом формате'
      }
    ],
    useCases: [
      {
        emoji: acf.usecase_1_emoji || '📸',
        title: acf.usecase_1_title || 'Портреты и селфи',
        description: acf.usecase_1_description || 
          'Создавайте профессиональные фото для резюме и социальных сетей'
      },
      {
        emoji: acf.usecase_2_emoji || '🛍️',
        title: acf.usecase_2_title || 'Товары для e-commerce',
        description: acf.usecase_2_description || 
          'Идеальный белый фон для ваших товаров в интернет-магазине'
      },
      {
        emoji: acf.usecase_3_emoji || '🎨',
        title: acf.usecase_3_title || 'Дизайн и графика',
        description: acf.usecase_3_description || 
          'Прозрачный фон для логотипов, презентаций и графических проектов'
      },
      {
        emoji: acf.usecase_4_emoji || '🚗',
        title: acf.usecase_4_title || 'Объявления и листинги',
        description: acf.usecase_4_description || 
          'Профессиональные фото автомобилей и недвижимости'
      }
    ],
    cta: {
      title: acf.cta_title || 'Готовы начать?',
      description: acf.cta_description || 
        'Присоединяйтесь к миллионам пользователей, которые уже создают профессиональные изображения с нашим инструментом',
      buttonText: acf.cta_button_text || 'Попробовать бесплатно'
    },
    footer: {
      companyName: acf.footer_company_name || 'ИП Баландин Виталий Николаевич',
      inn: acf.footer_inn || '781005876562'
    }
  };
}
