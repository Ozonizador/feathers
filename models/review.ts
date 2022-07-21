export const REVIEWS_TABLE_NAME = "reviews" as const;

export interface Review {
    id: string;
    advertisementId: string;
    tenantId: string;
    overallRating: number;
    locationRating:     number;
    valueQualityRating: number;
    landLordRating:     number;
    comoditiesRating:   number;
    publicReview: string;
    privateReview: string;
    createdAt:     Date;
    updatedAt: Date;
}

export const REVIEW_COLUMNS = {
    ID: "id"
} as const;

