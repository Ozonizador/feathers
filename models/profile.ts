import { Database } from "../database.types";
import _ from "lodash";

export const PROFILE_TABLE_NAME = "profiles" as const;
export const AVATAR_STORAGE_NAME = "avatars" as const;

export type ProfilesResponse = Database["public"]["Tables"]["profiles"];
export type Profile = ProfilesResponse["Row"];
export type UserTypes = Database["public"]["Enums"]["profiletype"];

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
  SLUG: "slug",
} as const;

export const spokenLanguages = ["portuguese", "spanish", "english", "italian", "greek", "french", "german", "finnish"];

export type SpokenLanguage = (typeof spokenLanguages)[number];

export const LanguageLabel = {
  portuguese: "Português",
  spanish: "Spanish",
  english: "English",
  italian: "Italian",
  greek: "Greek",
  french: "French",
  german: "German",
  finnish: "Finnish",
};

export const getSpokenLanguages = () => {
  return spokenLanguages.map((language) => {
    const label = LanguageLabel[language as keyof typeof LanguageLabel] || _.capitalize(language);
    return { label, value: language };
  });
};
