import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Review, REVIEWS_TABLE_NAME } from "../models/review";

export const addReview = async (review: Review, userId: string) => {
  const { data, error } = await supabaseClient
    .from<Review>(REVIEWS_TABLE_NAME)
    .insert({ ...review, updatedAt: new Date() });
  return { data, error };
};

export const getReviews = async (advertId: string) => {
  const { data, error } = await supabaseClient.from<Review>(REVIEWS_TABLE_NAME).select();
  return { data, error };
};
