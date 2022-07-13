import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Profile, PROFILE_TABLE_NAME } from "../models/profile";

export const checkProfileAndCreate = async (userID: string) => {
    try{
        const { data, error } = await supabaseClient.from<Profile>(PROFILE_TABLE_NAME).select().eq("id", userID).single();
        if(error) return createProfile(userID);
        return {  data, error };
    } catch(error) {
        return createProfile(userID)
    }
}

async function createProfile(userID: string) {
    const { data, error } = await supabaseClient.from<Profile>(PROFILE_TABLE_NAME).insert({id : userID, updatedAt: new Date()});
    return { data, error }
}