export const REVIEWS_TABLE_NAME = "reviews" as const;

export interface Review {
    id: string;
    userId: string;
    advertId: string;
}

export const REVIEW_COLUMNS = {
    ID: "id"
} as const;