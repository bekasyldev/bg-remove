import HomePage from './home-client';
import { Header } from '@/components/Header';
import { getWordPressContent } from './wordpress-content';
import { Footer } from '@/components/Footer';

export const revalidate = 60;

export default async function Page() {
  const wpContent = await getWordPressContent();
  
  return (
    <>
      <Header logoUrl={wpContent.logo} buttonText={wpContent.button} />
      <HomePage wpContent={wpContent} />
      <Footer />
    </>
  );
}
