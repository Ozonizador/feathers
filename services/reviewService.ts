import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Review, REVIEWS_TABLE_NAME, REVIEW_COLUMNS } from "../models/review";
import { v4 as uuidv4 } from "uuid";

export const addReview = async (review: Review, tenantId: string, advertisementId: string) => {
  const { data, error } = await supabaseClient
    .from<Review>(REVIEWS_TABLE_NAME)
    .insert({ ...review, updatedAt: new Date(), tenantId, advertisementId, id: uuidv4() });
  return { data, error };
};

export const getReviews = async () => {
  const { data, error } = await supabaseClient.from<Review>(REVIEWS_TABLE_NAME).select();
  return { data, error };
};

export const getReviewsByAdvertId = async (advertId: string) => {
  const { data, error } = await supabaseClient
    .from<Review>(REVIEWS_TABLE_NAME)
    .select()
    .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertId);

  return { data, error };
};
