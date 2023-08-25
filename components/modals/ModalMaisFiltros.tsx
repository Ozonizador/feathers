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

const ModalMaisFiltros = () => {
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
                  className="flex gap-3 border-b-2 border-primary-400 p-5 text-lg font-medium leading-6"
                >
                  <span className="my-auto">Mais Filtros</span>
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
                    <div className="mt-5 text-2xl text-primary-500">Características da Casa</div>
                    <div className="grid grid-cols-2 gap-3">
                      <GridItem
                        onChange={() => toggleComodityChecked("WIFI")}
                        label={"Wifi"}
                        checked={checkIfComodityIsChecked("WIFI")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("AIR_CONDITIONING")}
                        label={"Ar condicionado"}
                        checked={checkIfComodityIsChecked("AIR_CONDITIONING")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("LIVING_ROOM")}
                        label={"Sala de Estar"}
                        checked={checkIfComodityIsChecked("LIVING_ROOM")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("TV")}
                        label={"Televisão"}
                        checked={checkIfComodityIsChecked("TV")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("LAUNDRY_MACHINE")}
                        label={"Máquina de Lavar Roupa"}
                        checked={checkIfComodityIsChecked("LAUNDRY_MACHINE")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("WASHING_MACHINE")}
                        label={"Máquina Lavar Loiça"}
                        checked={checkIfComodityIsChecked("WASHING_MACHINE")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("TERRACE")}
                        label={"Pátio/Terraço"}
                        checked={checkIfComodityIsChecked("TERRACE")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("MEAL_ZONE")}
                        label={"Zona de Refeições ao ar livre"}
                        checked={checkIfComodityIsChecked("MEAL_ZONE")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="mt-5 text-2xl text-primary-500">Comodidades</div>
                    <div className="grid grid-cols-2 gap-3">
                      <GridItem
                        onChange={() => toggleComodityChecked("PRIVATE_BATHROOM")}
                        label={"Casa de banho privada"}
                        checked={checkIfComodityIsChecked("PRIVATE_BATHROOM")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("SINGLE_BED")}
                        label={"Cama individual"}
                        checked={checkIfComodityIsChecked("SINGLE_BED")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("DOUBLE_BED")}
                        label={"Cama Dupla"}
                        checked={checkIfComodityIsChecked("DOUBLE_BED")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("TWO_BEDS")}
                        label={"2 Camas Individuais"}
                        checked={checkIfComodityIsChecked("TWO_BEDS")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("CLOSET")}
                        label={"Roupeiro"}
                        checked={checkIfComodityIsChecked("CLOSET")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("DESK")}
                        label={"Secretária"}
                        checked={checkIfComodityIsChecked("DESK")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("BED_SHEETS")}
                        label={"Roupas de Cama"}
                        checked={checkIfComodityIsChecked("BED_SHEETS")}
                      />
                      <GridItem
                        onChange={() => toggleComodityChecked("BALCONY")}
                        label={"Varanda"}
                        checked={checkIfComodityIsChecked("BALCONY")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="mt-5 text-2xl text-primary-500">Condições e Regras</div>
                    <div className="grid grid-cols-2 gap-3">
                      <GridItem
                        onChange={() => toggleFiltersProperty("smokingAllowed", !smokingAllowed)}
                        label={"Permitido fumar"}
                        checked={smokingAllowed || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("animalsAllowed", !animalsAllowed)}
                        label={"Permitido animais"}
                        checked={animalsAllowed || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("eventsAllowed", !eventsAllowed)}
                        label={"Permitido eventos"}
                        checked={eventsAllowed || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("includesCleaning", !includesCleaning)}
                        label={"Serviço de limpeza"}
                        checked={includesCleaning || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("expensesIncluded", !expensesIncluded)}
                        label={"Despesas incluídas"}
                        checked={expensesIncluded || false}
                      />
                      <GridItem
                        onChange={() => toggleFiltersProperty("verified", !verified)}
                        label={"Casa Verificada"}
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
      <div className="ml-auto flex flex-row items-center rounded-lg px-3 py-3 lg:w-10 lg:justify-between">
        <div className="flex h-5 items-center">
          <Checkbox onChange={onChange} checked={checked} name="" />
        </div>
      </div>
      <div className="ml-1 w-full flex-1">
        <p className="text-left text-sm font-bold lg:text-base">{label}</p>
      </div>
    </div>
  );
};
