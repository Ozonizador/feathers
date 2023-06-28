import React from "react";
import ProcurarSection from "../components/destaques/ProcurarSection/ProcurarSection";
import SearchInputField from "../components/search/SearchInputField";
import { ModalMaisFiltrosProvider } from "../context/ModalMaisFiltrosProvider";
import { ProcurarAdvertisementsProvider, defaultFilter } from "../context/ProcurarAdvertisementsProvider";
import { GetServerSidePropsContext } from "next";
import { FilterAdvertisements } from "../server/types/advertisement";
import { giveSearchByLocationSearch } from "../hooks/mapService";
import { coordinatesArrayToGeoPoint } from "../utils/map-services";

type ProcurarProps = {
  filter: FilterAdvertisements;
};

const Procurar = ({ filter }: ProcurarProps) => {
  return (
    <ModalMaisFiltrosProvider>
      <ProcurarAdvertisementsProvider filter={filter}>
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

  let serverFilter: FilterAdvertisements = defaultFilter;
  const { filter, order } = serverFilter;

  const { city } = query;
  if (city) {
    const { data, error } = await giveSearchByLocationSearch(city as string);
    if (!error && data) {
      const firstSearch = data.features[0];
      const coordinates = coordinatesArrayToGeoPoint(firstSearch.center);
      return {
        props: { filter: { filter: { ...filter, coordinates }, order } },
      };
    }
  }

  // map box query

  return {
    props: {
      filter: serverFilter,
    },
  };
};
