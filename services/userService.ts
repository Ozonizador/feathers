import { SupabaseClient } from "@supabase/supabase-js";

export async function register(supabaseClient: SupabaseClient<any, "public", any>, email, password) {
  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  return { error };
}

export async function login(supabaseClient: SupabaseClient<any, "public", any>, email, password) {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  return { error };
}

export async function loginWithMagicLink(supabaseClient: SupabaseClient<any, "public", any>, email) {
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}` },
  });

  return { error };
}

export async function loginWithFacebook(supabaseClient: SupabaseClient<any, "public", any>) {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${window.location.origin}`,
    },
  });

  return { error };
}

export async function loginWithGoogle(supabaseClient: SupabaseClient<any, "public", any>) {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}`,
    },
  });

  return { error };
}

export async function signout(supabaseClient: SupabaseClient<any, "public", any>) {
  const { error } = await supabaseClient.auth.signOut();
  return error;
}

/* recover email */
export async function recoverPasswordViaEmail(supabaseClient: SupabaseClient<any, "public", any>, email) {
  const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email);
  return { data, error };
}
