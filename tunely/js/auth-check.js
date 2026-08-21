import { supabase } from './supabase-config.js';

export async function requireAuth(isRoot = false) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = isRoot ? 'login/' : '../login/';
  }
  return session?.user;
}

export async function redirectIfAuth(isRoot = false) {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = isRoot ? './' : '../';
  }
}
