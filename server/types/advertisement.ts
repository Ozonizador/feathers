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
    startRange?: number | null;
    endRange?: number | null;
  };
  dates?: {
    startDate?: string | null;
    endDate?: string | null;
  };
  coordinates?: GEO | null;
  verified?: boolean;
  eventsAllowed?: boolean;
  smokingAllowed?: boolean;
  animalsAllowed?: boolean;
  includesCleaning?: boolean;
  expensesIncluded?: boolean;
};

/* Ordering */
export type OrderAscending = "asc" | "desc";

export type AdvertisementOrder = {
  byColumn: "price" | "rating" | "time";
  type: OrderAscending;
  isActive: boolean;
};
