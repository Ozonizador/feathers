import { ADVERTISEMENT_PROPERTIES, AdvertisementStatus } from "../../models/advertisement";
import { STAYS_TABLE_NAME } from "../../models/stay";
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

export { addFilterToSearchAdvertisement, addOrderToSearchAdvertisement };
