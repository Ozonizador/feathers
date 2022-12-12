import { Database } from "../database.types";

export const ADVERTISEMENT_TABLE_NAME = "advertisements" as const;
export const CLOSE_ADVERTISEMENTS_TABLE_NAME = "close_advertisements" as const;
export const ADVERTISEMENT_STORAGE_BUCKET = "advertisements" as const;

export type CloseAdvertisementsFn = Database["public"]["Functions"]["close_advertisements"];

/* MODEL */
export type Advertisements = Database["public"]["Tables"]["advertisements"];
export type Advertisement = Advertisements["Row"];

export type AdvertisementWithReviewAverage = Advertisement & {
  averages: Database["public"]["Views"]["reviewsPerAdvertisement"]["Row"];
};

export type AdvertisementWithHost = Advertisement & {
  host: Database["public"]["Tables"]["profiles"]["Row"];
};

/*
 * EXPENSES
 */
export interface HouseExpenses {
  services?: TypeExpense[];
}

export interface TypeExpense {
  name: ExpenseName;
  max?: number;
  included: Included;
}

export type Included = "INCLUDED" | "PARTIALLY" | "EXCLUDED";

/*
 * House Rules
 */
export interface HouseRules {
  smokeAllowed?: boolean;
  animalsAllowed?: boolean;
  eventsAllowed?: boolean;
  otherRules?: string;
  cleaning?: string;
}

/* Advertisement information */
export type AdvertisementInfo = {
  terms: boolean;
  politica: boolean;
  calendarUpdated: boolean;
  trustInformation: boolean;
};

/*
 * PHOTOS
 */
export type AdvertisementPhoto = {
  url: string;
  zone: HouseZones;
};

export type HouseZones = "bedroom" | "bathroom" | "livingroom" | "kitchen" | "other" | "main";

export enum HouseZonesLabel {
  "bedroom" = "Quarto",
  "bathroom" = "Casa de Banho",
  "livingroom" = "Sala de Estar",
  "kitchen" = "Cozinha",
  "other" = "Outro",
  "main" = "Capa",
}

/* ------ STRING ------ */

