// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';
const config: { SUPABASE_URL: string; SUPABASE_KEY: string } = useRuntimeConfig().public;

console.log("SUPABASE_URL:", config.SUPABASE_URL);
console.log("SUPABASE_KEY:", config.SUPABASE_KEY);

export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_KEY
);
