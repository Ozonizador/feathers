import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { Messages, MESSAGE_TABLE_NAME, MESSAGE_TABLE_PROPERTIES } from "../models/message";
import { NotificationsResponse, NOTIFICATION_TABLE_NAME, NOTIFICATION_PROPERTIES } from "../models/notification";
import {
  AVATAR_STORAGE_NAME,
  Profile,
  ProfilesResponse,
  PROFILE_COLUMNS,
  PROFILE_TABLE_NAME,
  UserTypes,
  PaymentMethods,
  PAYMENT_METHODS_TABLE_NAME,
} from "../models/profile";
import { createRandomUniqWord } from "../utils/utils";

const useProfileService = () => {
  const supabaseClient = useSupabaseClient();

  const checkProfileAndCreate = async (userID: string, metadata: any) => {
    let obj = {
      avatar_url: metadata?.avatar_url || "",
      firstName: metadata?.full_name?.split(" ")[0] || "",
      lastName: metadata?.full_name?.split(" ")[1] || "",
      userID: userID,
    };

    try {
      const { data, error } = await getUserProfile(userID);
      if (error || data?.length == 0) return createProfile(obj);
      return { data, error };
    } catch (error) {
      return createProfile(obj);
    }
  };

  const createProfile = async (metadata: {
    avatar_url?: string;
    firstName?: string;
    lastName?: string;
    userID?: string;
  }) => {
    console.log(" test");
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .insert({
        slug: createRandomUniqWord(),
        avatar_url: metadata.avatar_url,
        name: metadata.firstName,
        surname: metadata.lastName,
        id: metadata.userID,
      })
      .select()
      .single();
    return { data, error };
  };

  //nome - ok, apelido- ok, date de nascimento -nao tem, nacionalidade - nao tem e localidade -nao tem, foto (se existir)

  /* FOR THE REGULAR APP */

  const getUserProfile = async (userID: string) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .select()
      .eq(PROFILE_COLUMNS.ID, userID);
    return { data, error };
  };

  const updateUserProfile = async (userID: string, profile: Profile) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ ...profile })
      .eq(PROFILE_COLUMNS.ID, userID)
      .select()
      .single();

    return { data, error };
  };

  const setTypeUser = async (userID: string, type: "LANDLORD" | "TENANT") => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ type, prefered_unidesk_state: type })
      .eq(PROFILE_COLUMNS.ID, userID);
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
    console.log(userId, fileName, file, "filefilefilefilefile");
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .select("avatar_url")
      .eq(PROFILE_COLUMNS.ID, userId)
      .single();

    const currentAvatarUrl = data && data.avatar_url;
    // upload new picture
    const { publicUrl, error: avatarError } = await uploadPicture(userId, fileName, file);

    console.log(avatarError, "avatarError");
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

  /* Paymenth Methods*/
  const addPaymentMethods = async (userId: string, iban: string, swift: string) => {
    const {data, error} = await supabaseClient
    .from<"payment_methods", PaymentMethods>(PAYMENT_METHODS_TABLE_NAME)
    .insert({profile_id: userId, iban, swift})
    .select()
    .single()

    return {data, error}
  };

  const getUserPaymentMethods = async (userId: string) => {
    const { data, error } = await supabaseClient
    .from<"payment_methods", PaymentMethods>(PAYMENT_METHODS_TABLE_NAME)
    .select()
    .eq("profile_id", userId)
    .single()

    return {data, error};
  }

  /* Messages */

  const checkMessagesNotSeen = async (userId: string, type?: UserTypes | null) => {
    if (!type) return 0;

    let query = supabaseClient
      .from<"messages", Messages>(MESSAGE_TABLE_NAME)
      .select("conversations(*)", { count: "exact" })
      .eq(MESSAGE_TABLE_PROPERTIES.SEEN, false);

    if (type === "LANDLORD") {
      query = query.eq("conversations.host_id", userId);
    } else if (type === "TENANT") {
      query = query.eq("conversation.tenant_id", userId);
    }

    const { count } = await query;
    return count || 0;
  };

  /* Notifications */
  const checkNotificationsNotSeen = async (userId: string) => {
    const { count } = await supabaseClient
      .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
      .select(undefined, { count: "exact" })
      .eq(MESSAGE_TABLE_PROPERTIES.SEEN, false);

    return count;
  };

  const makeNotificationSeen = async (notificationId: string) => {
    const { data, error } = await supabaseClient
      .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
      .update({ seen: true })
      .eq(NOTIFICATION_PROPERTIES.ID, notificationId);

    return { error, data };
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
    getNotificationInfoFromUser,
    makeNotificationSeen,
    setTypeUser,
    checkMessagesNotSeen,
    checkNotificationsNotSeen,
    addPaymentMethods,
    getUserPaymentMethods,
  };
};

export default useProfileService;
