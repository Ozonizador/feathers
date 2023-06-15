import { z } from "zod";
import { PAGE_NUMBER_COUNT } from "../../hooks/advertisementService";
import {
  AdvertisementAggregateView,
  Advertisements,
  AdvertisementWithReviewAverage,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_AGREGATED_AMENITIES_NAME,
  ADVERTISEMENT_TABLE_NAME,
  AMENITIES,
  CloseAdvertisementsFn,
  CLOSE_ADVERTISEMENTS_TABLE_NAME,
} from "../../models/advertisement";
import { publicProcedure, router } from "../trpc";
import { FilterAdvertisements } from "../types/advertisement";
import { addFilterToSearchAdvertisement, addOrderToSearchAdvertisement } from "../helpers/advertisementHelper";
import { isHostProcedure } from "../procedure";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";

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
    const { coordinates } = filter;
    const { lng, lat } = coordinates || { lng: undefined, lat: undefined };

    let query;
    if (lng && lat) {
      query = supabaseAdmin
        .rpc<"close_advertisements", CloseAdvertisementsFn>(
          CLOSE_ADVERTISEMENTS_TABLE_NAME,
          {
            lat,
            lng,
          },
          { count: "exact" }
        )
        .select("*, averages:reviewsPerAdvertisement!left(*), reservations!left(id)");
    } else {
      query = supabaseAdmin
        .from<"advertisements_agg_amenities", AdvertisementAggregateView>(ADVERTISEMENT_TABLE_AGREGATED_AMENITIES_NAME)
        .select("*, reservations!left(id)", { count: "exact" })
        .eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, "AVAILABLE");

      query = addFilterToSearchAdvertisement(query, filter);
      query = addOrderToSearchAdvertisement(query, order);
    }

    let initRange = page == 1 ? 0 : ((page || 1) - 1) * PAGE_NUMBER_COUNT;
    query = query.range(initRange, (page || 1) * PAGE_NUMBER_COUNT - 1);

    // select the information I want
    const { data, error, count } = await query;

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

      let query = supabaseAdmin
        .rpc<"close_advertisements", CloseAdvertisementsFn>(
          CLOSE_ADVERTISEMENTS_TABLE_NAME,
          {
            lat,
            lng,
          },
          { count: "exact" }
        )
        .select("*, averages:reviewsPerAdvertisement!left(*), reservations!left(id)");
      query = addFilterToSearchAdvertisement(query, filter);
      query = addOrderToSearchAdvertisement(query, order);

      let initRange = page == 1 ? 0 : ((page || 1) - 1) * PAGE_NUMBER_COUNT;
      query = query.range(initRange, (page || 1) * PAGE_NUMBER_COUNT - 1);

      // select the information I want
      const { data, error, count } = await query;

      return { data, error, count };
    }),

  updateAdvertisementMinimumStayAndTimeInAdvance: isHostProcedure
    .input(z.object({ minimumStay: z.number(), monthsInAdvance: z.number(), advertisementId: z.string() }))
    .mutation(async ({ input }) => {
      const { minimumStay, monthsInAdvance, advertisementId } = input;

      const { data, error } = await supabaseAdmin
        .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
        .update({ minimum_stay: minimumStay, months_notif_in_advance: monthsInAdvance })
        .eq(ADVERTISEMENT_PROPERTIES.ID, advertisementId)
        .select();

      return { data, error };
    }),

  updateAdvertisementDiscounts: isHostProcedure
    .input(z.object({ semesterDiscount: z.number(), trimesterDiscount: z.number(), advertisementId: z.string() }))
    .mutation(async ({ input }) => {
      const { trimesterDiscount, semesterDiscount, advertisementId } = input;

      const { data, error } = await supabaseAdmin
        .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
        .update({ semester_discount: semesterDiscount, trimester_discount: trimesterDiscount })
        .eq(ADVERTISEMENT_PROPERTIES.ID, advertisementId);

      return { data, error };
    }),
});

// export type definition of API
export type AdvertisementsRouter = typeof advertisementsRouter;
