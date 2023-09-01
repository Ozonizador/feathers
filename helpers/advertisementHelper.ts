import { IconType } from "react-icons";
import { AiOutlineWifi } from "react-icons/ai";
import { BiChair, BiBold, BiPlug, BiCloset } from "react-icons/bi";
import { BsTrash, BsKey } from "react-icons/bs";
import { CgSmartHomeCooker } from "react-icons/cg";
import { FaParking, FaRestroom } from "react-icons/fa";
import {
  GiTable,
  GiElevator,
  GiComputerFan,
  GiWashingMachine,
  GiMirrorMirror,
  GiRiceCooker,
  GiToaster,
  GiThermometerHot,
  GiClothesline,
  GiBarbecue,
  GiIceBolt,
  GiFurnace,
  GiShower,
  GiForkKnifeSpoon,
  GiDesk,
  GiPillow,
  GiHotMeal,
  GiCoffeePot,
} from "react-icons/gi";
import { GrFan, GrRestroomMen } from "react-icons/gr";
import {
  MdOutlineFireplace,
  MdOutlineBed,
  MdOutlineMicrowave,
  MdOutlineCoffeeMaker,
  MdOutlineIron,
  MdOutlineLiving,
  MdBalcony,
  MdPool,
  MdOutlineDeck,
  MdOutlineLocalLaundryService,
  MdOutlineBathtub,
  MdOutlineBedroomChild,
  MdLocalLaundryService,
} from "react-icons/md";
import { TbSofa, TbBed, TbHanger } from "react-icons/tb";
import { AdvertisementPhoto, HostFlexType, TypeAmenity } from "../models/advertisement";
import { FiMonitor } from "react-icons/fi";

const hostTypeFlexDescription = (type: HostFlexType) => {
  return {
    SUPER_FLEX: `advertisements:host_type.super_flex_description`,
    FLEX: `advertisements:host_type.flex_description`,
    MODERATE: `advertisements:host_type.moderate_description`,
    RIGID: `advertisements:host_type.rigid_description`,
  }[type];
};

const hostTranslate = (type: HostFlexType) => {
  return {
    SUPER_FLEX: `advertisements:host_type.super_flex`,
    FLEX: `advertisements:host_type.flex`,
    MODERATE: `advertisements:host_type.moderate`,
    RIGID: `advertisements:host_type.rigid`,
  }[type];
};

// get the icons to use here
export const houseAmenities = (type: TypeAmenity): IconType | undefined => {
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
    case "CLOSET":
      return BiCloset;
    default:
      return undefined;
    // case   "COURTYARD": return COURTYARD
    // case   "BLACKOUTS": return typeof
  }
};

const getMainAdvertPhoto = (photos: AdvertisementPhoto[]): AdvertisementPhoto | undefined => {
  if (!photos || photos.length == 0) return undefined;

  let photo = photos.find((photo) => photo.zone == "main");
  return photo ? photo : photos[0];
};

export { hostTypeFlexDescription, hostTranslate, getMainAdvertPhoto };
