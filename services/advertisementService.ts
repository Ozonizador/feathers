import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from 'uuid';
import Advertisement, { ADVERTISEMENT_PROPERTIES, ADVERTISEMENT_STORAGE_BUCKET, ADVERTISEMENT_TABLE_NAME } from "../models/advertisement";

export const addAdvertisement = async (advertisement: Advertisement) => {
  const { data, error } = await supabaseClient.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).insert({ ...advertisement, updatedAt: new Date(), id: uuidv4() }, { returning: "representation"}).single();
  return { data, error };
};

export const updateAdvertisement = async (advertisement: Partial<Advertisement>, id: string) => {
  const { data, error } = await supabaseClient.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).update({...advertisement, updatedAt: new Date()}, { returning: "minimal"}).eq(ADVERTISEMENT_PROPERTIES.ID, id).single();
  return { data, error };
};

export const getSingleAdvertisement = async (id: string) => {
  const { data, error } = await supabaseClient.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).select().eq(ADVERTISEMENT_PROPERTIES.ID, id).single();
  return { data, error };
}

export const getAdvertisementsFromDB = async () => {
  const { data, error } = await supabaseClient.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).select();
  return { data, error };
}


export const getAdvertismentsFromMultipleId = async (ids: string[]) => {
  const { data, error } = await supabaseClient.from<Advertisement>(ADVERTISEMENT_TABLE_NAME).select().in(ADVERTISEMENT_PROPERTIES.ID, ids);
  return { data, error }
}

/* IMAGE */

export const saveImage = async (advertisementID: string, fileName: string, file: File) => {
  const { data, error } = await supabaseClient.storage.from(ADVERTISEMENT_STORAGE_BUCKET).upload(`${advertisementID}/${fileName}`, file, {cacheControl: '3600', upsert: false })

  if(error) {
    return { publicURL: null, error }
  }

  return getPublicUrlFromImage(data.Key)
}

export const getPublicUrlFromImage = async (key: string) => {
  const parsedKey = key.split("\\");
  const theCorrectKey = parsedKey.splice(1);
  const { publicURL, error } = await supabaseClient.storage.from(ADVERTISEMENT_STORAGE_BUCKET).getPublicUrl(parsedKey.join("\\"));

  return { publicURL, error };
}