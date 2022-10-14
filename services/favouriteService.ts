import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ProfilesResponse, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../models/profile";

const useFavouriteService = () => {
  const supabaseClient = useSupabaseClient();

  const updateFavouriteFromUser = async (userId: string, favourite_rooms: string[]) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .update({ favourite_rooms })
      .eq(PROFILE_COLUMNS.ID, userId)
      .single();
    return { data, error };
  };

  const getFavouritesFromUser = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from<"profiles", ProfilesResponse>(PROFILE_TABLE_NAME)
      .select()
      .eq(PROFILE_COLUMNS.ID, userId);
    return { data, error };
  };

  return { updateFavouriteFromUser, getFavouritesFromUser };
};

export default useFavouriteService;
