import { Review } from "./review";
import { JSONValue } from "./utils";

export const ADVERTISEMENT_TABLE_NAME = "advertisements" as const;
export const ADVERTISEMENT_STORAGE_BUCKET = "advertisements" as const;
/* MODEL */
export default interface Advertisement {
  id?: string;
  typeFlexHost: "SUPER_FLEX" | "FLEX" | "MODERATE" | "RIGID";
  place: string;
  street: string;
  streetNumber: string;
  floor?: string;
  postalCode: string;
  rooms: number;
  beds: number;
  tenantNumber: number;
  bathrooms: number;
  title: string;
  description: string;
  type: "ENTIRE_SPACE" | "SHARED_ROOM" | "PRIVATE_ROOM";
  typeHost: "PROFISSIONAL" | "PARTICULAR";
  photos?: string[];
  houseRules: HouseRules;
  aboutHouse: AboutHouseSections;
  monthRent: number;
  extraPerHost: number;
  guaranteeValue: number;
  expenses: HouseExpenses;
  hostLivesProperty: Boolean;
  host?: string;
  createdAt?: Date;
  updatedAt?: Date;
  available: AdvertisementStatus;

  // foreign keys
  reviews?: Review[];
}

export interface HouseExpenses {
  inclusive?: "INCLUDED" | "PARTIALLY" | "EXCLUDED";
  servicesIncluded?: EXPENSES_TYPE[];
  servicesExcluded?: EXPENSES_TYPE[];
}

export interface HouseRules {
  smokeAllowed?: boolean;
  animalsAllowed?: boolean;
  eventsAllowed?: boolean;
  otherRules?: string;
  cleaning?: string;
}

/* ------ STRING ------ */

/* VALUES FOR DB */
export const ADVERTISEMENT_PROPERTIES = {
  TYPE_FLEX_HOST: "typeFlexHost",
  TYPE: "type",
  TYPE_HOST: "typeHost",
  PLACE: "place",
  STREET: "street",
  STREET_NUMBER: "streetNumber",
  FLOOR: "floor",
  POSTAL_CODE: "postalCode",
  ROOMS: "rooms",
  BEDS: "beds",
  NUMBER_TENANT: "tenantNumber",
  BATHROOMS: "bathrooms",
  TITLE: "title",
  DESCRIPTION: "description",
  PHOTOS: "photos",
  HOUSE_RULES: "houseRules",
  ABOUT_HOUSE: "aboutHouse",
  MONTH_RENT: "monthRent",
  EXTRA_PER_HOST: "extraPerHost",
  GUARANTEE_VALUE: "guaranteeValue",
  EXPENSES: "expenses",
  HOST_LIVES_PROPERTY: "hostLivesProperty",
  HOST: "host",
  HOST_ID: "hostId",
  AVAILABLE: "available",
  ID: "id",
} as const;

export const HOUSE_RULES_NAMING = {
  SMOKE_ALLOWED: "smokeAllowed",
  ANIMALS_ALLOWED: "animalsAllowed",
  EVENTS_ALLOWED: "eventsAllowed",
  OTHER_RULES: "otherRules",
  CLEANING: "cleaning",
};

/* ENUMS */
export const TYPE_ADVERTISEMENT = {
  "Apartamento Inteiro": "ENTIRE_SPACE",
  "Quarto Partilhado": "SHARED_ROOM",
  "Quarto Privado": "PRIVATE_ROOM",
};

export enum HOST_TYPE {
  PROFISSIONAL = "PROFISSIONAL",
  PARTICULAR = "PARTICULAR",
}

export enum FLEX_HOST_TYPE {
  SUPER_FLEX = "SUPER_FLEX",
  FLEX = "FLEX",
  MODERATE = "MODERATE",
  RIGID = "RIGID",
}

export enum INCLUSIVE_EXPENSES {
  INCLUDED = "INCLUDED",
  PARTIALLY = "PARTIALLY",
  EXCLUDED = "EXCLUDED",
}

export enum EXPENSES_TYPE {
  GAS = "GAS",
  LIGHTS = "LIGHTS",
  WATER = "WATER",
  INTERNET = "INTERNET",
}

/* CLEANING */
export const TYPE_CLEANING_LABELS = {
  "Limpeza Semanal": "SEMANAL",
  "Limpeza Mensal": "MENSAL",
  "Limpeza Trimestral": "TRIMESTRAL",
  "Limpeza Semestral": "SEMESTRAL",
  "Não Tem": "N/A",
};

export enum CLEANING_TYPE {
  TRIMESTRAL = "TRIMESTRAL",
  SEMESTRAL = "SEMESTRAL",
}

/* Some namings */
export const EXPENSES_TO_TEXT = {
  INCLUDED: "Despesas incluídas",
  PARTIALLY: "Despesas partialmente incluídas",
  EXCLUDED: "Despesas excluídas",
};

/* About house */

export interface AboutHouseSections {
  livingRoom: Amenity[];
  bedRoom: Amenity[];
  kitchen: Amenity[];
  exterior: Amenity[];
}

export interface Amenity {
  available: boolean;
  type: TypeAmenity;
}

export type AboutHouseSpace = "livingRoom" | "bedRoom" | "kitchen" | "exterior";

export enum TypeAmenity {
  SOFA = "SOFA",
  TV = "TV",
  FIREPLACE = "FIREPLACE",
  TABLE = "TABLE",
  CHAIRS = "CHAIRS",
}

/* ADVERT_STATUS */

export enum AdvertisementStatus {
  AVAILABLE = "AVAILABLE",
  DISABLED = "DISABLED",
  NOT_AVAILABLE = "NOT_AVAILABLE",
}
