exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      supabaseUrl: process.env.VITE_SUPABASE_URL,
      supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY,
      nodeEnv: process.env.NODE_ENV
    })
  };
};
