import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export async function register(email, password) {
  const { user, session, error } = await supabaseClient.auth.signUp(
    {
      email,
      password,
    }
  );
  return { user, session, error };
}

export async function login(email, password) {
  const { user, session, error } = await supabaseClient.auth.signIn(
    {
      email,
      password,
    }
  );

  return { user, session, error };
}

export async function loginWithMagicLink(email) {
  const { user, session, error } = await supabaseClient.auth.signIn(
    {
      email,
    },
    {
      redirectTo: `${window.location.origin}`,
    }
  );

  return { user, session, error };
}

export async function loginWithFacebook() {
  const { user, session, error } = await supabaseClient.auth.signIn(
    {
      provider: "facebook",
    },
    {
      redirectTo: `${window.location.origin}`,
    }
  );

  return { user, session, error };
}

export async function loginWithGoogle() {
  const { user, session, error } = await supabaseClient.auth.signIn(
    {
      provider: "google",
    },
    {
      redirectTo: `${window.location.origin}`,
    }
  );

  return { user, session, error };
}

export async function signout() {
  const { error } = await supabaseClient.auth.signOut();
  return error;
}

/* check session */
export async function checkUserLoggedIn() {
  const session = await supabaseClient.auth.session();
  return session;
}

/* recover email */
export async function recoverPasswordViaEmail(email) {
  const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(email);
  return { data, error };
}
