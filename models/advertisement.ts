import { Database } from "../database.types";
import { ReservationWithPublicReview } from "./reservation";
import { ReviewsAverage } from "./review";

// TODO: change the advertisements to listings because of adblocker
// - https://www.alibabacloud.com/help/en/object-storage-service/latest/what-do-i-do-if-typeerror-failed-to-fetch-is-displayed

/* MODEL */
export type Advertisements = Database["public"]["Tables"]["advertisements"];
export type Advertisement = Advertisements["Row"];

export const ADVERTISEMENT_TABLE_NAME = "advertisements" as const;

/**
 * VIEWS
 */

export const ADVERTISEMENT_TABLE_AGREGATED_AMENITIES_NAME = "advertisements_agg_amenities" as const;
export type AdvertisementAggregateView = Database["public"]["Views"]["advertisements_agg_amenities"];
export type AdvertisementWithAggregatedAmenities = AdvertisementAggregateView["Row"];

/**
 * Close Advertisement RPC
 */
export const CLOSE_ADVERTISEMENTS_TABLE_NAME = "close_advertisements" as const;
export type CloseAdvertisementsFn = Database["public"]["Functions"]["close_advertisements"];
export type CloseAdvertisement = Database["public"]["Functions"]["close_advertisements"]["Returns"];

// STORAGE
export const ADVERTISEMENT_STORAGE_BUCKET = "advertisements" as const;

export type AdvertisementWithReviewAverage = Advertisement & {
  averages: ReviewsAverage[];
};

export type AdvertisementComplete = Advertisement & {
  host: Database["public"]["Tables"]["profiles"]["Row"];
  stays: ReservationWithPublicReview[];
};

/*
 * EXPENSES
 */
