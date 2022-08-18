import Advertisement from "./advertisement";
import { Profile } from "./profile";

export const REVIEWS_TABLE_NAME = "reviews" as const;
export const REVIEWS_AVERAGE_TABLE_VIEW = "reviewsPerAdvertisement" as const;

export interface Review {
  id: string;
  advertisementId: string;
  advertisment?: Advertisement;
  tenantId: string;
  tenant?: Profile;
  overallRating: number;
  locationRating: number;
  valueQualityRating: number;
  landLordRating: number;
  comoditiesRating: number;
  publicReview: string;
  privateReview: string;
  createdAt: Date;
  updatedAt: Date;
}

export const REVIEW_COLUMNS = {
  ID: "id",
  ADVERTISEMENT_ID: "advertisementId",
  TENANT_ID: "tenantId",
  OVERALL_RATING: "overallRating",
  LOCATION_RATING: "locationRating",
  LANDLORD_RATING: "landLordRating",
  VALUE_QUALITY_RATING: "valueQualityRating",
  COMODITIES_RATING: "comoditiesRating",
  PUBLIC_REVIEW: "publicReview",
  PRIVATE_REVIEW: "privateReview",
  HOST_ID: "advertisement.hostId",
  CREATED_AT: "createdAt",
} as const;

/*
 * AVERAGE RATING INTERFACE
 */

export interface AdvertisementReviewSummary {
  advertisementId: string;
  reviewNumber: number;
  overallAverage: number;
  locationAverage: number;
  valueQualityAverage: number;
  landlordAverage: number;
  comoditiesAverage: number;
}
