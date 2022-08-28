import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { AVATAR_STORAGE_NAME, Profile, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../models/profile";
import { getCorrectUrl, createRandomUniqWord } from "../utils/utils";

export const checkProfileAndCreate = async (userID: string) => {
  try {
    const { data, error } = await getUserProfile(userID);
    if (error || !data) return createProfile(userID);
    return { data, error };
  } catch (error) {
    return createProfile(userID);
  }
};

async function createProfile(userID: string) {
  const { data, error } = await supabaseClient
    .from<Profile>(PROFILE_TABLE_NAME)
    .insert({ id: userID, updatedAt: new Date(), slug: createRandomUniqWord() })
    .single();
  debugger;
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

export const updateAvatarInfo = async (userId: string, avatarUrl: string) => {
  const { data, error } = await supabaseClient
    .from<Profile>(PROFILE_TABLE_NAME)
    .update({ avatarUrl })
    .eq(PROFILE_COLUMNS.ID, userId)
    .single();

  return { data, error };
};

export const addAvatar = async (userId: string, fileName: string, file: File) => {
  const { data, error } = await supabaseClient
    .from<Profile>(PROFILE_TABLE_NAME)
    .select("avatarUrl")
    .eq(PROFILE_COLUMNS.ID, userId)
    .single();

  const currentAvatarUrl = data && data.avatarUrl;
  // upload new picture
  const { publicURL, error: avatarError } = await uploadPicture(userId, fileName, file);
  if (!avatarError) {
    await updateAvatarInfo(userId, publicURL);

    // remove old picture
    if (currentAvatarUrl) {
      await removePicture(userId, currentAvatarUrl);
    }

    return { data: publicURL, error };
  } else {
    return { data: null, error };
  }
};

export const uploadPicture = async (userId: string, fileName: string, avatarFile: File) => {
  const { data, error } = await supabaseClient.storage
    .from(AVATAR_STORAGE_NAME)
    .upload(`${userId}/${fileName}`, avatarFile, { cacheControl: "3600", upsert: false });

  if (error) {
    return { publicURL: null, error };
  }

  return getPublicAvatarUrlFromImage(data.Key);
};

export const removePicture = async (userId: string, avatarUrl: string) => {
  let dividedUrl = avatarUrl.split("/");
  let avatarName = dividedUrl[dividedUrl.length - 1];
  const { data, error } = await supabaseClient.storage.from(AVATAR_STORAGE_NAME).remove([`${userId}/${avatarName}`]);

  return { data, error };
};

/* Utils */
export const getPublicAvatarUrlFromImage = async (key: string) => {
  const { publicURL, error } = await supabaseClient.storage.from(AVATAR_STORAGE_NAME).getPublicUrl(getCorrectUrl(key));
  return { publicURL, error };
};
