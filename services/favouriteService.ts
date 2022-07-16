import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Profile, PROFILE_COLUMNS, PROFILE_TABLE_NAME } from "../models/profile";

export const updateFavouriteFromUser = async (userId: string, favouriteRooms: string[]) => {
    const { data, error } = await supabaseClient.from<Profile>(PROFILE_TABLE_NAME).update( { favouriteRooms: favouriteRooms}).eq(PROFILE_COLUMNS.ID, userId);
    return { data, error }
};

export const getFavouritesFromUser = async (userId: string) => {
    const { data, error } = await supabaseClient.from<Profile>(PROFILE_TABLE_NAME).select().eq(PROFILE_COLUMNS.ID, userId);
    return { data, error }

};
