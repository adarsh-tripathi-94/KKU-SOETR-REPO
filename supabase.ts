import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jepdqakmsduljojvbkjq.supabase.co"; 
const supabaseKey = "sb_publishable_4GcT8z6s6jsUuLxfRGdZAw_h8d4iIEx";

export const supabase = createClient(supabaseUrl, supabaseKey);