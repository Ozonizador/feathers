import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { debug } from "console";
import { v4 as uuidv4 } from "uuid";
import { FilterAdvertisements } from "../context/ProcurarAdvertisementsProvider";
import { addFilterAdvertisement } from "../helpers/advertisementHelper";
import {
  Advertisement,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_STORAGE_BUCKET,
  ADVERTISEMENT_TABLE_NAME,
  CLOSE_ADVERTISEMENTS_TABLE_NAME,
} from "../models/advertisement";
import { AdvertisementReviewSummary } from "../models/review";
import { getCorrectUrl } from "../utils/utils";

export const PAGE_NUMBER_COUNT = 10 as number;

export const addAdvertisement = async (advertisement: Advertisement) => {
  const { data, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .insert({ ...advertisement, updated_at: new Date(), id: uuidv4() }, { returning: "representation" })
    .single();

  return { data, error };
};

export const updateAdvertisement = async (advertisement: Partial<Advertisement>, id: string) => {
  const { data, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .update({ ...advertisement, updated_at: new Date() }, { returning: "representation" })
    .eq(ADVERTISEMENT_PROPERTIES.ID, id)
    .single();

  return { data, error };
};

export const getSingleAdvertisement = async (id: string) => {
  const { data, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .select()
    .eq(ADVERTISEMENT_PROPERTIES.ID, id)
    .single();

  return { data, error };
};

export const getAdvertismentsFromMultipleId = async (ids: string[]) => {
  const { data, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .select()
    .in(ADVERTISEMENT_PROPERTIES.ID, ids);

  return { data, error };
};

export const getAdvertismentsFromUserId = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .select()
    .eq(ADVERTISEMENT_PROPERTIES.HOST_ID, userId);

  return { data, error };
};
export const getAdvertisementsFromPlace = async (place: string) => {
  const { data, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .select()
    .eq(ADVERTISEMENT_PROPERTIES.PLACE, place);

  return { data, error };
};

/*
  Filtering
*/

export type AdvertisementWithReviewAverage = Advertisement & {
  averages: AdvertisementReviewSummary[];
};

export const getAdvertisementsByCloseCoordinatesWithFilters = async (
  lat: number,
  lng: number,
  page: number,
  filters: FilterAdvertisements
) => {
  let initRange = page == 1 ? 0 : (page - 1) * PAGE_NUMBER_COUNT;
  let query = supabaseClient
    .rpc(
      CLOSE_ADVERTISEMENTS_TABLE_NAME,
      {
        lat,
        lng,
      },
      { count: "exact" }
    )
    .select("*, averages:reviewsPerAdvertisement!left(*)");
  query = addFilterAdvertisement(query, filters);

  const { data, error, count } = await query.range(initRange, page * PAGE_NUMBER_COUNT - 1);

  return { data, error, count };
};

export const getAdvertisementsForMainPage = async (lat: number, lng: number) => {
  let query = supabaseClient.rpc(CLOSE_ADVERTISEMENTS_TABLE_NAME, { lat, lng }).limit(4);

  const { data, error } = await query;
  return { data, error };
};

/* Waiting João response */
export const getSimilarAdvertisements = async () => {
  return { data: [], error: null };
};

/* IMAGE */

export const saveImage = async (advertisementID: string, fileName: string, file: File) => {
  const { data, error } = await supabaseClient.storage
    .from(ADVERTISEMENT_STORAGE_BUCKET)
    .upload(`${advertisementID}/${fileName}`, file, { cacheControl: "3600", upsert: false });

  if (error) {
    return { publicURL: null, error };
  }

  return getPublicUrlFromImage(data.Key);
};

export const getPublicUrlFromImage = async (key: string) => {
  const { publicURL, error } = await supabaseClient.storage
    .from(ADVERTISEMENT_STORAGE_BUCKET)
    .getPublicUrl(getCorrectUrl(key));

  return { publicURL, error };
};

export const removePicture = async (advertisementID: string, photoUrl: string) => {
  let dividedUrl = photoUrl.split("/");
  let avatarName = dividedUrl[dividedUrl.length - 1];
  const { data, error } = await supabaseClient.storage
    .from(ADVERTISEMENT_STORAGE_BUCKET)
    .remove([`${advertisementID}/${avatarName}`]);

  return { data, error };
};
