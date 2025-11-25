const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://grayai.ru/wp/wp-json/wp/v2';

export interface WPHomepageACF {
  logo?: string;
  title?: string;
  description?: string;
  button?: string;
}

export interface WPPage {
  id: number;
  title: { rendered: string };
  acf?: WPHomepageACF;
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
