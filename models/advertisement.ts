import { Stay } from "@prisma/client";
import { Profile } from "./profile";
import { AdvertisementReviewSummary, Review } from "./review";
import { StayDates } from "./stay";

export const ADVERTISEMENT_TABLE_NAME = "advertisements" as const;
export const ADVERTISEMENT_STORAGE_BUCKET = "advertisements" as const;
/* MODEL */
export type Advertisement = {
  id?: string;
  typeFlexHost: FlexHostType;
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
  hostId: string;
  host?: Profile;
  createdAt?: Date;
  updatedAt?: Date;
  available: AdvertisementStatus;
  geo?: any;

  // foreign keys
  reviews?: Review[];
};

// With advertisement averages
export type AdvertisementWithReviewAverage = Advertisement & {
  averages: AdvertisementReviewSummary[];
  stay: StayDates;
  "stay.startDate": Date;
  "stay.endDate": Date;
};

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
  STAY_START_DATE: "stay.startDate",
  STAY_END_DATE: "stay.endDate",
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
  ENTIRE_SPACE: "Apartamento Inteiro",
  SHARED_ROOM: "Quarto Partilhado",
  PRIVATE_ROOM: "Quarto Privado",
};

export enum HOST_TYPE {
  PROFISSIONAL = "PROFISSIONAL",
  PARTICULAR = "PARTICULAR",
}

export enum FlexHostType {
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
  bathRoom: TypeAmenity[];
  bedRoom: TypeAmenity[];
  kitchen: TypeAmenity[];
  livingRoom: TypeAmenity[];
  exterior: TypeAmenity[];
  general: TypeAmenity[];
}

export type AboutHouseSpace = "livingRoom" | "bedRoom" | "kitchen" | "exterior" | "general" | "bathRoom";

export enum TypeAmenity {
  SOFA = "SOFA",
  TV = "TV",
  FIREPLACE = "FIREPLACE",
  TABLE = "TABLE",
  CHAIRS = "CHAIRS",
  WIFI = "WIFI",
  ELEVADOR = "ELEVADOR",
  AIR_CONDITIONING = "AIR_CONDITIONING",
  WASHING_MACHINE = "WASHING_MACHINE",
  MIRROR = "MIRROR",
  FRIDGE = "FRIDGE",
  SINGLE_BED = "SINGLE_BED",
  DOUBLE_BED = "DOUBLE_BED",
  MICROWAVE = "MICROWAVE",
  TOASTER = "TOASTER",
  COFFEE_MAKER = "COFFEE_MAKER",
  HEATING = "HEATING",
  IRON_BOARD = "IRON_BOARD",
  ESTENDAL = "ESTENDAL",
  LIVING_ROOM = "LIVING_ROOM",
  BALCONY = "BALCONY",
  SWIMMING_POOL = "SWIMMING_POOL",
  PARKING_SPOT = "PARKING_SPOT",
  COURTYARD = "COURTYARD",
  TERRACE = "TERRACE",
  BARBECUE = "BARBECUE",
  FREEZER = "FREEZER",
  OVEN = "OVEN",
  STOVE = "STOVE",
  EXAUSTOR_FAN = "EXAUSTOR_FAN",
  DRYER = "DRYER",
  BATHTUB = "BATHTUB",
  SHOWER = "SHOWER",
  PRIVATE_BATHROOM = "PRIVATE_BATHROOM",
  SHARED_BATHROOM = "SHARED_BATHROOM",
  CUTLERY = "CUTLERY",
  DESK = "DESK",
  PILLOWS = "PILLOWS",
  BED_SHEETS = "BED_SHEETS",
  BLACKOUTS = "BLACKOUTS",
  GARBAGE_CAN = "GARBAGE_CAN",
  LAUNDRY_MACHINE = "LAUNDRY_MACHINE",
  MEAL_ZONE = "MEAL_ZONE",
  BASIC_UTILIES = "BASIC_UTILIES",
  KEY_TO_LOCK_DOOR = "KEY_TO_LOCK_DOOR",
  HANGERS_SUPPORT = "HANGERS_SUPPORT",
  HOT_WATER_KETTLE = "HOT_WATER_KETTLE",
  POWER_PLUG_NEAR_BED = "POWER_PLUG_NEAR_BED",
}

