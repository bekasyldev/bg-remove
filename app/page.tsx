import HomePage from './home-client';
import { getWordPressContent } from './wordpress-content';

export const revalidate = 60;

export default async function Page() {
  const wpContent = await getWordPressContent();
  
  return <HomePage wpContent={wpContent} />;
}
