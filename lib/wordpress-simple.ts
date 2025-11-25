const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://grayai.ru/wp/wp-json/wp/v2';

export interface WPHomepageACF {
  logo?: number | string;
  title?: string;
  description?: string;
  button?: string;
}

export interface WPPage {
  id: number;
  title: { rendered: string };
  acf?: WPHomepageACF;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
}

export async function getHomepageContent(): Promise<WPPage | null> {
  try {
    const res = await fetch(`${WP_API_URL}/pages/2`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.error('WordPress API error:', res.status, res.statusText);
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching WordPress homepage:', error);
    return null;
  }
}

export async function getMediaUrl(mediaId: number): Promise<string | null> {
  try {
    const res = await fetch(`${WP_API_URL.replace('/pages', '')}/media/${mediaId}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.error('WordPress Media API error:', res.status, res.statusText);
      return null;
    }
    
    const media: WPMedia = await res.json();
    return media.source_url;
  } catch (error) {
    console.error('Error fetching WordPress media:', error);
    return null;
  }
}
