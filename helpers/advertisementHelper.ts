import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { FilterAdvertisements } from "../context/ProcurarAdvertisementsProvider";
import { AdvertisementWithReviewAverage, ADVERTISEMENT_PROPERTIES, FlexHostType } from "../models/advertisement";

const hostTypeFlexDescription = (type: FlexHostType) => {
  return {
    SUPER_FLEX: `Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 2 dias antes, o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    FLEX: `Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 7 dias antes, o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    MODERATE: `Até 60 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 15 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    RIGID: `Até 90 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 30 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    "": "",
  }[type];
};

const hostTranslate = (type: FlexHostType) => {
  return {
    SUPER_FLEX: `Super Flexível`,
    FLEX: `Flexível`,
    MODERATE: `Moderado`,
    RIGID: `Rigido`,
    "": "",
  }[type];
};

// get the icons to use here
const houseAmenities = () => {};

const addFilterAdvertisement = (
  query: PostgrestFilterBuilder<AdvertisementWithReviewAverage>,
  filters: FilterAdvertisements
) => {
  const { filter, order } = filters;

  filter.address && (query = query.eq(ADVERTISEMENT_PROPERTIES.PLACE, filter.address));
  filter.placeType && filter.placeType !== "ALL" && (query = query.eq(ADVERTISEMENT_PROPERTIES.TYPE, filter.placeType));

  // comodities not working
  // filter.comodities &&
  //   filter.comodities.length !== 0 &&
  //   (query = query.filter(ADVERTISEMENT_PROPERTIES.ABOUT_HOUSE, "in", filter.comodities));

  //  Price
  filter.price.startRange && (query = query.gte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.startRange));
  filter.price.endRange && (query = query.lte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.endRange));

  // Dates
  debugger;
  filter.dates?.startDate && (query = query.not("stay.startDate", "gte", filter.dates.startDate));
  filter.dates?.endDate && (query = query.not("stay.endDate", "lte", filter.dates.endDate));
  order.isActive && (query = query.order(ADVERTISEMENT_PROPERTIES.MONTH_RENT, { ascending: order.type == "asc" }));
  return query;
};

export { hostTypeFlexDescription, hostTranslate, addFilterAdvertisement };
