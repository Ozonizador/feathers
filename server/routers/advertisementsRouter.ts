import { z } from "zod";
import { PAGE_NUMBER_COUNT } from "../../hooks/advertisementService";
import { supabase } from "../../lib/supabaseClient";
import {
  Advertisements,
  AdvertisementStatus,
  AdvertisementWithReviewAverage,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
  AMENITIES,
  CloseAdvertisementsFn,
  CLOSE_ADVERTISEMENTS_TABLE_NAME,
} from "../../models/advertisement";
import { STAYS_TABLE_NAME } from "../../models/stay";
import { procedure, router } from "../trpc";
import { AdvertisementOrder, AdvertisementsFilterOptions, FilterAdvertisements } from "../types/advertisement";

const AdvertisementFilterSchema: z.ZodType<FilterAdvertisements & { page?: number }> = z.object({
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
  page: z.number().default(1),
});

export const advertisementsRouter = router({
  searchForAdvertisements: procedure.input(AdvertisementFilterSchema).query(async ({ input, ctx }) => {
    const { filter, order, page } = input;
    const { coordinates } = filter || { coordinates: { lng: undefined, lat: undefined } };
    const { lng, lat } = coordinates || { lng: undefined, lat: undefined };

    let query;
    if (lng && lat) {
      query = supabase
        .rpc<"close_advertisements", CloseAdvertisementsFn>(
          CLOSE_ADVERTISEMENTS_TABLE_NAME,
          {
            lat,
            lng,
          },
          { count: "exact" }
        )
        .select("*, averages:reviewsPerAdvertisement!left(*), stay:stays(*)");
    } else {
      query = supabase
        .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
        .select("*, stays(*)")
        .eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, "AVAILABLE");

      query = addFilterToSearchAdvertisement(query, filter);
      query = addOrderToSearchAdvertisement(query, order);
    }

    let initRange = page == 1 ? 0 : ((page || 1) - 1) * PAGE_NUMBER_COUNT;
    const { data, error, count } = await query.range(initRange, (page || 1) * PAGE_NUMBER_COUNT - 1);
    return {
      data: (data as unknown as AdvertisementWithReviewAverage[]) || null,
      error: error || null,
      count: (count as number) || null,
    };
  }),
  searchForAdvertisementsWithCoordinates: procedure.input(AdvertisementFilterSchema).query(async ({ input, ctx }) => {
    const { filter, order, page } = input;
    const { coordinates } = filter || { coordinates: { lng: undefined, lat: undefined } };
    const { lng, lat } = coordinates || { lng: undefined, lat: undefined };

    if (!lng || !lat) return { data: null, error: "No latitude or longitude provided", count: null };

    let query = supabase
      .rpc<"close_advertisements", CloseAdvertisementsFn>(
        CLOSE_ADVERTISEMENTS_TABLE_NAME,
        {
          lat,
          lng,
        },
        { count: "exact" }
      )
      .select("*, averages:reviewsPerAdvertisement!left(*), stay:stays(*)");
    query = addFilterToSearchAdvertisement(query, filter);
    query = addOrderToSearchAdvertisement(query, order);

    let initRange = page == 1 ? 0 : ((page || 1) - 1) * PAGE_NUMBER_COUNT;
    const { data, error, count } = await query.range(initRange, (page || 1) * PAGE_NUMBER_COUNT - 1);

    return { data, error, count };
  }),
});
// export type definition of API
export type AdvertisementsRouter = typeof advertisementsRouter;

/**
 * TODO: move this to helpers on server
 * @param query
 * @param filter
 * @returns
 */
const addFilterToSearchAdvertisement = (query: any, filter: AdvertisementsFilterOptions) => {
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
    (query = query.filter("id", "not.in", (query: any) =>
      query
        .from(STAYS_TABLE_NAME)
        .select("advertisement_id")
        .filter("reservations.start_date", "gte", filter.dates?.startDate)
        .filter("reservations.end_date", "lte", filter.dates?.endDate)
    ));

  return query;
};

const addOrderToSearchAdvertisement = (query: any, order: AdvertisementOrder) => {
  order.isActive && (query = query.order(ADVERTISEMENT_PROPERTIES.MONTH_RENT, { ascending: order.type == "asc" }));

  return query;
};
