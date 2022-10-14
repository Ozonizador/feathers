import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import { FilterAdvertisements } from "../context/ProcurarAdvertisementsProvider";
import { addFilterAdvertisement } from "../helpers/advertisementHelper";
import Advertisement, {
  AdvertisementsResponse,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_STORAGE_BUCKET,
  ADVERTISEMENT_TABLE_NAME,
  CLOSE_ADVERTISEMENTS_TABLE_NAME,
} from "../models/advertisement";
import { AdvertisementReviewSummary } from "../models/review";
import { getCorrectUrl } from "../utils/utils";

export const PAGE_NUMBER_COUNT = 10 as number;

const useAdvertisementService = () => {
  const supabaseClient = useSupabaseClient();
  const addAdvertisement = async (advertisement: Advertisement) => {
    const { data, error } = await supabaseClient
      .from<"advertisements", AdvertisementsResponse>(ADVERTISEMENT_TABLE_NAME)
      .insert({ ...advertisement, updated_at: new Date().toDateString(), id: uuidv4() })
      .single();

    return { data, error };
  };

  const updateAdvertisement = async (advertisement: Partial<Advertisement>, id: string) => {
    const { data, error } = await supabaseClient
      .from<"advertisements", AdvertisementsResponse>(ADVERTISEMENT_TABLE_NAME)
      .update({ ...advertisement, updated_at: new Date().toDateString() })
      .eq(ADVERTISEMENT_PROPERTIES.ID, id)
      .single();

    return { data, error };
  };

  const getSingleAdvertisement = async (id: string) => {
    const { data, error } = await supabaseClient
      .from<"advertisements", AdvertisementsResponse>(ADVERTISEMENT_TABLE_NAME)
      .select()
      .eq(ADVERTISEMENT_PROPERTIES.ID, id)
      .single();

    return { data, error };
  };

  const getAdvertismentsFromMultipleId = async (ids: string[]) => {
    const { data, error } = await supabaseClient
      .from<"advertisements", AdvertisementsResponse>(ADVERTISEMENT_TABLE_NAME)
      .select()
      .in(ADVERTISEMENT_PROPERTIES.ID, ids);

    return { data, error };
  };

  const getAdvertismentsFromUserId = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from<"advertisements", AdvertisementsResponse>(ADVERTISEMENT_TABLE_NAME)
      .select()
      .eq(ADVERTISEMENT_PROPERTIES.HOST_ID, userId);

    return { data, error };
  };
  const getAdvertisementsFromPlace = async (place: string) => {
    const { data, error } = await supabaseClient
      .from<"advertisements", AdvertisementsResponse>(ADVERTISEMENT_TABLE_NAME)
      .select()
      .eq(ADVERTISEMENT_PROPERTIES.PLACE, place);

    return { data, error };
  };

  /*
  Filtering
*/

  type AdvertisementWithReviewAverage = Advertisement & {
    averages: AdvertisementReviewSummary[];
  };

  const getAdvertisementsByCloseCoordinatesWithFilters = async (
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
    debugger;
    return getPublicUrlFromImage(data.path);
  };

  const getPublicUrlFromImage = async (key: string) => {
    const { data } = await supabaseClient.storage.from(ADVERTISEMENT_STORAGE_BUCKET).getPublicUrl(getCorrectUrl(key));
    debugger;
    return { data, error: null };
  };

  const removePicture = async (advertisementID: string, photoUrl: string) => {
    let dividedUrl = photoUrl.split("/");
    let avatarName = dividedUrl[dividedUrl.length - 1];
    const { data, error } = await supabaseClient.storage
      .from(ADVERTISEMENT_STORAGE_BUCKET)
      .remove([`${advertisementID}/${avatarName}`]);

    return { data, error };
  };

  return {
    addAdvertisement,
    updateAdvertisement,
    getSingleAdvertisement,
    getAdvertismentsFromMultipleId,
    getAdvertismentsFromUserId,
    getAdvertisementsForMainPage,
    getSimilarAdvertisements,
    getAdvertisementsFromPlace,
    getAdvertisementsByCloseCoordinatesWithFilters,
    saveImage,
    getPublicUrlFromImage,
    removePicture,
  };
};

export default useAdvertisementService;
