import { FilterAdvertisements } from "../context/ProcurarAdvertisementsProvider";
import {
  AdvertisementPhoto,
  ADVERTISEMENT_PROPERTIES,
  HostFlexType,
  TypeAmenity,
  TypeExpense,
} from "../models/advertisement";

import { TbSofa } from "react-icons/tb";
import { MdOutlineFireplace } from "react-icons/md";
import { GiTable } from "react-icons/gi";
import { BiChair } from "react-icons/bi";
import { AiOutlineWifi } from "react-icons/ai";
import { GiElevator } from "react-icons/gi";
import { GiComputerFan } from "react-icons/gi";
import { GiWashingMachine } from "react-icons/gi";
import { GiMirrorMirror } from "react-icons/gi";
import { GiRiceCooker } from "react-icons/gi";
import { TbBed } from "react-icons/tb";
import { MdOutlineBed } from "react-icons/md";
import { MdOutlineMicrowave } from "react-icons/md";
import { GiToaster } from "react-icons/gi";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { GiThermometerHot } from "react-icons/gi";
import { MdOutlineIron } from "react-icons/md";
import { GiClothesline } from "react-icons/gi";
import { MdOutlineLiving } from "react-icons/md";
import { MdBalcony } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { MdOutlineDeck } from "react-icons/md";
import { GiBarbecue } from "react-icons/gi";
import { GiIceBolt } from "react-icons/gi";
import { GiFurnace } from "react-icons/gi";
import { CgSmartHomeCooker } from "react-icons/cg";
import { GrFan } from "react-icons/gr";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { MdOutlineBathtub } from "react-icons/md";
import { GiShower } from "react-icons/gi";
import { FaRestroom } from "react-icons/fa";
import { GrRestroomMen } from "react-icons/gr";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { GiDesk } from "react-icons/gi";
import { GiPillow } from "react-icons/gi";
import { MdOutlineBedroomChild } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { MdLocalLaundryService } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";
import { BiBold } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { TbHanger } from "react-icons/tb";
import { GiCoffeePot } from "react-icons/gi";
import { BiPlug } from "react-icons/bi";
import { FiMonitor } from "react-icons/fi";
import { IconType } from "react-icons";

