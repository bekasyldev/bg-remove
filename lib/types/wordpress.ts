// WordPress Content Types for BG Remove

export interface WPHomepageACF {
  // Hero Section
  hero_title?: string;
  hero_description?: string;
  hero_button_text?: string;
  
  // Features
  feature_1_icon?: string;
  feature_1_title?: string;
  feature_1_description?: string;
  
  feature_2_icon?: string;
  feature_2_title?: string;
  feature_2_description?: string;
  
  feature_3_icon?: string;
  feature_3_title?: string;
  feature_3_description?: string;
  
  // Use Cases
  usecase_1_title?: string;
  usecase_1_description?: string;
  usecase_1_emoji?: string;
  
  usecase_2_title?: string;
  usecase_2_description?: string;
  usecase_2_emoji?: string;
  
  usecase_3_title?: string;
  usecase_3_description?: string;
  usecase_3_emoji?: string;
  
  usecase_4_title?: string;
  usecase_4_description?: string;
  usecase_4_emoji?: string;
  
  // CTA Section
  cta_title?: string;
  cta_description?: string;
  cta_button_text?: string;
  
  // Footer
  footer_company_name?: string;
  footer_inn?: string;
}

export interface HomepageContent {
  hero: {
    title: string;
    description: string;
    buttonText: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  useCases: Array<{
    emoji: string;
    title: string;
    description: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  footer: {
    companyName: string;
    inn: string;
  };
}