/* VALUES FOR DB */
export const ADVERTISEMENT_PROPERTIES = {
  MAX_ROOMS: "max_rooms",
  TYPE_FLEX_HOST: "type_flex_host",
  TYPE: "type",
  TYPE_HOST: "type_host",
  PLACE: "place",
  STREET: "street",
  STREET_NUMBER: "street_number",
  FLOOR: "floor",
  POSTAL_CODE: "postal_code",
  ROOMS: "rooms",
  BEDS: "beds",
  NUMBER_TENANT: "tenant_number",
  BATHROOMS: "bathrooms",
  TITLE: "title",
  DESCRIPTION: "description",
  PHOTOS: "photos",
  HOUSE_RULES: "house_rules",
  ABOUT_HOUSE: "about_house",
  MONTH_RENT: "month_rent",
  EXTRA_PER_HOST: "extra_per_host",
  GUARANTEE_VALUE: "guarantee_value",
  EXPENSES: "expenses",
  HOST_LIVES_PROPERTY: "host_lives_property",
  HOST: "host",
  HOST_ID: "host_id",
  AVAILABLE: "available",
  ID: "id",
  GEOM: "geom",
  STAY_START_DATE: "stay.startDate",
  STAY_END_DATE: "stay.endDate",
  SLUG: "slug",
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

export type TypeAdvertisement = Database["public"]["Enums"]["TypeRoom"];
export type HostType = Database["public"]["Enums"]["type_host"];
export type HostFlexType = Database["public"]["Enums"]["HostFlexType"];
export type AdvertisementStatus = Database["public"]["Enums"]["AdvertisementStatus"];

export enum InclusiveExpenses {
  INCLUDED = "INCLUDED",
  PARTIALLY = "PARTIALLY",
  EXCLUDED = "EXCLUDED",
}

export type ExpenseName = "GAS" | "LIGHTS" | "WATER" | "INTERNET";

/* CLEANING */
export const TYPE_CLEANING_LABELS = {
  "Limpeza Semanal": "SEMANAL",
  "Limpeza Mensal": "MENSAL",
  "Limpeza Trimestral": "TRIMESTRAL",
  "Limpeza Semestral": "SEMESTRAL",
  "Não Tem": "N/A",
};

/*
 * About house
 */

export interface AboutHouseSections {
  bathRoom: TypeAmenity[];
  bedRoom: TypeAmenity[];
  kitchen: TypeAmenity[];
  livingRoom: TypeAmenity[];
  exterior: TypeAmenity[];
  general: TypeAmenity[];
}

export type AboutHouseSpace = "livingRoom" | "bedRoom" | "kitchen" | "exterior" | "general" | "bathRoom";

export type TypeAmenity =
  | "SOFA"
  | "TV"
  | "FIREPLACE"
  | "TABLE"
  | "CHAIRS"
  | "WIFI"
  | "ELEVADOR"
  | "AIR_CONDITIONING"
  | "WASHING_MACHINE"
  | "MIRROR"
  | "FRIDGE"
  | "SINGLE_BED"
  | "DOUBLE_BED"
  | "MICROWAVE"
  | "TOASTER"
  | "COFFEE_MAKER"
  | "HEATING"
  | "IRON_BOARD"
  | "ESTENDAL"
  | "LIVING_ROOM"
  | "BALCONY"
  | "SWIMMING_POOL"
  | "PARKING_SPOT"
  | "COURTYARD"
  | "TERRACE"
  | "BARBECUE"
  | "FREEZER"
  | "OVEN"
  | "STOVE"
  | "EXAUSTOR_FAN"
  | "DRYER"
  | "BATHTUB"
  | "SHOWER"
  | "PRIVATE_BATHROOM"
  | "SHARED_BATHROOM"
  | "CUTLERY"
  | "DESK"
  | "PILLOWS"
  | "BED_SHEETS"
  | "BLACKOUTS"
  | "GARBAGE_CAN"
  | "LAUNDRY_MACHINE"
  | "MEAL_ZONE"
  | "BASIC_UTILIES"
  | "KEY_TO_LOCK_DOOR"
  | "HANGERS_SUPPORT"
  | "HOT_WATER_KETTLE"
  | "POWER_PLUG_NEAR_BED";

export const TypeAmenityLabel = {
  SOFA: "Sofa",
  TV: "TV",
  FIREPLACE: "Lareira",
  TABLE: "Mesa",
  CHAIRS: "Cadeiras",
  WIFI: "Internet",
  ELEVADOR: "Elevador",
  AIR_CONDITIONING: "Ar Condicionado",
  WASHING_MACHINE: "Maquina de Lavar Roupa",
  MIRROR: "Espelho",
  FRIDGE: "Frigorífico",
  SINGLE_BED: "Cama Single",
  DOUBLE_BED: "Cama Dupla",
  MICROWAVE: "Microondas",
  TOASTER: "Torradeira",
  COFFEE_MAKER: "Máquina de café",
  HEATING: "Aquecimento",
  IRON_BOARD: "Máquina de passar roupa",
  ESTENDAL: "Estendal",
  LIVING_ROOM: "Sala de estar",
  BALCONY: "Varanda",
  SWIMMING_POOL: "Piscina",
  PARKING_SPOT: "Lugar de parque",
  COURTYARD: "Pátio",
  TERRACE: "Terraço",
  BARBECUE: "Barbecue",
  FREEZER: "Congelador",
  OVEN: "Fogão",
  STOVE: "Forno",
  EXAUSTOR_FAN: "Exaustor",
  DRYER: "Secador",
  BATHTUB: "Banheira",
  SHOWER: "Chuveiro",
  PRIVATE_BATHROOM: "Casa de banho privada",
  SHARED_BATHROOM: "Casa de banho pública",
  CUTLERY: "Talheres",
  DESK: "Secretária",
  PILLOWS: "Almofadas",
  BED_SHEETS: "Cobertores",
  BLACKOUTS: "Cortinas blackout",
  GARBAGE_CAN: "Caixote do lixo",
  LAUNDRY_MACHINE: "Máquina de lavar",
  MEAL_ZONE: "Zona de Refeições ao ar livre",
  BASIC_UTILIES: "Utensílios básicos de cozinha (Panelas, tachos...)",
  KEY_TO_LOCK_DOOR: "Chave para trancar porta",
  HANGERS_SUPPORT: "Suporte para Cabides",
  HOT_WATER_KETTLE: "Chaleira de água quente",
  POWER_PLUG_NEAR_BED: "Tomada perto da tomada",
};

/* FOR THE SELECT ON PROCURAR */
export const SelectAmenityLabel = Object.keys(TypeAmenityLabel).map((label) => {
  return { label, value: TypeAmenityLabel[label] };
});

/* ADVERT_STATUS */

export const AboutHouseCommodities = {
  general: [
    { label: "Wifi", type: "WIFI" },
    { label: "TV", type: "TV" },
    { label: "Elevador", type: "ELEVADOR" },
    { label: "Ar condicionado", type: "AIR_CONDITIONING" },
    { label: "Máquina de Lavar Roupa", type: "LAUNDRY_MACHINE" },
    { label: "Aquecimento", type: "HEATING" },
    { label: "Ferro e tábua de Engomar", type: "IRON_BOARD" },
    { label: "Estendal para a Roupa", type: "ESTENDAL" },
    { label: "Sala de Estar", type: "LIVING_ROOM" },
    { label: "Lareira Interior", type: "FIREPLACE" },
    { label: "Casa de banho privada", type: "PRIVATE_BATHROOM" },
    { label: "Casa de banho partilhada", type: "SHARED_BATHROOM" },
  ],
  livingRoom: [
    { label: "Sofá", type: "SOFA" },
    { label: "Mesa", type: "TABLE" },
  ],
  bedRoom: [
    { label: "Cama Individual", type: "SINGLE_BED" },
    { label: "Cama Dupla", type: "DOUBLE_BED" },
    { label: "2 camas individuais", type: "ELEVADOR" },
    { label: "Roupeiro", type: "AIR_CONDITIONING" },
    { label: "Secretária", type: "DESK" },
    { label: "Televisão", type: "TV" },
    { label: "Espelho", type: "MIRROR" },
    { label: "Chave para trancar porta", type: "KEY_TO_LOCK_DOOR" },
    { label: "Suporte para Cabides", type: "HANGERS_SUPPORT" },
    { label: "Almofadas", type: "PILLOWS" },
    { label: "Roupas de Cama", type: "BED_SHEETS" },
    { label: "Tomada perto da cama", type: "POWER_PLUG_NEAR_BED" },
    { label: "Cortina/estore para escurecer quarto", type: "BLACKOUTS" },
    { label: "Baldes do Lixo ", type: "GARBAGE_CAN" },
    { label: "Varanda", type: "BALCONY" },
  ],
  bathRoom: [
    { label: "Secador de Cabelo", type: "DRYER" },
    { label: "Espelho", type: "MIRROR" },
    { label: "Banheira", type: "BATHTUB" },
    { label: "Duche", type: "SHOWER" },
  ],
  kitchen: [
    { label: "Frigorífico", type: "FRIDGE" },
    { label: "Forno", type: "OVEN" },
    { label: "Máquina de café", type: "COFFEE_MAKER" },
    { label: "Fogão", type: "STOVE" },
    { label: "Micro-Ondas", type: "MICROWAVE" },
    { label: "Torradeira", type: "TOASTER" },
    { label: "Máquina de Lavar Loiça", type: "WASHING_MACHINE" },
    { label: "Exaustor", type: "EXAUSTOR_FAN" },
    { label: "Louças e talheres", type: "CUTLERY" },
    { label: "Utensílios básicos de cozinha (Panelas, tachos...)", type: "BASIC_UTILIES" },
    { label: "Congelador", type: "FREEZER" },
    { label: "Chaleira de água quente", type: "HOT_WATER_KETTLE" },
    { label: "Mesa", type: "TABLE" },
  ],
  exterior: [
    { label: "Pátio", type: "COURTYARD" },
    { label: "Terraço", type: "TERRACE" },
    { label: "Churrasco", type: "BARBECUE" },
    { label: "Zona de Refeições ao ar livre", type: "MEAL_ZONE" },
    { label: "Piscina", type: "SWIMMING_POOL" },
    { label: "Estacionamento", type: "PARKING_SPOT" },
  ],
} as unknown as AboutHouseCommoditiesType;

type AboutHouseCommoditiesType = {
  [x in AboutHouseSpace]: [{ label: string; type: TypeAmenity }];
};
