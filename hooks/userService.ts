import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DEACTIVATE_TABLE_NAME, DEACTIVATION_COLUMNS, DeactivationResponse } from "../models/profile";

const useUserService = () => {
  const supabaseClient = useSupabaseClient();

  async function register(email: string, password: string) {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    return { error };
  }

  async function login(email: string, password: string) {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  }

  async function loginWithMagicLink(email: string) {
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}` },
    });

    return { error };
  }

  async function loginWithFacebook() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "facebook",
    });

    return { error };
  }

  async function loginWithGoogle() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });

    return { error };
  }

  async function signout() {
    const { error } = await supabaseClient.auth.signOut();
    return error;
  }

  /* recover email */
  async function recoverPasswordViaEmail(email: string) {
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email);
    return { data, error };
  }

  async function resendVerification(email: string) {
    const { data, error } = await supabaseClient.auth.resend({
      type: "signup",
      email,
    });

    return { data, error };
  }

  async function updateUserPassword(password: string) {
    const { error } = await supabaseClient.auth.updateUser({ password });
    return { error };
  }

  async function deleteUserAccount(reason: string) {
    const { error } = await supabaseClient
      .from<"deactivation", DeactivationResponse>(DEACTIVATE_TABLE_NAME)
      .insert({ reason });

    if (error) {
      return error;
    }
  }

  return {
    loginWithFacebook,
    recoverPasswordViaEmail,
    signout,
    loginWithGoogle,
    loginWithMagicLink,
    register,
    login,
    updateUserPassword,
    deleteUserAccount
  };
};

export default useUserService;
