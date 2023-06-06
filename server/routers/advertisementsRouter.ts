import { z } from "zod";
import { PAGE_NUMBER_COUNT } from "../../hooks/advertisementService";
import { supabase } from "../../lib/supabaseClient";
import {
  Advertisements,
  AdvertisementWithReviewAverage,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
  AMENITIES,
  CloseAdvertisementsFn,
  CLOSE_ADVERTISEMENTS_TABLE_NAME,
} from "../../models/advertisement";
import { isHostProcedure } from "../procedure";
import { publicProcedure, router } from "../trpc";
import { FilterAdvertisements } from "../types/advertisement";
import { addFilterToSearchAdvertisement, addOrderToSearchAdvertisement } from "../helpers/advertisementHelper";

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
  searchForAdvertisements: publicProcedure.input(AdvertisementFilterSchema).query(async ({ input, ctx }) => {
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
  searchForAdvertisementsWithCoordinates: publicProcedure
    .input(AdvertisementFilterSchema)
    .query(async ({ input, ctx }) => {
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
  // Adicionar os procedure de authenticated
  updateAdvertisementMinimumStayAndTimeInAdvance: isHostProcedure
    .input(z.object({ minimum: z.number(), timeInAdvance: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { minimum, timeInAdvance } = input;
      const { userId } = ctx;

      const { data, error } = await supabase
        .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
        .update({ minimum_stay: minimum, time_in_advance: timeInAdvance })
        .eq(ADVERTISEMENT_PROPERTIES.HOST_ID, userId);

      return { data, error };
    }),

  updateAdvertisementDiscounts: isHostProcedure
    .input(z.object({ semesterDiscount: z.number(), trimesterDiscount: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { trimesterDiscount, semesterDiscount } = input;
      const { userId } = ctx;

      const { data, error } = await supabase
        .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
        .update({ semester_discount: semesterDiscount, trimester_discount: trimesterDiscount })
        .eq(ADVERTISEMENT_PROPERTIES.HOST_ID, userId);

      return { data, error };
    }),
});

// export type definition of API
export type AdvertisementsRouter = typeof advertisementsRouter;
