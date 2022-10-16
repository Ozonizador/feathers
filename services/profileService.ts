import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AVATAR_STORAGE_NAME, Profile, ProfilesResponse, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../models/profile";
import { getCorrectUrl, createRandomUniqWord } from "../utils/utils";

const useProfileService = () => {
  const supabaseClient = useSupabaseClient();

  const checkProfileAndCreate = async (userID: string) => {
    try {
      const { data, error } = await getUserProfile(userID);
      if (error || !data) return createProfile(userID);
      return { data, error };
    } catch (error) {
      return createProfile(userID);
    }
  };

  const createProfile = async (userID: string) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .insert({ id: userID, updated_at: new Date().toDateString(), slug: createRandomUniqWord() })
      .single();
    return { data, error };
  };

  /* FOR THE REGULAR APP */

  const getUserProfile = async (userID: string) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .select()
      .eq(PROFILE_COLUMNS.ID, userID)
      .single();
    return { data, error };
  };

  const updateUserProfile = async (userID: string, profile: Profile) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ ...profile })
      .eq(PROFILE_COLUMNS.ID, userID)
      .single();
    return { data, error };
  };

  const updateAvatarInfo = async (userId: string, avatar_url: string) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ avatar_url })
      .eq(PROFILE_COLUMNS.ID, userId)
      .single();

    return { data, error };
  };

  const addAvatar = async (userId: string, fileName: string, file: File) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .select("avatar_url")
      .eq(PROFILE_COLUMNS.ID, userId)
      .single();

    const currentAvatarUrl = data && data.avatar_url;
    // upload new picture
    const { publicUrl, error: avatarError } = await uploadPicture(userId, fileName, file);
    if (!avatarError) {
      await updateAvatarInfo(userId, publicUrl);

      // remove old picture
      if (currentAvatarUrl) {
        await removePicture(userId, currentAvatarUrl);
      }

      return { data: publicUrl, error };
    } else {
      return { data: null, error };
    }
  };

  const uploadPicture = async (userId: string, fileName: string, avatarFile: File) => {
    const { data, error } = await supabaseClient.storage
      .from(AVATAR_STORAGE_NAME)
      .upload(`${userId}/${fileName}`, avatarFile, { cacheControl: "3600", upsert: false });

    if (error) {
      return { publicUrl: null, error };
    }

    return getPublicAvatarUrlFromImage(data.path);
  };

  const removePicture = async (userId: string, avatar_url: string) => {
    let dividedUrl = avatar_url.split("/");
    let avatarName = dividedUrl[dividedUrl.length - 1];
    const { data, error } = await supabaseClient.storage.from(AVATAR_STORAGE_NAME).remove([`${userId}/${avatarName}`]);

    return { data, error };
  };

  /* Utils */
  const getPublicAvatarUrlFromImage = async (key: string) => {
    const { data } = await supabaseClient.storage.from(AVATAR_STORAGE_NAME).getPublicUrl(getCorrectUrl(key));
    return { publicUrl: data.publicUrl, error: null };
  };

  return { checkProfileAndCreate, addAvatar, updateUserProfile, getUserProfile };
};

export default useProfileService;
