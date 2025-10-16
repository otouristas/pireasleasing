'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isMissingEnvVars = error.message.includes('Missing Supabase') || 
                          error.message.includes('URL and Key are required');

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isMissingEnvVars ? 'Configuration Required' : 'Something Went Wrong'}
              </h1>
              
              {isMissingEnvVars ? (
                <div className="text-left space-y-4">
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                    <h2 className="font-bold text-yellow-900 mb-2">Missing Environment Variables</h2>
                    <p className="text-yellow-800 text-sm">
                      This application requires Supabase credentials to function. Please add the following environment variables to your Netlify/Vercel deployment:
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                    <p className="font-mono text-xs text-blue-900 break-all">
                      <strong>NEXT_PUBLIC_SUPABASE_URL</strong><br />
                      <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong>
                    </p>
                  </div>

                  <div className="text-center pt-4">
                    <a
                      href="https://app.netlify.com"
                      className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Configure in Netlify →
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-6">
                    {error.message || 'An unexpected error occurred'}
                  </p>
                  <button
                    onClick={() => reset()}
                    className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