const hostTypeFlexDescription = (type: HostFlexType) => {
  return {
    SUPER_FLEX: `Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 2 dias antes, o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    FLEX: `Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 7 dias antes, o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    MODERATE: `Até 60 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 15 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    RIGID: `Até 90 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 30 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.`,
    "": "",
  }[type];
};

const hostTranslate = (type: HostFlexType) => {
  return {
    SUPER_FLEX: `Super Flexível`,
    FLEX: `Flexível`,
    MODERATE: `Moderado`,
    RIGID: `Rigido`,
    "": "",
  }[type];
};

// get the icons to use here
export const houseAmenities = (type: TypeAmenity): IconType => {
  switch (type) {
    case "SOFA":
      return TbSofa;
    case "TV":
      return FiMonitor;
    case "FIREPLACE":
      return MdOutlineFireplace;
    case "TABLE":
      return GiTable;
    case "CHAIRS":
      return BiChair;
    case "WIFI":
      return AiOutlineWifi;
    case "ELEVADOR":
      return GiElevator;
    case "AIR_CONDITIONING":
      return GiComputerFan;
    case "WASHING_MACHINE":
      return GiWashingMachine;
    case "MIRROR":
      return GiMirrorMirror;
    case "FRIDGE":
      return GiRiceCooker;
    case "SINGLE_BED":
      return TbBed;
    case "DOUBLE_BED":
      return MdOutlineBed;
    case "MICROWAVE":
      return MdOutlineMicrowave;
    case "TOASTER":
      return GiToaster;
    case "COFFEE_MAKER":
      return MdOutlineCoffeeMaker;
    case "HEATING":
      return GiThermometerHot;
    case "IRON_BOARD":
      return MdOutlineIron;
    case "ESTENDAL":
      return GiClothesline;
    case "LIVING_ROOM":
      return MdOutlineLiving;
    case "BALCONY":
      return MdBalcony;
    case "SWIMMING_POOL":
      return MdPool;
    case "PARKING_SPOT":
      return FaParking;
    case "TERRACE":
      return MdOutlineDeck;
    case "BARBECUE":
      return GiBarbecue;
    case "FREEZER":
      return GiIceBolt;
    case "OVEN":
      return GiFurnace;
    case "STOVE":
      return CgSmartHomeCooker;
    case "EXAUSTOR_FAN":
      return GrFan;
    case "DRYER":
      return MdOutlineLocalLaundryService;
    case "BATHTUB":
      return MdOutlineBathtub;
    case "SHOWER":
      return GiShower;
    case "SHARED_BATHROOM":
      return FaRestroom;
    case "PRIVATE_BATHROOM":
      return GrRestroomMen;
    case "CUTLERY":
      return GiForkKnifeSpoon;
    case "DESK":
      return GiDesk;
    case "PILLOWS":
      return GiPillow;
    case "BED_SHEETS":
      return MdOutlineBedroomChild;
    case "GARBAGE_CAN":
      return BsTrash;
    case "LAUNDRY_MACHINE":
      return MdLocalLaundryService;
    case "MEAL_ZONE":
      return GiHotMeal;
    case "BASIC_UTILIES":
      return BiBold;
    case "KEY_TO_LOCK_DOOR":
      return BsKey;
    case "HANGERS_SUPPORT":
      return TbHanger;
    case "HOT_WATER_KETTLE":
      return GiCoffeePot;
    case "POWER_PLUG_NEAR_BED":
      return BiPlug;
    default:
      return null;
    // case   "COURTYARD": return COURTYARD
    // case   "BLACKOUTS": return typeof
  }
};

const addFilterAdvertisement = (query: any, filters: FilterAdvertisements) => {
  const { filter, order } = filters;

  // is available
  // query = query.eq(ADVERTISEMENT_PROPERTIES.AVAILABLE, AdvertisementStatus.AVAILABLE);

  filter.placeType && filter.placeType !== "ALL" && (query = query.eq(ADVERTISEMENT_PROPERTIES.TYPE, filter.placeType));

  // comodities not working
  // filter.comodities &&
  //   filter.comodities.length !== 0 &&
  //   (query = query.filter(ADVERTISEMENT_PROPERTIES.ABOUT_HOUSE, "in", filter.comodities));

  //  Price
  filter.price.startRange && (query = query.gte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.startRange));
  filter.price.endRange && (query = query.lte(ADVERTISEMENT_PROPERTIES.MONTH_RENT, filter.price.endRange));

  // Dates

  // filter.dates?.startDate &&
  //   (query = query.not(ADVERTISEMENT_PROPERTIES.STAY_START_DATE, "gte", filter.dates.startDate));
  // filter.dates?.endDate && (query = query.not(ADVERTISEMENT_PROPERTIES.STAY_START_DATE, "lte", filter.dates.endDate));

  order.isActive && (query = query.order(ADVERTISEMENT_PROPERTIES.MONTH_RENT, { ascending: order.type == "asc" }));
  return query;
};

const checkIfExpensesIncluded = (expenses: TypeExpense[]) => {
  let included = 0;
  let partially = 0;
  let excluded = 0;

  if (!expenses || expenses.length === 0) {
    return "";
  }
  for (let expense of expenses) {
    if (expense.included == "INCLUDED") return included++;
    if (expense.included == "PARTIALLY") return partially++;
    if (expense.included == "EXCLUDED") return excluded++;
  }

  if (included === 0 && partially === 0 && excluded === 0) return "Sem Informação Despesas";
  if (included !== 0 && partially === 0 && excluded === 0) return "Despesas Incluidas";
  if (included === 0 && partially !== 0 && excluded === 0) return "Despesas Partialmente Incluídas";
  if (included === 0 && partially === 0 && excluded !== 0) return "Despesas Excluídas";

  return "Despesas Partialmente Incluídas";
};

const getMainAdvertPhoto = (photos: AdvertisementPhoto[]) => {
  if (photos && photos.length > 0) {
    let photo = photos.find((photo) => photo.zone == "main");
    return photo ? photo : photos[0];
  } else {
    return null;
  }
};

export { hostTypeFlexDescription, hostTranslate, addFilterAdvertisement, checkIfExpensesIncluded, getMainAdvertPhoto };
