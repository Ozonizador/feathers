import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  AdvertisementReviewSummary,
  Review,
  REVIEWS_AVERAGE_TABLE_VIEW,
  REVIEWS_TABLE_NAME,
  REVIEW_COLUMNS,
} from "../models/review";
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

export const getReviewsByHostId = async (hostId: string) => {
  const { data, error } = await supabaseClient
    .from(REVIEWS_TABLE_NAME)
    .select("*, advertisement:advertisements(id,hostId), tenant:tenantId(*)")
    .eq(REVIEW_COLUMNS.HOST_ID, hostId)
    .order(REVIEW_COLUMNS.CREATED_AT, { ascending: false });

  return { data, error };
};

/*
 * Average Rating Table Reviews
 */

export const getAveragesByAdvertisementId = async (advertisementId: string) => {
  const { data, error } = await supabaseClient
    .from<AdvertisementReviewSummary>(REVIEWS_AVERAGE_TABLE_VIEW)
    .select()
    .eq(REVIEW_COLUMNS.ADVERTISEMENT_ID, advertisementId)
    .single();

  return { data, error };
};

/* GET Average rating of all the ratings per host */
export const averageFromAllReviewsByHost = async (hostId: string) => {
  const { data, error } = await supabaseClient.rpc<number>("average_rating_per_host", { host: hostId }).single();

  return { data, error };
};
