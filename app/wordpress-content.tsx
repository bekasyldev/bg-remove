import { getHomepageContent, getMediaUrl } from '@/lib/wordpress-simple';

export interface WordPressContent {
  logo: string | null;
  title: string;
  description: string;
  button: string;
}

export async function getWordPressContent(): Promise<WordPressContent> {
  const defaultContent: WordPressContent = {
    logo: null,
    title: 'Удаление фона за одну секунду',
    description: 'Загрузите изображение и позвольте нашему ИИ сделать всю работу. Идеальная точность, прозрачный фон и никаких усилий.',
    button: 'Попробовать'
  };

  try {
    const wpData = await getHomepageContent();
    
    if (!wpData || !wpData.acf) {
      console.log('Using default content - no WordPress data');
      return defaultContent;
    }

    let logoUrl = null;
    if (wpData.acf.logo) {
      if (typeof wpData.acf.logo === 'number') {
        logoUrl = await getMediaUrl(wpData.acf.logo);
      } else {
        logoUrl = wpData.acf.logo;
      }
    }

    return {
      logo: logoUrl,
      title: wpData.acf.title || defaultContent.title,
      description: wpData.acf.description || defaultContent.description,
      button: wpData.acf.button || defaultContent.button
    };
  } catch (error) {
    console.error('Error loading WordPress content:', error);
    return defaultContent;
  }
}
