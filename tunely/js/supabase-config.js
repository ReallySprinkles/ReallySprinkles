import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://ovqtibumfhlifhghqukq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cXRpYnVtZmhsaWZoZ2hxdWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNDUyMDcsImV4cCI6MjEwMjkyMTIwN30.5y2CFugu3vaZB1EVGojF1VUZsXje4DsoGPK5gz4ZSvQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
