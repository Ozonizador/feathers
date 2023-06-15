import React from "react";
import ProcurarSection from "../components/destaques/ProcurarSection/ProcurarSection";
import SearchInputField from "../components/search/SearchInputField";
import { ModalMaisFiltrosProvider } from "../context/ModalMaisFiltrosProvider";
import { ProcurarAdvertisementsProvider } from "../context/ProcurarAdvertisementsProvider";

const Procurar = () => {
  return (
    <ModalMaisFiltrosProvider>
      <ProcurarAdvertisementsProvider>
        <div>
          <div className="flex flex-col justify-center px-5 lg:flex-row lg:px-0">
            <SearchInputField />
          </div>
          <div className="my-10">
            <ProcurarSection />
          </div>
        </div>
      </ProcurarAdvertisementsProvider>
    </ModalMaisFiltrosProvider>
  );
};

export default Procurar;
