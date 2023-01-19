import { Database } from "../database.types";
import { Advertisement } from "./advertisement";
import { Profile } from "./profile";

export const REVIEWS_TABLE_NAME = "reviews" as const;
export const REVIEWS_AVERAGE_TABLE_VIEW = "reviewsPerAdvertisement" as const;

export type ReviewsResponse = Database["public"]["Tables"]["reviews"];
export type Review = ReviewsResponse["Row"];

export type ReviewWithTenantAndAdvertisement = Review & {
  advertisment: Advertisement;
  tenant: Partial<Profile>;
  "advertisements.host_id": string;
};

export const REVIEW_COLUMNS = {
  ID: "id",
  ADVERTISEMENT_ID: "advertisement_id",
  TENANT_ID: "tenant_id",
  OVERALL_RATING: "overall_rating",
  LOCATION_RATING: "location_rating",
  LANDLORD_RATING: "landlord_rating",
  VALUE_QUALITY_RATING: "value_quality_rating",
  COMODITIES_RATING: "comodities_rating",
  PUBLIC_REVIEW: "public_review",
  PRIVATE_REVIEW: "private_review",
  HOST_ID: "advertisements.host_id",
  CREATED_AT: "created_at",
} as const;

/*
 * AVERAGE RATING INTERFACE
 */

export interface AdvertisementReviewSummary {
  advertisement_id: string;
  review_number: number;
  overall_average: number;
  location_average: number;
  value_quality_average: number;
  landlord_average: number;
  comodities_average: number;
}