export const TypeAmenityLabel = [
  { value: TypeAmenity.SOFA, label: "Sofa" },
  { value: TypeAmenity.TV, label: "TV" },
  { value: TypeAmenity.FIREPLACE, label: "Lareira" },
  { value: TypeAmenity.TABLE, label: "Mesa" },
  { value: TypeAmenity.CHAIRS, label: "Cadeiras" },
  { value: TypeAmenity.WIFI, label: "Internet" },
  { value: TypeAmenity.ELEVADOR, label: "Elevador" },
  { value: TypeAmenity.AIR_CONDITIONING, label: "Ar Condicionado" },
  { value: TypeAmenity.WASHING_MACHINE, label: "Maquina de Lavar Roupa" },
  { value: TypeAmenity.MIRROR, label: "Espelho" },
  { value: TypeAmenity.FRIDGE, label: "Frigorífico" },
  { value: TypeAmenity.SINGLE_BED, label: "Cama Single" },
  { value: TypeAmenity.DOUBLE_BED, label: "Cama Dupla" },
  { value: TypeAmenity.MICROWAVE, label: "Microondas" },
  { value: TypeAmenity.TOASTER, label: "Torradeira" },
  { value: TypeAmenity.COFFEE_MAKER, label: "Máquina de café" },
  { value: TypeAmenity.HEATING, label: "Aquecimento" },
  { value: TypeAmenity.IRON_BOARD, label: "Máquina de passar roupa" },
  { value: TypeAmenity.ESTENDAL, label: "Estendal" },
  { value: TypeAmenity.LIVING_ROOM, label: "Sala de estar" },
  { value: TypeAmenity.BALCONY, label: "Varanda" },
  { value: TypeAmenity.SWIMMING_POOL, label: "Piscina" },
  { value: TypeAmenity.PARKING_SPOT, label: "Lugar de parque" },
  { value: TypeAmenity.COURTYARD, label: "Pátio" },
  { value: TypeAmenity.TERRACE, label: "Terraço" },
  { value: TypeAmenity.BARBECUE, label: "Barbecue" },
  { value: TypeAmenity.FREEZER, label: "Congelador" },
  { value: TypeAmenity.OVEN, label: "Fogão" },
  { value: TypeAmenity.STOVE, label: "Forno" },
  { value: TypeAmenity.EXAUSTOR_FAN, label: "Exaustor" },
  { value: TypeAmenity.DRYER, label: "Secador" },
  { value: TypeAmenity.BATHTUB, label: "Banheira" },
  { value: TypeAmenity.SHOWER, label: "Chuveiro" },
  { value: TypeAmenity.PRIVATE_BATHROOM, label: "Casa de banho privada" },
  { value: TypeAmenity.SHARED_BATHROOM, label: "Casa de banho pública" },
  { value: TypeAmenity.CUTLERY, label: "Talheres" },
  { value: TypeAmenity.DESK, label: "Secretária" },
  { value: TypeAmenity.PILLOWS, label: "Almofadas" },
  { value: TypeAmenity.BED_SHEETS, label: "BED_SHEETS" },
  { value: TypeAmenity.BLACKOUTS, label: "Cortinas blackout" },
  { value: TypeAmenity.GARBAGE_CAN, label: "Caixote do lixo" },
  { value: TypeAmenity.LAUNDRY_MACHINE, label: "Máquina de lavar" },
  { value: TypeAmenity.MEAL_ZONE, label: "Zona de Refeições ao ar livre" },
  { value: TypeAmenity.BASIC_UTILIES, label: "Utensílios básicos de cozinha (Panelas, tachos...)" },
  { value: TypeAmenity.KEY_TO_LOCK_DOOR, label: "Chave para trancar porta" },
  { value: TypeAmenity.HANGERS_SUPPORT, label: "Suporte para Cabides" },
  { value: TypeAmenity.HOT_WATER_KETTLE, label: "Chaleira de água quente" },
  { value: TypeAmenity.POWER_PLUG_NEAR_BED, label: "Tomada perto da tomada" },
];

/* ADVERT_STATUS */

export enum AdvertisementStatus {
  AVAILABLE = "AVAILABLE",
  DISABLED = "DISABLED",
  NOT_AVAILABLE = "NOT_AVAILABLE",
}

