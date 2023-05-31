import { Database } from "../database.types";

export const ZONES_TABLE_NAME = "zones";
export const COMMODITIES_TABLE_NAME = "commodities";
export const ADVERTISEMENTS_COMMODITIES = "advertisements_commodities";

export type Zones = Database["public"]["Tables"]["zones"];
export type Zone = Zones["Row"];

export type Commodities = Database["public"]["Tables"]["commodities"];
export type Commodity = Commodities["Row"];

export type AdvertisementCommodities = Database["public"]["Tables"]["advertisement_commodities"];
export type AdvertisementCommodity = AdvertisementCommodities["Row"];
