import { ADVERTISEMENT_PROPERTIES, AdvertisementStatus } from "../../models/advertisement";
import { AdvertisementsFilterOptions, AdvertisementOrder } from "../types/advertisement";

/**
 * @param query
 * @param filter
 * @returns
 */
const addFilterToSearchAdvertisement = (query: any, filter: AdvertisementsFilterOptions) => {
  // availability
  query = query.eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, "AVAILABLE" as AdvertisementStatus);

  // place type
  filter.placeType && filter.placeType !== "ALL" && (query = query.eq(ADVERTISEMENT_PROPERTIES.TYPE, filter.placeType));

  filter.comodities &&
    filter.comodities.length !== 0 &&
    (query = query.contains(ADVERTISEMENT_PROPERTIES.AMENITIES, filter.comodities));

  // Price
  filter.price?.startRange && (query = query.gte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.startRange));
  filter.price?.endRange && (query = query.lte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.endRange));

  // dates
  filter.dates && filter.dates.startDate && (query = query.gte("reservations.start_date", filter.dates.startDate));
  filter.dates && filter.dates.endDate && (query = query.lte("reservations.end_date", filter.dates.endDate));
  filter.dates &&
    (filter.dates.startDate || filter.dates.endDate) &&
    (query = query.not("reservations.status", "eq", "ACCEPTED"));

  return query;
};

const addOrderToSearchAdvertisement = (query: any, order: AdvertisementOrder) => {
  // foreign table ordering does not work yet
  if (!order.isActive || order.byColumn === "rating") return query;

  let ascending = order.type == "asc";
  let property = ORDER_FILTER[order.byColumn];

  let opts = {
    ascending: ascending,
    nullsFirst: false,
    // foreignTable: order.byColumn == "rating" ? "reviewsPerAdvertisement" : undefined,
  };

  query = query.order(property, { ascending: ascending, nullsFirst: false });
  return query;
};

const ORDER_FILTER = {
  price: "month_rent",
  rating: "overall_average",
  time: "created_at",
} as const;

export { addFilterToSearchAdvertisement, addOrderToSearchAdvertisement };
