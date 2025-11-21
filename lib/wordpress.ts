const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://grayai.ru/wp/wp-json/wp/v2';

export interface WPPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  acf?: Record<string, unknown>; // Advanced Custom Fields
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const res = await fetch(`${WP_API_URL}/pages?slug=${slug}&_embed`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      console.error('WordPress API error:', res.status, res.statusText);
      return null;
    }
    
    const pages = await res.json();
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching WordPress page:', error);
    return null;
  }
}

/**
 * Fetch all pages
 */
export async function getAllPages(): Promise<WPPage[]> {
  try {
    const res = await fetch(`${WP_API_URL}/pages?_embed&per_page=100`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching WordPress pages:', error);
    return [];
  }
}

/**
 * Fetch media by ID
 */
export async function getMedia(id: number): Promise<WPMedia | null> {
  try {
    const res = await fetch(`${WP_API_URL}/media/${id}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching WordPress media:', error);
    return null;
  }
}

/**
 * Fetch homepage content with custom fields
 */
export async function getHomepageContent() {
  try {
    // Try to get page with slug 'homepage' or 'home'
    let page = await getPageBySlug('homepage');
    if (!page) {
      page = await getPageBySlug('home');
    }
    
    return page;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return null;
  }
}