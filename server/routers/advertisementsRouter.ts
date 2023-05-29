import { z } from "zod";
import { PAGE_NUMBER_COUNT } from "../../hooks/advertisementService";
import { supabase } from "../../lib/supabaseClient";
import {
  Advertisements,
  AdvertisementStatus,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
  AMENITIES,
  TypeAmenity,
} from "../../models/advertisement";
import { Stay, STAYS_TABLE_NAME, STAY_TABLE } from "../../models/stay";
import { GEO } from "../../models/utils";
import { procedure, router } from "../trpc";

const advertisementFilterSchema: z.ZodType<FilterAdvertisements> = z.object({
  filter: z.object({
    comodities: z.array(z.enum(AMENITIES)).optional(),
    placeType: z.enum(["ALL", "ENTIRE_SPACE", "SHARED_ROOM", "PRIVATE_ROOM"]),
    price: z
      .object({
        startRange: z.number().optional(),
        endRange: z.number().optional(),
      })
      .optional(),
    dates: z
      .object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
      .optional(),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),
  order: z.object({
    byColumn: z.enum(["price"]),
    type: z.enum(["asc", "desc"]),
    isActive: z.boolean(),
  }),
});

export const advertisementsRouter = router({
  searchForAdvertisements: procedure.input(advertisementFilterSchema).query(async ({ input, ctx }) => {
    const { filter, order } = input;

    let query = supabase
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select("*, stays(*)")
      .eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, "AVAILABLE");

    query = addFilterToSearchAdvertisement(query, filter);
    query = addOrderToSearchAdvertisement(query, order);

    const { data, error, count } = await query.range(initRange, page * PAGE_NUMBER_COUNT - 1);
    return { data, error, count };
  }),
  searchForAdvertisementsWithCoordinates: procedure.input(advertisementFilterSchema).query(({ input, ctx }) => {
    const { filter, order } = input;
    return;
  }),
});
// export type definition of API
export type AppRouter = typeof advertisementsRouter;

export type FilterAdvertisements = {
  filter: FilterOptions;
  order: AdvertisementOrder;
};

export type FilterOptions = {
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

export interface AdvertisementOrder {
  byColumn: "price";
  type: OrderAscending;
  isActive: boolean;
}

export type OrderAscending = "asc" | "desc";

const addFilterToSearchAdvertisement = (query: any, filter: FilterOptions) => {
  // availability
  query = query.eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, "AVAILABLE" as AdvertisementStatus);

  // place type
  filter.placeType && filter.placeType !== "ALL" && (query = query.eq(ADVERTISEMENT_PROPERTIES.TYPE, filter.placeType));

  // comodities not working
  // filter.comodities &&
  //   filter.comodities.length !== 0 &&
  //   (query = query.filter(ADVERTISEMENT_PROPERTIES.ABOUT_HOUSE, "in", filter.comodities));

  // Price
  filter.price?.startRange && (query = query.gte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.startRange));
  filter.price?.endRange && (query = query.lte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.endRange));

  // dates
  filter.dates &&
    filter.dates.startDate &&
    filter.dates.endDate &&
    (query = query.not.in(
      "id",
      supabase
        .from<"stays", Stay>(STAYS_TABLE_NAME)
        .select("advertisement_id, reservation:reservations!inner(*)")
        .filter(STAY_TABLE.START_DATE, "gte", filter.dates?.startDate)
        .filter(STAY_TABLE.END_DATE, "lte", filter.dates?.endDate)
    ));

  return query;
};

const addOrderToSearchAdvertisement = (query: any, order: AdvertisementOrder) => {
  order.isActive && (query = query.order(ADVERTISEMENT_PROPERTIES.MONTH_RENT, { ascending: order.type == "asc" }));

  return query;
};
