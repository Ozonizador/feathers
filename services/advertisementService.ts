import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Advertisement, { ADVERTISEMENT_TABLE_NAME } from "../models/advertisement";

export const addAdvertisement = async (advertisement: Advertisement) => {
  const { data, error } = await supabaseClient.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).insert({ ...advertisement, updatedAt: new Date()});
  return { data, error };
};

export const updateAdvertisement = async (advertisement: Advertisement, id: number) => {
  const { data, error } = await supabaseClient.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).update({...advertisement, updatedAt: new Date()});
  return { data, error };
};

