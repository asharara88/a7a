exports.handler = async () => {
  const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Missing environment variables: ${missing.join(', ')}`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      supabaseUrl: process.env.VITE_SUPABASE_URL,
      supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY,
      nodeEnv: process.env.NODE_ENV,
    }),
  };
};
