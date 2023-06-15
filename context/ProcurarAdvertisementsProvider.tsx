import { ReactNode, useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AdvertisementWithReviewAverage, TypeAmenity } from "../models/advertisement";
import { FilterAdvertisements, AdvertisementsFilterOptions, AdvertisementOrder } from "../server/types/advertisement";

import { trpc } from "../utils/trpc";

/* FILTERS */

/* DEFAULT VALUE */
const defaultFilter = {
  filter: {
    comodities: [],
    placeType: "ALL",
    price: {
      startRange: undefined,
      endRange: undefined,
    },
    coordinates: undefined,
    dates: {
      startDate: undefined,
      endDate: undefined,
    },
  },
  order: {
    byColumn: "price",
    type: "asc",
    isActive: false,
  },
  modalMoreFiltersOpen: false,
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

interface ProcurarAdvertisementsProviderProps {
  children: ReactNode;
}

/* Context */
export const ProcurarAdvertisementsProvider = ({ children }: ProcurarAdvertisementsProviderProps): JSX.Element => {
  const [currentFilter, setCurrentFilter] = useState<FilterAdvertisements & { page?: number | null }>(defaultFilter);
  const [advertisementsInfo, setAdvertisementsInfo] = useState<AdvertisementsOnPage>(defaultAdvertisements);

  const { data, error } = trpc.advertisements.searchForAdvertisements.useQuery({
    ...currentFilter,
    page: advertisementsInfo.page,
  });

  useEffect(() => {
    setAdvertisementsInfo((oldState) => ({ ...oldState, loading: true }));
  }, [currentFilter, advertisementsInfo.page]);

  useEffect(() => {
    if (error || !data) return;

    setAdvertisementsInfo((oldState) => ({
      ...oldState,
      advertisements: (data && (data.data as unknown as AdvertisementWithReviewAverage[])) || [],
      count: data.count || 0,
      loading: false,
    }));
  }, [data]);

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
  return (filters: Partial<AdvertisementsFilterOptions>) => {
    setFilters((oldFilters: FilterAdvertisements) => ({ ...oldFilters, filter: { ...oldFilters.filter, ...filters } }));
  };
};

export const useSetOrderContext = () => {
  const setFilters = useContext(SetProcurarAdvertisementsContext);
  return (order: AdvertisementOrder) => {
    setFilters((oldFilters: FilterAdvertisements) => ({ ...oldFilters, order }));
  };
};

export const useSetComoditiesContext = () => {
  const setFilters = useContext(SetProcurarAdvertisementsContext);
  return (comodities: TypeAmenity[]) => {
    setFilters((oldFilters: FilterAdvertisements) => ({
      ...oldFilters,
      filter: { ...oldFilters.filter, comodities: comodities },
    }));
  };
};
