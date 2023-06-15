import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useGetModalMaisFiltros, useSetModalMaisFiltros } from "../../context/ModalMaisFiltrosProvider";
import Checkbox from "../utils/Checkbox";

const ModalMaisFiltros = () => {
  const user = useUser();
  const isOpen = useGetModalMaisFiltros();
  const setModalMaisFiltros = useSetModalMaisFiltros();

  const closeModal = () => {
    setModalMaisFiltros(false);
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
                      <GridItem onChange={() => {}} label={"Wifi"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Ar condicionado"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Sala de Estar"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Televisão"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Máquina de Lavar Roupa"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Máquina Lavar Loiça"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Pátio/Terraço"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Zona de Refeições ao ar livre"} checked={false} name={""} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="mt-5 text-2xl text-primary-500">Comodidades</div>
                    <div className="grid grid-cols-2 gap-3">
                      <GridItem onChange={() => {}} label={"Casa de banho privada"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Cama individual"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Cama Dupla"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"2 Camas Individuais"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Roupeiro"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Secretária"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Roupas de Cama"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Varanda"} checked={false} name={""} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="mt-5 text-2xl text-primary-500">Condições e Regras</div>
                    <div className="grid grid-cols-2 gap-3">
                      <GridItem onChange={() => {}} label={"Permitido fumar"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Permitido animais"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Permitido eventos"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Serviço de limpeza"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Despesas incluídas"} checked={false} name={""} />
                      <GridItem onChange={() => {}} label={"Casa Verificada"} checked={false} name={""} />
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
  name: string;
};

const GridItem = ({ onChange, label, checked, name }: GridItemProps) => {
  return (
    <div className="my-2 flex flex-1 items-center gap-2 px-1">
      <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 px-3 py-3 lg:w-10 lg:justify-between">
        <div className="flex h-5 items-center">
          <Checkbox onChange={onChange} checked={checked} name={name} />
        </div>
      </div>
      <div className="ml-1 w-full flex-1">
        <p className="text-left text-sm font-bold lg:text-base">{label}</p>
      </div>
    </div>
  );
};
