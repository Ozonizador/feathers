import { ReactNode, useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AdvertisementWithReviewAverage, TypeAmenity } from "../models/advertisement";
import { FilterAdvertisements, AdvertisementsFilterOptions, AdvertisementOrder } from "../server/types/advertisement";

import { trpc } from "../utils/trpc";
import { isArray } from "lodash";

/* FILTERS */

export const defaultFilter = {
  filter: {
    comodities: [],
    placeType: "ALL",
    price: {
      startRange: null,
      endRange: null,
    },
    coordinates: null,
    dates: {
      startDate: null,
      endDate: null,
    },
  },
  order: {
    byColumn: "price",
    type: "asc",
    isActive: false,
  },
  verified: false,
  eventsAllowed: false,
  smokingAllowed: false,
  animalsAllowed: false,
  includesCleaning: false,
  expensesIncluded: false,
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
  filter: FilterAdvertisements;
  children: ReactNode;
}

/* Context */
export const ProcurarAdvertisementsProvider = ({
  children,
  filter,
}: ProcurarAdvertisementsProviderProps): JSX.Element => {
  const [currentFilter, setCurrentFilter] = useState<FilterAdvertisements & { page?: number | null }>(filter);
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

    if (currentFilter.order.byColumn == "rating") {
      data.data.forEach((ad) => {
        // @ts-ignore
        if (ad.overall_average.length == 0) {
          // @ts-ignore
          ad.overall_average = 0;
          // @ts-ignore
        } else if (isArray(ad.overall_average)) {
          // @ts-ignore
          ad.overall_average =
          // @ts-ignore
            ad.overall_average.reduce((sum, item) => sum + (item.overall_average || 0), 0) / ad.overall_average.length;
        }
      });
  
      const array = data.data
        // @ts-ignore
        .sort((a, b) => parseFloat(a.overall_average) - parseFloat(b.overall_average))
        .reverse()
        .slice(0, 10);

        setAdvertisementsInfo((oldState) => ({
          ...oldState,
          advertisements:
            (array && (array as unknown as AdvertisementWithReviewAverage[])) ||
            [],
          count: data.count || 0,
          loading: false,
        }));
    } else {
      setAdvertisementsInfo((oldState) => ({
        ...oldState,
        advertisements:
          (data && (data.data as unknown as AdvertisementWithReviewAverage[])) ||
          [],
        count: data.count || 0,
        loading: false,
      }));
    }
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
