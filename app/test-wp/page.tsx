import { getHomepageContent } from '@/lib/wordpress-simple';

export default async function TestPage() {
  const data = await getHomepageContent();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">WordPress Test</h1>
      
      {data ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-2">ACF Data:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
          
          {data.acf && (
            <div className="mt-4">
              <p><strong>Logo:</strong> {data.acf.logo || 'Not set'}</p>
              <p><strong>Title:</strong> {data.acf.title || 'Not set'}</p>
              <p><strong>Description:</strong> {data.acf.description || 'Not set'}</p>
              <p><strong>Button:</strong> {data.acf.button || 'Not set'}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Failed to fetch WordPress data. Check console for errors.
        </div>
      )}
    </div>
  );
}

export const revalidate = 0;
