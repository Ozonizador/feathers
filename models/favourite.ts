export const FAVOURITES_TABLE_NAME = "favourites" as const;

export interface Favourites {
    id: string;
    userId: string,
    advertId: string
}


export const FAVOURITES_COLUMNS = {
    ID: "id",
    USER_ID: "userId",
} as const;


// check tomorrow based on prisma can be easier i guess.
