import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useGetModalMaisFiltros, useSetModalMaisFiltros } from "../../context/ModalMaisFiltrosProvider";
import Checkbox from "../utils/Checkbox";
import {
  useCurrentProcurarAdvertisementContext,
  useSetComoditiesContext,
  useSetFiltersContext,
} from "../../context/ProcurarAdvertisementsProvider";
import { TypeAmenity } from "../../models/advertisement";
import { useTranslation } from "next-i18next";
import { IoMdClose } from "react-icons/io";

const ModalMaisFiltros = () => {
  const { t } = useTranslation();
  const isOpen = useGetModalMaisFiltros();
  const setModalMaisFiltros = useSetModalMaisFiltros();
  const setComoditiesFilters = useSetComoditiesContext();
  const setFilters = useSetFiltersContext();
  const { filter } = useCurrentProcurarAdvertisementContext();
  const { comodities, smokingAllowed, eventsAllowed, verified, animalsAllowed, includesCleaning, expensesIncluded } =
    filter;

  const closeModal = () => {
    setModalMaisFiltros(false);
  };

  const checkIfComodityIsChecked = (value: TypeAmenity) => {
    if (!comodities || comodities.length == 0) return false;
    return comodities.find((comodity) => comodity == value) !== undefined;
  };

  const toggleComodityChecked = (value: TypeAmenity) => {
    if (!comodities || comodities.length == 0) return setComoditiesFilters([value]);

    const existCommodity = comodities.findIndex((comodity) => comodity == value);
    if (existCommodity == -1) return setComoditiesFilters([...comodities, value]);
    const removedWithComodities = comodities;
    removedWithComodities.splice(existCommodity, 1);
    setComoditiesFilters(removedWithComodities);
  };

  const toggleFiltersProperty = (
    property:
      | "verified"
      | "eventsAllowed"
      | "smokingAllowed"
      | "animalsAllowed"
      | "includesCleaning"
      | "expensesIncluded",
    value: boolean
  ) => {
    setFilters({ [property]: value });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-900" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-b-3xl rounded-t-3xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex gap-3 border-b-2 justify-between border-primary-400 p-5 text-lg font-medium leading-6"
                >
                  <span className="my-auto">{t("more_filters")}</span>
                  <IoMdClose className=" ml-2 h-8 w-8 cursor-pointer" onClick={() => closeModal()}/>
                </Dialog.Title>

                {/* <!-- Modal --> */}
                <div
                  className="modal fade -centered mx-8 pb-10"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="flex flex-col gap-3">
                    <div className="mt-5 text-2xl text-primary-500">{t("advertisements:house_characteristcs")}</div>
                    <div className="grid grid-cols-2 gap-1">
                      <GridItem
                        onChange={() => toggleComodityChecked("WIFI")}
                        label={t("amenities:wifi")}
                        checked={checkIfComodityIsChecked("WIFI")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("AIR_CONDITIONING")}
                        label={t("amenities:air_conditioning")}
                        checked={checkIfComodityIsChecked("AIR_CONDITIONING")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("LIVING_ROOM")}
                        label={t("amenities:living_room")}
                        checked={checkIfComodityIsChecked("LIVING_ROOM")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("TV")}
                        label={t("amenities:tv")}
                        checked={checkIfComodityIsChecked("TV")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("LAUNDRY_MACHINE")}
                        label={t("amenities:laundry_machine")}
                        checked={checkIfComodityIsChecked("LAUNDRY_MACHINE")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("WASHING_MACHINE")}
                        label={t("amenities:washing_machine")}
                        checked={checkIfComodityIsChecked("WASHING_MACHINE")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("TERRACE")}
                        label={t("amenities:terrace")}
                        checked={checkIfComodityIsChecked("TERRACE")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("MEAL_ZONE")}
                        label={t("amenities:meal_zone")}
                        checked={checkIfComodityIsChecked("MEAL_ZONE")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="mt-5 text-2xl text-primary-500">{t("advertisements:amenities")}</div>
                    <div className="grid grid-cols-2 gap-1">
                      <GridItem
                        onChange={() => toggleComodityChecked("PRIVATE_BATHROOM")}
                        label={t("amenities:private_bathroom")}
                        checked={checkIfComodityIsChecked("PRIVATE_BATHROOM")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("SINGLE_BED")}
                        label={t("amenities:single_bed")}
                        checked={checkIfComodityIsChecked("SINGLE_BED")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("DOUBLE_BED")}
                        label={t("amenities:double_bed")}
                        checked={checkIfComodityIsChecked("DOUBLE_BED")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("TWO_BEDS")}
                        label={t("amenities:two_beds")}
                        checked={checkIfComodityIsChecked("TWO_BEDS")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("CLOSET")}
                        label={t("amenities:closet")}
                        checked={checkIfComodityIsChecked("CLOSET")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("DESK")}
                        label={t("amenities:desk")}
                        checked={checkIfComodityIsChecked("DESK")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("BED_SHEETS")}
                        label={t("amenities:bed_sheets")}
                        checked={checkIfComodityIsChecked("BED_SHEETS")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("BALCONY")}
                        label={t("amenities:balcony")}
                        checked={checkIfComodityIsChecked("BALCONY")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="mt-5 text-2xl text-primary-500">{t("advertisements:conditions_and_rules")}</div>
                    <div className="grid grid-cols-2 gap-1">
                      <GridItem
                        onChange={() => toggleFiltersProperty("smokingAllowed", !smokingAllowed)}
                        label={t("advertisements:smoking_allowed")}
                        checked={smokingAllowed || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("animalsAllowed", !animalsAllowed)}
                        label={t("advertisements:animals_allowed")}
                        checked={animalsAllowed || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("eventsAllowed", !eventsAllowed)}
                        label={t("advertisements:events_allowed")}
                        checked={eventsAllowed || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("includesCleaning", !includesCleaning)}
                        label={t("advertisements:cleaning")}
                        checked={includesCleaning || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("expensesIncluded", !expensesIncluded)}
                        label={t("advertisements:expenses_included")}
                        checked={expensesIncluded || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("verified", !verified)}
                        label={t("advertisements:verified_house")}
                        checked={verified || false}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalMaisFiltros;

type GridItemProps = {
  onChange: () => void;
  label: string;
  checked: boolean;
};

const GridItem = ({ onChange, label, checked }: GridItemProps) => {
  return (
    <div className="my-2 flex flex-1 items-center gap-2 px-1">
      <div className="ml-auto flex flex-row items-center rounded-lg lg:w-10 lg:justify-between">
        <div className="flex h-5 items-center cursor-pointer">
          <Checkbox onChange={onChange} checked={checked} name="" />
        </div>
      </div>
      <div className="ml-1 w-full flex-1">
        <p className="text-left text-sm font-bold lg:text-base">{label}</p>
      </div>
    </div>
  );
};
