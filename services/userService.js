import { supabase } from "../utils/supabaseClient";

// not sure if this exists
export async function register(email, password) {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      redirectTo: `${window.location.origin}/auth/welcome`,
    }
  );
}

export async function login(email, password) {
  const { user, session, error } = await supabase.auth.signIn(
    {
      email,
      password,
    },
    {
      redirectTo: `${window.location.origin}/auth/welcome`,
    }
  );

  return { user, session, error };
}

export async function loginWithMagicLink(email) {
  const { user, session, error } = await supabase.auth.signIn(
    {
      email,
    },
    {
      redirectTo: `${window.location.origin}/auth/welcome`,
    }
  );

  return { user, session, error };
}

export async function loginWithFacebook() {
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: "facebook",
    },
    {
      redirectTo: `${window.location.origin}/auth/welcome`,
    }
  );

  return { user, session, error };
}

export async function loginWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn(
    {
      provider: "google",
    },
    {
      redirectTo: `${window.location.origin}/auth/welcome`,
    }
  );

  return { user, session, error };
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  return error;
}