export const AboutHouseCommodities = {
  general: [
    { label: "Wifi", type: TypeAmenity.WIFI },
    { label: "TV", type: TypeAmenity.TV },
    { label: "Elevador", type: TypeAmenity.ELEVADOR },
    { label: "Ar condicionado", type: TypeAmenity.AIR_CONDITIONING },
    { label: "Máquina de Lavar Roupa", type: TypeAmenity.LAUNDRY_MACHINE },
    { label: "Aquecimento", type: TypeAmenity.HEATING },
    { label: "Ferro e tábua de Engomar", type: TypeAmenity.IRON_BOARD },
    { label: "Estendal para a Roupa", type: TypeAmenity.ESTENDAL },
    { label: "Sala de Estar", type: TypeAmenity.LIVING_ROOM },
    { label: "Lareira Interior", type: TypeAmenity.FIREPLACE },
    { label: "Casa de banho privada", type: TypeAmenity.PRIVATE_BATHROOM },
    { label: "Casa de banho partilhada", type: TypeAmenity.SHARED_BATHROOM },
  ],
  livingRoom: [
    { label: "Sofá", type: TypeAmenity.SOFA },
    { label: "Mesa", type: TypeAmenity.TABLE },
  ],
  bedRoom: [
    { label: "Cama Individual", type: TypeAmenity.SINGLE_BED },
    { label: "Cama Dupla", type: TypeAmenity.DOUBLE_BED },
    { label: "2 camas individuais", type: TypeAmenity.ELEVADOR },
    { label: "Roupeiro", type: TypeAmenity.AIR_CONDITIONING },
    { label: "Secretária", type: TypeAmenity.DESK },
    { label: "Televisão", type: TypeAmenity.TV },
    { label: "Espelho", type: TypeAmenity.MIRROR },
    { label: "Chave para trancar porta", type: TypeAmenity.KEY_TO_LOCK_DOOR },
    { label: "Suporte para Cabides", type: TypeAmenity.HANGERS_SUPPORT },
    { label: "Almofadas", type: TypeAmenity.PILLOWS },
    { label: "Roupas de Cama", type: TypeAmenity.BED_SHEETS },
    { label: "Tomada perto da cama", type: TypeAmenity.POWER_PLUG_NEAR_BED },
    { label: "Cortina/estore para escurecer quarto", type: TypeAmenity.BLACKOUTS },
    { label: "Baldes do Lixo ", type: TypeAmenity.GARBAGE_CAN },
    { label: "Varanda", type: TypeAmenity.BALCONY },
  ],
  bathRoom: [
    { label: "Secador de Cabelo", type: TypeAmenity.DRYER },
    { label: "Espelho", type: TypeAmenity.MIRROR },
    { label: "Banheira", type: TypeAmenity.BATHTUB },
    { label: "Duche", type: TypeAmenity.SHOWER },
  ],
  kitchen: [
    { label: "Frigorífico", type: TypeAmenity.FRIDGE },
    { label: "Forno", type: TypeAmenity.OVEN },
    { label: "Máquina de café", type: TypeAmenity.COFFEE_MAKER },
    { label: "Fogão", type: TypeAmenity.STOVE },
    { label: "Micro-Ondas", type: TypeAmenity.MICROWAVE },
    { label: "Torradeira", type: TypeAmenity.TOASTER },
    { label: "Máquina de Lavar Loiça", type: TypeAmenity.WASHING_MACHINE },
    { label: "Exaustor", type: TypeAmenity.EXAUSTOR_FAN },
    { label: "Louças e talheres", type: TypeAmenity.CUTLERY },
    { label: "Utensílios básicos de cozinha (Panelas, tachos...)", type: TypeAmenity.BASIC_UTILIES },
    { label: "Congelador", type: TypeAmenity.FREEZER },
    { label: "Chaleira de água quente", type: TypeAmenity.HOT_WATER_KETTLE },
    { label: "Mesa", type: TypeAmenity.TABLE },
  ],
  exterior: [
    { label: "Pátio", type: TypeAmenity.COURTYARD },
    { label: "Terraço", type: TypeAmenity.TERRACE },
    { label: "Churrasco", type: TypeAmenity.BARBECUE },
    { label: "Zona de Refeições ao ar livre", type: TypeAmenity.MEAL_ZONE },
    { label: "Piscina", type: TypeAmenity.SWIMMING_POOL },
    { label: "Estacionamento", type: TypeAmenity.PARKING_SPOT },
  ],
};

export default Advertisement;
