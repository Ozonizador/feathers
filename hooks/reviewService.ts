import {
  Review,
  ReviewsResponse,
  REVIEWS_AVERAGE_TABLE_VIEW,
  REVIEWS_TABLE_NAME,
  REVIEW_COLUMNS,
} from "../models/review";
import { v4 as uuidv4 } from "uuid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useReviewService = () => {
  const supabaseClient = useSupabaseClient();

  const addReview = async (review: Omit<Review, "created_at" | "updated_at">, stay_id: string) => {
    debugger;
    const { data, error } = await supabaseClient
      .from<"reviews", ReviewsResponse>(REVIEWS_TABLE_NAME)
      .insert({ ...review, stay_id });
    debugger;
    return { data, error };
  };

  const getReviews = async () => {
    const { data, error } = await supabaseClient.from<"reviews", ReviewsResponse>(REVIEWS_TABLE_NAME).select();
    return { data, error };
  };

  const getReviewsByAdvertId = async (advertId: string) => {
    const { data, error } = await supabaseClient
      .from<"reviews", ReviewsResponse>(REVIEWS_TABLE_NAME)
      .select()
      .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertId);

    return { data, error };
  };

  const getReviewsByHostId = async (hostId: string) => {
    const { data, error } = await supabaseClient
      .from(REVIEWS_TABLE_NAME)
      .select("*, advertisement:advertisements(id,host_id), tenant:tenant_id(*)")
      .eq(REVIEW_COLUMNS.HOST_ID, hostId)
      .order(REVIEW_COLUMNS.CREATED_AT, { ascending: false });

    return { data, error };
  };

  /*
   * Average Rating Table Reviews
   */

  const getAveragesByAdvertisementId = async (advertisement_id: string) => {
    const { data, error } = await supabaseClient
      .from(REVIEWS_AVERAGE_TABLE_VIEW)
      .select()
      .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertisement_id)
      .single();

    return { data, error };
  };

  /* GET Average rating of all the ratings per host */
  const averageFromAllReviewsByHost = async (hostId: string) => {
    const { data, error } = await supabaseClient.rpc("average_rating_per_host", { host: hostId }).single();

    return { data, error };
  };

  return {
    addReview,
    getAveragesByAdvertisementId,
    getReviewsByHostId,
    getReviewsByAdvertId,
    averageFromAllReviewsByHost,
    getReviews,
  };
};

export default useReviewService;
