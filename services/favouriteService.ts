import { SupabaseClient } from "@supabase/supabase-js";
import { ProfilesResponse, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../models/profile";

export const updateFavouriteFromUser = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  userId: string,
  favourite_rooms: string[]
) => {
  const { data, error } = await supabaseClient
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .update({ favourite_rooms })
    .eq(PROFILE_COLUMNS.ID, userId)
    .single();
  return { data, error };
};

export const getFavouritesFromUser = async (supabaseClient: SupabaseClient<any, "public", any>, userId: string) => {
  const { data, error } = await supabaseClient
    .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
    .select()
    .eq(PROFILE_COLUMNS.ID, userId);
  return { data, error };
};
