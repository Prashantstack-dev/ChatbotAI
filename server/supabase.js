
import {createClient} from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(url, key);
if(!url || !key){
  console.error("Missing Supabase environment variables");
}
// console.log('Supabase connected: ', !!url && !!key);

export default supabase;