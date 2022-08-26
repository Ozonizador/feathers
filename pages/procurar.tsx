import React from "react";
import ProcurarSection from "../components/destaques/ProcurarSection/ProcurarSection";
import SearchInputField from "../components/search/SearchInputField";
import { ProcurarAdvertisementsProvider } from "../context/ProcurarAdvertisementsProvider";

const Procurar = () => {
  return (
    <ProcurarAdvertisementsProvider>
      <div>
        <div className="flex flex-col justify-center  lg:flex-row">
          <SearchInputField />
        </div>
        <div className="my-10">
          <ProcurarSection />
        </div>
      </div>
    </ProcurarAdvertisementsProvider>
  );
};

export const getServerSideProps = async () => {
  return { props: {} };
};

export default Procurar;
