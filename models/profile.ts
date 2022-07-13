export const PROFILE_TABLE_NAME = "profiles" as const;
export interface Profile {
    id: string;
    updatedAt: Date;
}

