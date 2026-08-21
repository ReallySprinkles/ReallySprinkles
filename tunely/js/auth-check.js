import { supabase } from './supabase-config.js';

export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
  }
  return session?.user;
}

export async function redirectIfAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = 'index.html';
  }
}
