import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase env vars belum diset. Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY ada di file .env, lalu restart `npm run dev`."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);