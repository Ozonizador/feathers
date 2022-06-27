import { supabase } from "../utils/supabaseClient";

// not sure if this exists
export async function register(email, password) {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });
}

export async function login(email, password) {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });

  return { user, session, error };
}

export async function loginWithMagicLink(email) {
  const { user, session, error } = await supabase.auth.signIn({
    email,
  });

  return { user, session, error };
}

export async function loginWithFacebook() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "facebook",
  });

  return { user, session, error };
}

export async function loginWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google",
  });

  return { user, session, error };
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  return error;
}
