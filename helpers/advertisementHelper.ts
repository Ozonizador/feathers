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

export const addFilterAdvertisement = (
  query: PostgrestFilterBuilder<AdvertisementWithReviewAverage>,
  filters: FilterAdvertisements
) => {
  const { filter, order } = filters;

  filter.address && query.eq(ADVERTISEMENT_PROPERTIES.PLACE, filter.address);
  filter.placeType !== "ALL" && query.eq(ADVERTISEMENT_PROPERTIES.TYPE, filter.placeType);

  // missing price and comodities

  order.isActive && query.order(ADVERTISEMENT_PROPERTIES.MONTH_RENT, { ascending: order.type == "asc" });
  return query;
};

export { hostTypeFlexDescription, hostTranslate };
