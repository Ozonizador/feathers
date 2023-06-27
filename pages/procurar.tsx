import React from "react";
import ProcurarSection from "../components/destaques/ProcurarSection/ProcurarSection";
import SearchInputField from "../components/search/SearchInputField";
import { ModalMaisFiltrosProvider } from "../context/ModalMaisFiltrosProvider";
import { ProcurarAdvertisementsProvider } from "../context/ProcurarAdvertisementsProvider";
import { GetServerSidePropsContext } from "next";

const Procurar = () => {
  return (
    <ModalMaisFiltrosProvider>
      <ProcurarAdvertisementsProvider>
        <div>
          <div className="max-width flex flex-col justify-center px-5 lg:flex-row lg:px-0">
            <SearchInputField />
          </div>
          <div className="max-width my-10">
            <ProcurarSection />
          </div>
        </div>
      </ProcurarAdvertisementsProvider>
    </ModalMaisFiltrosProvider>
  );
};

export default Procurar;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const query = ctx.query;

  // TODO: adding city
  const { city } = query;

  return {
    props: {},
  };
};
