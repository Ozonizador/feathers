export const PROFILE_TABLE_NAME = "profiles" as const;
export const AVATAR_STORAGE_NAME = "avatars" as const;

export interface Profile {
  id: string;
  slug: string;
  name: string;
  surname: string;
  nationality: string;
  town: string;
  birth_date: Date;
  gender: Gender;
  description: string;
  languages: string[];
  phone: string;
  avatar_url: string;
  favourite_rooms: string[];
  created_at: Date;
  updated_at: Date;
}

export enum Gender {
  male = 1,
  female = 2,
  other = 3,
}

export const PROFILE_COLUMNS = {
  ID: "id",
  NAME: "name",
  SURNAME: "surname",
  TOWN: "town",
  BIRTH_DATE: "birth_date",
  GENDER: "gender",
  DESCRIPTION: "description",
  PHONE: "phone",
} as const;

export enum SpokenLanguages {
  PORTUGUESE = "PORTUGUESE",
  SPANISH = "SPANISH",
  ENGLISH = "ENGLISH",
  ITALIAN = "ITALIAN",
  GREEK = "GREEK",
  FRENCH = "FRENCH",
  GERMAN = "GERMAN",
  FINNISH = "FINNISH",
}

export const LanguageLabel = {
  PORTUGUESE: "Português",
  SPANISH: "Spanish",
  ENGLISH: "English",
  ITALIAN: "Italian",
  GREEK: "Greek",
  FRENCH: "French",
  GERMAN: "German",
  FINNISH: "Finnish",
};

export type UserTypes = "LANDLORD" | "TENANT";
