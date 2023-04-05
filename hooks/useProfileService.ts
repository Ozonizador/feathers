import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { Messages, MESSAGE_TABLE_NAME, MESSAGE_TABLE_PROPERTIES } from "../models/message";
import { NotificationsResponse, NOTIFICATION_PROPERTIES, NOTIFICATION_TABLE_NAME } from "../models/notification";
import {
  AVATAR_STORAGE_NAME,
  Profile,
  ProfilesResponse,
  PROFILE_COLUMNS,
  PROFILE_TABLE_NAME,
  UserTypes,
} from "../models/profile";
import { createRandomUniqWord } from "../utils/utils";

const useProfileService = () => {
  const supabaseClient = useSupabaseClient();

  const checkProfileAndCreate = async (userID: string, metadata: any) => {
    try {
      const { data, error } = await getUserProfile(userID);

      if (error || !data)
        return createProfile({
          avatar_url: metadata?.avatar_url,
          firstName: metadata?.full_name?.split(" ")[0] || "",
          lastName: metadata?.full_name?.split(" ")[1] || "",
        });
      return { data, error };
    } catch (error) {
      return createProfile({
        avatar_url: metadata?.avatar_url,
        firstName: metadata?.full_name?.split(" ")[0] || "",
        lastName: metadata?.full_name?.split(" ")[1] || "",
      });
    }
  };

  const createProfile = async (metadata?: { avatar_url?: string; firstName?: string; lastName?: string }) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .insert({
        slug: createRandomUniqWord(),
        avatar_url: metadata.avatar_url,
        name: metadata.firstName,
        surname: metadata.lastName,
      })
      .select()
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
    const { error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ ...profile })
      .eq(PROFILE_COLUMNS.ID, userID);

    return { error };
  };

  const setTypeUser = async (userID: string, type: "LANDLORD" | "TENANT") => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ type })
      .eq(PROFILE_COLUMNS.ID, userID)
      .select()
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

  /* Messages */

  // Change this logic. must be from conversation where user_id / tenant_id and opposite to
  const checkMessagesNotSeen = async (userId: string, type?: UserTypes) => {
    const { data, error, count } = await supabaseClient
      .from<"messages", Messages>(MESSAGE_TABLE_NAME)
      .select(undefined, { count: "exact" })
      .eq(MESSAGE_TABLE_PROPERTIES.SEEN, false);

    return { count: count || 0 };
  };

  /* Notifications */
  const checkNotificationsNotSeen = async (userId: string) => {
    const { data, error, count } = await supabaseClient
      .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
      .select(undefined, { count: "exact" })
      .eq(MESSAGE_TABLE_PROPERTIES.SEEN, false);

    return { count: count || 0 };
  };

  /* Picture */

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

  async function updateNotificationEmail(
    userId: string,
    notify: boolean
  ): Promise<{ data: { accepts_notification_email: boolean }; error: PostgrestError }> {
    const { error, data } = await supabaseClient
      .from(PROFILE_TABLE_NAME)
      .update({ accepts_notification_email: notify })
      .eq(PROFILE_COLUMNS.ID, userId)
      .select("accepts_notification_email")
      .single();

    return { error, data };
  }

  async function updateNotificationMessage(userId: string, notify: boolean) {
    const { error, data } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ accepts_notification_message: notify })
      .eq(PROFILE_COLUMNS.ID, userId)
      .select("accepts_notification_message")
      .single();

    return { error, data };
  }

  async function getNotificationInfoFromUser(userId: string) {
    const { error, data } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .select("accepts_notification_email, accepts_notification_message")
      .eq(PROFILE_COLUMNS.ID, userId);

    return { error, data };
  }

  /* Utils */
  const getPublicAvatarUrlFromImage = async (key: string) => {
    const { data } = await supabaseClient.storage.from(AVATAR_STORAGE_NAME).getPublicUrl(key);
    return { publicUrl: data.publicUrl, error: null };
  };

  return {
    checkProfileAndCreate,
    addAvatar,
    updateUserProfile,
    getUserProfile,
    updateNotificationEmail,
    updateNotificationMessage,
    getNotificationInfoFromUser,
    setTypeUser,
    checkMessagesNotSeen,
    checkNotificationsNotSeen,
  };
};

export default useProfileService;
