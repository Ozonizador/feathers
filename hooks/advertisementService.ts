import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";

import { FilterAdvertisements } from "../context/ProcurarAdvertisementsProvider";
import { addFilterAdvertisement } from "../helpers/advertisementHelper";
import {
  Advertisement,
  Advertisements,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_STORAGE_BUCKET,
  ADVERTISEMENT_TABLE_NAME,
  CloseAdvertisementsFn,
  CLOSE_ADVERTISEMENTS_TABLE_NAME,
} from "../models/advertisement";
export const PAGE_NUMBER_COUNT = 10 as number;

const useAdvertisementService = () => {
  const supabaseClient = useSupabaseClient();

  const addAdvertisement = async (
    advertisement: Advertisement
  ): Promise<{ data: Advertisement; error: PostgrestError }> => {
    const { data, error } = await supabaseClient
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .insert(advertisement)
      .select()
      .single();

    return { data, error };
  };

  const updateAdvertisement = async (
    advertisement: Partial<Advertisement>,
    id: string
  ): Promise<{ data: Advertisement; error: PostgrestError }> => {
    const { data, error } = await supabaseClient
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .update({ ...advertisement, updated_at: new Date().toDateString() })
      .eq(ADVERTISEMENT_PROPERTIES.ID, id)
      .select()
      .single();

    return { data, error };
  };

  const getSingleAdvertisement = async (id: string): Promise<{ data: Advertisement; error: PostgrestError }> => {
    const { data, error } = await supabaseClient
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select()
      .eq(ADVERTISEMENT_PROPERTIES.ID, id)
      .single();

    return { data, error };
  };

  const getAdvertisementsFromMultipleId = async (
    ids: string[]
  ): Promise<{ data: Advertisement[]; error: PostgrestError }> => {
    const { data, error } = await supabaseClient
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select()
      .in(ADVERTISEMENT_PROPERTIES.ID, ids);

    return { data, error };
  };

  const getAdvertismentsFromUserId = async (
    userId: string
  ): Promise<{ data: Advertisement[]; error: PostgrestError }> => {
    const { data, error } = await supabaseClient
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select()
      .eq(ADVERTISEMENT_PROPERTIES.HOST_ID, userId);

    return { data, error };
  };

  /*
  Filtering
*/

  const getAdvertisementsByCloseCoordinatesWithFilters = async (
    lat: number,
    lng: number,
    page: number,
    filters: FilterAdvertisements
  ) => {
    if (!lng || !lat) {
      return { data: null, error: "No latitude or longitude provided", count: null };
    }

    let initRange = page == 1 ? 0 : (page - 1) * PAGE_NUMBER_COUNT;
    let query = supabaseClient
      .rpc<"close_advertisements", CloseAdvertisementsFn>(
        CLOSE_ADVERTISEMENTS_TABLE_NAME,
        {
          lat,
          lng,
        },
        { count: "exact" }
      )
      .select("*, averages:reviewsPerAdvertisement!left(*), stay:stays(*)");
    query = addFilterAdvertisement(query, filters);
    const { data, error, count } = await query.range(initRange, page * PAGE_NUMBER_COUNT - 1);

    return { data, error, count };
  };

  const getAdvertisementsWithoutCoordinates = async (page: number, filters: FilterAdvertisements) => {
    let initRange = page == 1 ? 0 : (page - 1) * PAGE_NUMBER_COUNT;
    let query = supabaseClient
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select("*, stays(*)")
      .eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, "AVAILABLE");

    query = addFilterAdvertisement(query, filters);

    const { data, error, count } = await query.range(initRange, page * PAGE_NUMBER_COUNT - 1);
    return { data, error, count };
  };

  const removeAdvertisement = async (advertisementId: string) => {
    const query = supabaseClient
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .delete()
      .eq(ADVERTISEMENT_PROPERTIES.ID, advertisementId);

    const { data, error } = await query;
    return { data, error };
  };

  const getAdvertisementsForMainPage = async (lat: number, lng: number) => {
    let query = supabaseClient.rpc(CLOSE_ADVERTISEMENTS_TABLE_NAME, { lat, lng }).limit(4);

    const { data, error } = await query;
    return { data, error };
  };

  /* Waiting João response */
  const getSimilarAdvertisements = async () => {
    return { data: [], error: null };
  };

  /* IMAGE */

  const saveImage = async (advertisementID: string, fileName: string, file: File) => {
    const { data, error } = await supabaseClient.storage
      .from(ADVERTISEMENT_STORAGE_BUCKET)
      .upload(`${advertisementID}/${fileName}`, file, { cacheControl: "3600", upsert: false });

    if (error) {
      return { data: null, error };
    }
    return getPublicUrlFromImage(data.path);
  };

  const getPublicUrlFromImage = async (key: string) => {
    const { data } = await supabaseClient.storage.from(ADVERTISEMENT_STORAGE_BUCKET).getPublicUrl(key);
    return { data, error: null };
  };

  const removePicture = async (advertisementID: string, photoUrl: string) => {
    let dividedUrl = photoUrl.split("/");
    let avatarName = dividedUrl[dividedUrl.length - 1];
    // TODO: add access control for removal.
    const { data, error } = await supabaseClient.storage
      .from(ADVERTISEMENT_STORAGE_BUCKET)
      .remove([`${advertisementID}/${avatarName}`]);

    return { data, error };
  };

  return {
    addAdvertisement,
    updateAdvertisement,
    getSingleAdvertisement,
    getAdvertisementsFromMultipleId,
    getAdvertismentsFromUserId,
    getAdvertisementsForMainPage,
    getSimilarAdvertisements,
    getAdvertisementsByCloseCoordinatesWithFilters,
    getAdvertisementsWithoutCoordinates,
    saveImage,
    getPublicUrlFromImage,
    removePicture,
    removeAdvertisement,
  };
};

export default useAdvertisementService;
