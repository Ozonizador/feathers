import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { Favourites, FAVOURITES_COLUMNS, FAVOURITES_TABLE_NAME } from "../models/favourite";

export const addFavouriteToUser = async (userId: string, advertId: string) => {
    // check this random UUID
    const { data, error } = await supabaseClient.from<Favourites>(FAVOURITES_TABLE_NAME).insert({ id: randomUUID(), userId, advertId});
    return { data, error }
};

export const getFavouritesFromUser = async (userId: string) => {
    const { data, error } = await supabaseClient.from<Favourites>(FAVOURITES_TABLE_NAME).select().eq(FAVOURITES_COLUMNS.USER_ID, userId);
    return { data, error }

};


export const removeFavouriteFromUser = async (id: string) => {
    const { data, error } = await supabaseClient.from<Favourites>(FAVOURITES_TABLE_NAME).delete().eq(FAVOURITES_COLUMNS.ID, id);
    return { data, error };
}