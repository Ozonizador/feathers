import { useCallback, useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AdvertisementWithReviewAverage, TypeAmenity } from "../models/advertisement";
import { getFilteredAdvertisements } from "../services/advertisementService";

/* FILTERS */
export interface FilterAdvertisements {
  filter: Partial<FilterOptions>;
  order: Partial<AdvertOrder>;
}

export interface FilterOptions {
  comodities: TypeAmenity[];
  placeType: "ALL" | "ENTIRE_SPACE" | "SHARED_ROOM" | "PRIVATE_ROOM";
  price: {
    startRange: number | null;
    endRange: number | null;
  };
  dates: {
    startDate: Date;
    endDate: Date;
  };
  address: string;
}
export interface AdvertOrder {
  byColumn: "price";
  type: "asc" | "desc";
  isActive: true | false;
}

/* DEFAULT VALUE */
const defaultFilter = {
  filter: {
    comodities: [],
    placeType: "ALL",
    price: {
      startRange: null,
      endRange: null,
    },
    address: "",
  },
  order: {
    byColumn: "price",
    type: "asc",
    isActive: false,
  },
} as FilterAdvertisements;

/* Filters */
const ProcurarAdvertisementsContext = createContext<FilterAdvertisements>(defaultFilter);
const SetProcurarAdvertisementsContext = createContext<Dispatch<SetStateAction<FilterAdvertisements>>>(() => {});

/* Advertisments */

interface AdvertisementsOnPage {
  advertisements: AdvertisementWithReviewAverage[];
  count: number;
  page: number;
  loading: boolean;
}

const defaultAdvertisements = {
  advertisements: [],
  count: 0,
  page: 1,
  loading: false,
};

const AdvertisementsContext = createContext<AdvertisementsOnPage>(defaultAdvertisements);
const SetAdvertisementsContext = createContext<Dispatch<SetStateAction<AdvertisementsOnPage>>>(() => {});

/* Context */
export const ProcurarAdvertisementsProvider = ({ children }): JSX.Element => {
  const [currentFilter, setCurrentFilter] = useState<FilterAdvertisements>(defaultFilter);
  const [advertisementsInfo, setAdvertisementsInfo] = useState<AdvertisementsOnPage>(defaultAdvertisements);

  const getAdvertisements = useCallback(async () => {
    setAdvertisementsInfo((oldState) => ({ ...oldState, loading: true }));
    // load advertisements
    const { data, error, count } = await getFilteredAdvertisements(advertisementsInfo.page, currentFilter);
    if (!error) {
      setAdvertisementsInfo((oldState) => ({ ...oldState, advertisements: data, count, loading: false }));
    }
  }, [advertisementsInfo.page, currentFilter]);

  useEffect(() => {
    getAdvertisements();
  }, [getAdvertisements]);

  return (
    <ProcurarAdvertisementsContext.Provider value={currentFilter}>
      <SetProcurarAdvertisementsContext.Provider value={setCurrentFilter}>
        <AdvertisementsContext.Provider value={advertisementsInfo}>
          <SetAdvertisementsContext.Provider value={setAdvertisementsInfo}>
            {children}
          </SetAdvertisementsContext.Provider>
        </AdvertisementsContext.Provider>
      </SetProcurarAdvertisementsContext.Provider>
    </ProcurarAdvertisementsContext.Provider>
  );
};

export const useCurrentProcurarAdvertisementContext = () => {
  return useContext(ProcurarAdvertisementsContext);
};

export const useAdvertisementInfo = () => {
  return useContext(AdvertisementsContext);
};

export const useSetPageAdvertisementinfo = () => {
  const setPage = useContext(SetAdvertisementsContext);
  const advertInfo = useContext(AdvertisementsContext);
  return (page: number) => {
    setPage({ ...advertInfo, page });
  };
};

export const useSetFiltersContext = () => {
  const setFilters = useContext(SetProcurarAdvertisementsContext);
  return (filters: Partial<FilterOptions>) => {
    setFilters((oldFilters) => ({ ...oldFilters, filter: { ...oldFilters.filter, ...filters } }));
  };
};

export const useSetOrderContext = () => {
  const setFilters = useContext(SetProcurarAdvertisementsContext);
  return (order: AdvertOrder) => {
    setFilters((oldFilters) => ({ ...oldFilters, order }));
  };
};
