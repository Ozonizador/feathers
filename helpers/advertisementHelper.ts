import { FlexHostType } from "../models/advertisement";

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

const houseAmenities = () => {
  // get the icons to use here
};

export { hostTypeFlexDescription, hostTranslate };
