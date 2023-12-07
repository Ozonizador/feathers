import { useTranslation } from "next-i18next";
import { Database } from "../database.types";
import _ from "lodash";

export const PROFILE_TABLE_NAME = "profiles" as const;
export const AVATAR_STORAGE_NAME = "avatars" as const;
export const DEACTIVATE_TABLE_NAME = "deactivation" as const;
export const PAYMENT_METHODS_TABLE_NAME = "payment_methods" as const;

export type ProfilesResponse = Database["public"]["Tables"]["profiles"];
export type DeactivationResponse = Database["public"]["Tables"]["deactivation"];
export type Profile = ProfilesResponse["Row"];
export type UserTypes = Database["public"]["Enums"]["profiletype"];
export type PaymentMethods = Database["public"]["Tables"]["payment_methods"];
export type PaymentMethod = PaymentMethods["Row"];

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


export const DEACTIVATION_COLUMNS = {
  ID: "id",
  REASON: "reason"
} as const;

export const spokenLanguages = ["portuguese", "spanish", "english", "italian", "greek", "french", "german", "finnish"];

export type SpokenLanguage = (typeof spokenLanguages)[number];

export const LanguageLabel = {
  portuguese: "languages:portuguese",
  spanish: "languages:spanish",
  english: "languages:english",
  italian: "languages:italian",
  greek: "languages:greek",
  french: "languages:french",
  german: "languages:german",
  finnish: "languages:finnish",
};

export const getSpokenLanguages = () => {
  const {t} = useTranslation();
  return spokenLanguages.map((language) => {
    const label = LanguageLabel[language as keyof typeof LanguageLabel] || _.capitalize(language);
    return { label: t(label), value: language };
  });
};
