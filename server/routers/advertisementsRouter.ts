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
import { isHostProcedure, superAdminProcedure } from "../procedure";
import { supabaseAdmin } from "../../lib/supabaseAdminClient";

const AdvertisementFilterSchema: z.ZodType<FilterAdvertisements & { page?: number }> = z.object({
  filter: z.object({
    comodities: z.array(z.enum(AMENITIES)).optional(),
    placeType: z.enum(["ALL", "ENTIRE_SPACE", "SHARED_ROOM", "PRIVATE_ROOM"]),
    price: z
      .object({
        startRange: z.number().optional().nullable(),
        endRange: z.number().optional().nullable(),
      })
      .optional(),
    dates: z
      .object({
        startDate: z.string().optional().nullable(),
        endDate: z.string().optional().nullable(),
      })
      .optional(),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional()
      .nullable(),
    verified: z.boolean().optional(),
    eventsAllowed: z.boolean().optional(),
    smokingAllowed: z.boolean().optional(),
    animalsAllowed: z.boolean().optional(),
    includesCleaning: z.boolean().optional(),
    expensesIncluded: z.boolean().optional(),
  }),
  order: z.object({
    byColumn: z.enum(["price", "rating", "time"]),
    type: z.enum(["asc", "desc"]),
    isActive: z.boolean(),
  }),
  page: z.number().default(1),
});

export const advertisementsRouter = router({
  getAdvertisements: publicProcedure.query(async () => {
    const { data, error } = await supabaseAdmin
      .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
      .select("*, host:host_id(*)").neq("host_id", null);

    return { data, error };
  }),
  removeAdvertisement: superAdminProcedure
    .input(z.object({ advertisementId: z.string() }))
    .mutation(async ({ input }) => {
      const { advertisementId } = input;
      const { data, error } = await supabaseAdmin
        .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
        .delete()
        .eq("id", advertisementId);

      return { data, error };
    }),
  verifyAdvertisement: superAdminProcedure
    .input(z.object({ advertisementId: z.string() }))
    .mutation(async ({ input }) => {
      const { advertisementId } = input;

      const { data, error } = await supabaseAdmin
        .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
        .update({ verified: true })
        .eq(ADVERTISEMENT_PROPERTIES.ID, advertisementId);

      return { data, error };
    }),
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
        .select("*, reservations!left(id), averages:reviewsPerAdvertisement!left(*)");
    } else {
      query = supabaseAdmin
        .from<"advertisements_agg_amenities", AdvertisementAggregateView>(ADVERTISEMENT_TABLE_AGREGATED_AMENITIES_NAME)
        .select(
          "*, reservations!left(id), averages:reviewsPerAdvertisement!left(*), overall_average:reviewsPerAdvertisement!left(overall_average)",
          { count: "exact" }
        )
        .eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, "AVAILABLE").not(ADVERTISEMENT_PROPERTIES.HOST_ID, 'is',null);

      query = addFilterToSearchAdvertisement(query, filter);
      query = addOrderToSearchAdvertisement(query, order);
    }

    let initRange = page == 1 ? 0 : ((page || 1) - 1) * PAGE_NUMBER_COUNT;
    query = query.range(initRange, (page || 1) * PAGE_NUMBER_COUNT - 1);

    // select the information I want
    const { data, error, count } = await query;

    return {
      data: (data as unknown as AdvertisementWithReviewAverage[]) || [],
      error: error || null,
      count: (count as number) || 0,
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

      return { data: data || [], error, count: count || 0 };
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
