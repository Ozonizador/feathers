import { TypeAmenity } from "../../models/advertisement";
import { GEO } from "../../models/utils";

export type FilterAdvertisements = {
  filter: AdvertisementsFilterOptions;
  order: AdvertisementOrder;
};

/* Filtering */
export type AdvertisementsFilterOptions = {
  comodities?: TypeAmenity[];
  placeType?: "ALL" | "ENTIRE_SPACE" | "SHARED_ROOM" | "PRIVATE_ROOM";
  price?: {
    startRange?: number;
    endRange?: number;
  };
  dates?: {
    startDate?: string;
    endDate?: string;
  };
  coordinates?: GEO;
};

/* Ordering */
export type OrderAscending = "asc" | "desc";

export type AdvertisementOrder = {
  byColumn: "price" | "rating" | "time";
  type: OrderAscending;
  isActive: boolean;
};
