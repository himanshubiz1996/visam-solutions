import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment check:', {
    VITE_URL: import.meta.env.VITE_SUPABASE_URL,
    URL: import.meta.env.SUPABASE_URL,
    VITE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'exists' : 'missing',
    KEY: import.meta.env.SUPABASE_ANON_KEY ? 'exists' : 'missing'
  });
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
