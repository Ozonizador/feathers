export const REVIEWS_TABLE_NAME = "reviews" as const;

export interface Review {
  id: string;
  advertisementId: string;
  tenantId: string;
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
} as const;
