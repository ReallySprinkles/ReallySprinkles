import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://kdezxjizwqfmugkwpycb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZXp4aml6d3FmbXVna3dweWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNzQ5OTgsImV4cCI6MjEwMjc1MDk5OH0.Pc2p7s3umB-7PyPtTupQcA5occ5xEZdQzs4K5Nwhv_8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
