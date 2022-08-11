import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Profile, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../models/profile";

export const checkProfileAndCreate = async (userID: string) => {
  try {
    const { data, error } = await getUserProfile(userID);
    if (error) return createProfile(userID);
    return { data, error };
  } catch (error) {
    return createProfile(userID);
  }
};

async function createProfile(userID: string) {
  const { data, error } = await supabaseClient
    .from<Profile>(PROFILE_TABLE_NAME)
    .insert({ id: userID, updatedAt: new Date() })
    .single();
  return { data, error };
}

/* FOR THE REGULAR APP */

export const getUserProfile = async (userID: string) => {
  const { data, error } = await supabaseClient
    .from<Profile>(PROFILE_TABLE_NAME)
    .select()
    .eq(PROFILE_COLUMNS.ID, userID)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userID: string, profile: Profile) => {
  const { data, error } = await supabaseClient
    .from<Profile>(PROFILE_TABLE_NAME)
    .update({ ...profile })
    .eq(PROFILE_COLUMNS.ID, userID)
    .single();
  return { data, error };
};

export const addAvatar = async (userID: string, avatar: any) => {
  const { data, error } = await supabaseClient
    .from<Profile>(PROFILE_TABLE_NAME)
    .select("avatarUrl")
    .eq(PROFILE_COLUMNS.ID, userID)
    .single();

  const currentAvatar = data && data.avatarUrl;
  // upload new picture

  // remove old picture

  return { data, error };
};

export const uploadPicture = async (avatarFile) => {
  const { data, error } = await supabaseClient.storage.from("avatars").upload("public/avatar1.png", avatarFile, {
    cacheControl: "3600",
    upsert: false,
  });
};

export const removePicture = async (avatarUrl) => {
  const { data, error } = await supabaseClient.storage.from("avatars").remove(["folder/avatar1.png"]);
};
