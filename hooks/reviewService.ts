import {
  Review,
  Reviews,
  ReviewsAverageView,
  REVIEWS_AVERAGE_TABLE_VIEW,
  REVIEWS_TABLE_NAME,
  REVIEW_COLUMNS,
} from "../models/review";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useReviewService = () => {
  const supabaseClient = useSupabaseClient();

  const addReview = async (review: Omit<Review, "created_at" | "updated_at">, reservationId: string) => {
    const { data, error } = await supabaseClient
      .from<"reviews", Reviews>(REVIEWS_TABLE_NAME)
      .insert({ ...review, reservation_id: reservationId })
      .select()
      .single();
    return { data, error };
  };

  const getReviews = async () => {
    const { data, error } = await supabaseClient.from<"reviews", Reviews>(REVIEWS_TABLE_NAME).select();
    return { data, error };
  };

  const getReviewsByAdvertId = async (advertId: string) => {
    const { data, error } = await supabaseClient
      .from<"reviews", Reviews>(REVIEWS_TABLE_NAME)
      .select()
      .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertId);

    return { data, error };
  };

  const getReviewsByHostId = async (hostId: string) => {
    const { data, error } = await supabaseClient
      .from<"reviews", Reviews>(REVIEWS_TABLE_NAME)
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
      .from<"reviewsPerAdvertisement", ReviewsAverageView>(REVIEWS_AVERAGE_TABLE_VIEW)
      .select()
      .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertisement_id)
      .single();

    return { data, error };
  };

  return {
    addReview,
    getAveragesByAdvertisementId,
    getReviewsByHostId,
    getReviewsByAdvertId,
    getReviews,
  };
};

export default useReviewService;