export interface HouseExpenses {
  inclusive: Included;
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

export type HouseZones = "bedroom" | "bathroom" | "livingroom" | "kitchen" | "other" | "main" ;

export enum HouseZonesLabel {
  "bedroom" = "advertisements:zones.bedroom",
  "bathroom" = "advertisements:zones.bathroom",
  "livingroom" = "advertisements:zones.livingroom",
  "kitchen" = "advertisements:zones.kitchen",
  "other" = "advertisements:zones.other",
  "main" = "advertisements:zones.main",
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
  SLUG: "slug",
  CREATED_AT: "created_at",
  LIVINGROOM_AMENITIES: "livingroom_amenities",
  BEDROOM_AMENITIES: "bedroom_amenities",
  BATHROOM_AMENITIES: "bathroom_amenities",
  EXTERIOR_AMENITIES: "exterior_amenities",
  GENERAL_AMENITIES: "general_amenities",
  KITCHEN_AMENITIES: "kitchen_amenities",
  AMENITIES: "amenities",
  VERIFIED: "verified",
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
  ENTIRE_SPACE: "advertisements:type.entire_place",
  SHARED_ROOM: "advertisements:type.shared_room",
  PRIVATE_ROOM: "advertisements:type.private_room",
} as const;

export type TypeAdvertisement = Database["public"]["Enums"]["TypeRoom"];
export type HostType = Database["public"]["Enums"]["type_host"];
export type HostFlexType = Database["public"]["Enums"]["HostFlexType"];
export type AdvertisementStatus = Database["public"]["Enums"]["AdvertisementStatus"];

export enum InclusiveExpenses {
  INCLUDED = "INCLUDED",
  PARTIALLY = "PARTIALLY",
  EXCLUDED = "EXCLUDED",
}

export const AMENITIES_DB = {
  livingroom: "livingroom_amenities",
  bathroom: "bathroom_amenities",
  kitchen: "kitchen_amenities",
  general: "general_amenities",
  exterior: "exterior_amenities",
  bedroom: "bedroom_amenities",
} as unknown as {
  [x: AboutHouseSpace]:
    | "livingroom_amenities"
    | "bathroom_amenities"
    | "general_amenities"
    | "bathroom_amenities"
    | "bedroom_amenities"
    | "kitchen_amenities";
};

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

export const AMENITIES = [
  "SOFA",
  "TV",
  "FIREPLACE",
  "TABLE",
  "CHAIRS",
  "WIFI",
  "ELEVADOR",
  "AIR_CONDITIONING",
  "WASHING_MACHINE",
  "MIRROR",
  "FRIDGE",
  "SINGLE_BED",
  "DOUBLE_BED",
  "MICROWAVE",
  "TOASTER",
  "COFFEE_MAKER",
  "HEATING",
  "IRON_BOARD",
  "ESTENDAL",
  "LIVING_ROOM",
  "BALCONY",
  "SWIMMING_POOL",
  "PARKING_SPOT",
  "COURTYARD",
  "TERRACE",
  "BARBECUE",
  "FREEZER",
  "OVEN",
  "STOVE",
  "EXAUSTOR_FAN",
  "DRYER",
  "BATHTUB",
  "SHOWER",
  "PRIVATE_BATHROOM",
  "SHARED_BATHROOM",
  "CUTLERY",
  "DESK",
  "PILLOWS",
  "BED_SHEETS",
  "BLACKOUTS",
  "GARBAGE_CAN",
  "LAUNDRY_MACHINE",
  "CLOSET",
  "MEAL_ZONE",
  "BASIC_UTILITIES",
  "KEY_TO_LOCK_DOOR",
  "HANGERS_SUPPORT",
  "HOT_WATER_KETTLE",
  "POWER_PLUG_NEAR_BED",
  "TWO_BEDS",
  "TOWELS",
  "BED_LINEN"
] as const;

export type Amenity = typeof AMENITIES;
export type TypeAmenity = Amenity[number];

export const TypeAmenityLabel = {
  SOFA: "amenities:sofa",
  CLOSET: "amenities:closet",
  TV: "amenities:tv",
  FIREPLACE: "amenities:fireplace",
  TABLE: "amenities:table",
  CHAIRS: "amenities:chairs",
  WIFI: "amenities:wifi",
  ELEVADOR: "amenities:elevator",
  AIR_CONDITIONING: "amenities:air_conditioning",
  WASHING_MACHINE: "amenities:washing_machine",
  MIRROR: "amenities:mirror",
  FRIDGE: "amenities:fridge",
  SINGLE_BED: "amenities:single_bed",
  DOUBLE_BED: "amenities:double_bed",
  MICROWAVE: "amenities:microwave",
  TOASTER: "amenities:toaster",
  COFFEE_MAKER: "amenities:coffee_maker",
  HEATING: "amenities:heating",
  IRON_BOARD: "amenities:iron_board",
  ESTENDAL: "amenities:clothesline",
  LIVING_ROOM: "amenities:living_room",
  BALCONY: "amenities:balcony",
  SWIMMING_POOL: "amenities:swimming_pool",
  PARKING_SPOT: "amenities:parking_spot",
  COURTYARD: "amenities:courtyard",
  TERRACE: "amenities:terrace",
  BARBECUE: "amenities:barbecue",
  FREEZER: "amenities:freezer",
  OVEN: "amenities:oven",
  STOVE: "amenities:stove",
  EXAUSTOR_FAN: "amenities:exaustor_fan",
  DRYER: "amenities:dryer",
  BATHTUB: "amenities:bathtub",
  SHOWER: "amenities:shower",
  PRIVATE_BATHROOM: "amenities:private_bathroom",
  SHARED_BATHROOM: "amenities:shared_bathroom",
  CUTLERY: "amenities:cutlery",
  DESK: "amenities:desk",
  PILLOWS: "amenities:pillows",
  BED_SHEETS: "amenities:bed_sheets",
  BLACKOUTS: "amenities:blackouts",
  GARBAGE_CAN: "amenities:garbage_can",
  LAUNDRY_MACHINE: "amenities:laundry_machine",
  MEAL_ZONE: "amenities:meal_zone",
  BASIC_UTILITIES: "amenities:basic_utilities",
  TOWELS: "amenities:towels",
  KEY_TO_LOCK_DOOR: "amenities:key_to_lock_door",
  HANGERS_SUPPORT: "amenities:hangers_support",
  HOT_WATER_KETTLE: "amenities:hot_water_kettle",
  POWER_PLUG_NEAR_BED: "amenities:power_plug_near_bed",
  TWO_BEDS: "amenities:two_beds",
  BED_LINEN: "amenities:bed_linen"
} as const;

/* FOR THE SELECT ON PROCURAR */
export const SelectAmenityLabel = Object.keys(TypeAmenityLabel).map((value) => {
  return { label: TypeAmenityLabel[value as keyof typeof TypeAmenityLabel], value };
});

/* ADVERT_STATUS */

export const AboutHouseCommodities = {
  general: [
    { type: "WIFI" },
    { type: "TV" },
    { type: "ELEVADOR" },
    { type: "AIR_CONDITIONING" },
    { type: "LAUNDRY_MACHINE" },
    { type: "HEATING" },
    { type: "IRON_BOARD" },
    { type: "ESTENDAL" },
    { type: "LIVING_ROOM" },
    { type: "FIREPLACE" },
    { type: "SOFA" },
    { type: "TABLE" },
    { type: "BED_LINEN"}
  ],
  bedroom: [
    { type: "SINGLE_BED" },
    { type: "DOUBLE_BED" },
    { type: "TWO_BEDS" },
    { type: "CLOSET" },
    { type: "DESK" },
    { type: "TV" },
    { type: "MIRROR" },
    { type: "KEY_TO_LOCK_DOOR" },
    { type: "HANGERS_SUPPORT" },
    { type: "PILLOWS" },
    { type: "BED_SHEETS" },
    { type: "POWER_PLUG_NEAR_BED" },
    { type: "BLACKOUTS" },
    { type: "GARBAGE_CAN" },
    { type: "BALCONY" },
  ],
  bathroom: [
    { type: "PRIVATE_BATHROOM" },
    { type: "SHARED_BATHROOM" },
    { type: "DRYER" },
    { type: "MIRROR" },
    { type: "BATHTUB" },
    { type: "SHOWER" },
    { type: "TOWELS" }
  ],
  kitchen: [
    { type: "FRIDGE" },
    { type: "OVEN" },
    { type: "COFFEE_MAKER" },
    { type: "STOVE" },
    { type: "MICROWAVE" },
    { type: "TOASTER" },
    { type: "WASHING_MACHINE" },
    { type: "EXAUSTOR_FAN" },
    { type: "CUTLERY" },
    { type: "BASIC_UTILITIES" },
    { type: "FREEZER" },
    { type: "HOT_WATER_KETTLE" },
    { type: "TABLE" },
  ],
  exterior: [
    { type: "TERRACE" },
    { type: "BARBECUE" },
    { type: "MEAL_ZONE" },
    { type: "SWIMMING_POOL" },
    { type: "PARKING_SPOT" },
  ],
} as unknown as AboutHouseCommoditiesType;

export const SPACES = ["livingroom", "bedroom", "kitchen", "exterior", "general", "bathoom"];

export type AboutHouseSpaces = typeof SPACES;
export type AboutHouseSpace = AboutHouseSpaces[number];

type AboutHouseCommoditiesType = {
  [x in AboutHouseSpace]: [{ type: TypeAmenity }];
};
