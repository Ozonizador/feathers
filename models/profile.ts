export const PROFILE_TABLE_NAME = "profiles" as const;
export interface Profile {
  id: string;
  name: string;
  surname: string;
  nationality: string;
  town: string;
  birthDate: Date;
  gender: Gender;
  updatedAt: Date;
  description: string;
  languages: string[];
  phone: string;
  avatarUrl: string;
  favouriteRooms: string[];
}

enum Gender {
  male = 1,
  female = 2,
}

export const PROFILE_COLUMNS = {
  ID: "id",
} as const;
