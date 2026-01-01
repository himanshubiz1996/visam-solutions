import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqqthaylplhmgmooriyg.supabase.co';
const supabaseAnonKey = 'sb_publishable_qtGCXiiDa64D2hJPkZrCUQ_O1BYgow2';

console.log('✅ Supabase Config Loaded');
console.log('URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('✅ Supabase Client Ready!');
