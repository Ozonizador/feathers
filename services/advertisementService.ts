import { supabase } from "../utils/supabaseClient";
import Advertisement, { ADVERTISEMENT_TABLE_NAME } from "../models/advertisement";

export const addAdvertisement = async (advertisement: Advertisement) => {
  const { data, error } = await supabase.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).insert(advertisement);
  return { data, error };
};

export const updateAdvertisement = async (advertisement: Advertisement, id: number) => {
  const { data, error } = await supabase.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).update(advertisement);
  return { data, error };
};

