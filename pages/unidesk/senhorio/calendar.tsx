import { createPagesServerClient, User } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CalendarComponent } from "../../../components/calendar/CalendarComponent";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import Button from "../../../components/utils/Button";
import Input from "../../../components/utils/Input";
import PopoverSelect, { PopoverOption } from "../../../components/utils/PopoverSelect";
import {
  Advertisement,
  Advertisements,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
} from "../../../models/advertisement";
import { Reservation, ReservationWithTenant } from "../../../models/reservation";
import { trpc } from "../../../utils/trpc";
import { isNumeric } from "../../../utils/utils";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";

const ESTADIA_MINIMA = [
  { label: "3 Meses", value: 3 },
  { label: "4 Meses", value: 4 },
  { label: "5 Meses", value: 5 },
  { label: "6 Meses", value: 6 },
  { label: "7 Meses", value: 7 },
  { label: "8 Meses", value: 8 },
  { label: "9 Meses", value: 9 },
  { label: "10 Meses", value: 10 },
  { label: "11 Meses", value: 11 },
  { label: "12 Meses", value: 12 },
];

const TEMPO_ANTECEDENCIA = [
  { label: "1 Meses", value: 1 },
  { label: "2 Meses", value: 2 },
  { label: "3 Meses", value: 3 },
  { label: "4 Meses", value: 4 },
  { label: "5 Meses", value: 5 },
  { label: "6 Meses", value: 6 },
  { label: "7 Meses", value: 7 },
  { label: "8 Meses", value: 8 },
  { label: "9 Meses", value: 9 },
  { label: "10 Meses", value: 10 },
  { label: "11 Meses", value: 11 },
  { label: "12 Meses", value: 12 },
];

type AdvertisementWithReservation = Advertisement & { reservations: ReservationWithTenant[] };

type CalendarPageProps = {
  advertisements: AdvertisementWithReservation[];
  user: User;
};

const CalendarPage = ({ advertisements }: CalendarPageProps) => {
  const [selectedAdvertisement, setSelectedAdvertisement] = useState<AdvertisementWithReservation | undefined>(
    (advertisements && advertisements[0]) || undefined
  );
  const [loadingButtons, setLoadingButtons] = useState<{ timingsLoading: boolean; discountsLoading: boolean }>({
    timingsLoading: false,
    discountsLoading: false,
  });

  const popoverOptions = advertisements.map((advertisement) => ({
    label: advertisement.title,
    id: advertisement.id,
  })) as PopoverOption[];

  const updateAdvertisementTimings = trpc.advertisements.updateAdvertisementMinimumStayAndTimeInAdvance.useMutation();
  const updateAdvertisementDiscounts = trpc.advertisements.updateAdvertisementDiscounts.useMutation();

  const updateTimings = async (minimumStay: number, monthsInAdvance: number) => {
    if (!selectedAdvertisement) return;
    setLoadingButtons((oldStatus) => ({ ...oldStatus, timingsLoading: true }));

    await updateAdvertisementTimings.mutateAsync(
      {
        minimumStay,
        monthsInAdvance,
        advertisementId: selectedAdvertisement.id,
      },
      {
        onSuccess: (data) => {
          if (data.error) return toast.error("Erro ao gravar definições");
          toast.success("Successo");
        },
        onError: () => {
          toast.error("Erro ao gravar definições");
        },
        onSettled: () => {
          setLoadingButtons((oldStatus) => ({ ...oldStatus, timingsLoading: false }));
        },
      }
    );
  };

  const updateDiscounts = async (trimesterDiscount: number, semesterDiscount: number) => {
    if (!selectedAdvertisement) return;
    setLoadingButtons((oldStatus) => ({ ...oldStatus, discountsLoading: true }));

    await updateAdvertisementDiscounts.mutateAsync(
      {
        semesterDiscount,
        trimesterDiscount,
        advertisementId: selectedAdvertisement.id,
      },
      {
        onSuccess: (data) => {
          if (data.error) return toast.error("Erro ao gravar definições");
          toast.success("Successo");
        },
        onError: () => {
          toast.error("Erro ao gravar definições");
        },
        onSettled: () => {
          setLoadingButtons((oldStatus) => ({ ...oldStatus, discountsLoading: false }));
        },
      }
    );
  };

  const changeAdvertisementCalendar = (advertisementId: string) => {
    const selectedAdvertisement = advertisements && advertisements.find((adv) => adv.id == advertisementId);
    setSelectedAdvertisement(selectedAdvertisement);
  };

  return (
    <UnideskStructure>
      <UnideskStructure.Menu>
        <MenuSenhorio />
      </UnideskStructure.Menu>
      <UnideskStructure.Content>
        <div>
          <div>
            <PopoverSelect
              title={selectedAdvertisement?.title || ""}
              options={popoverOptions || []}
              onClick={() => changeAdvertisementCalendar}
            />
          </div>
        </div>
        {selectedAdvertisement && (
          <div className="flex flex-col gap-2 px-2">
            <h2 className="text-2xl font-black text-black">Calendário</h2>
            <h4 className="text-xl text-primary-500">Não se esqueça de manter o seu calendário atualizado</h4>
            <div className="mt-5 w-full">
              <CalendarComponent reservations={selectedAdvertisement.reservations} />
            </div>
            <AdvertisementPropertiesComponent
              updateDiscounts={updateDiscounts}
              updateTimings={updateTimings}
              {...selectedAdvertisement}
              {...loadingButtons}
            />
          </div>
        )}
      </UnideskStructure.Content>
    </UnideskStructure>
  );
};

interface AdvertisementPropertiesComponentProps {
  updateDiscounts: (trimesterDiscount: number, semesterDiscount: number) => void;
  updateTimings: (minimumStay: number, timeInAdvance: number) => void;
  timingsLoading: boolean;
  discountsLoading: boolean;
  trimester_discount?: number;
  semester_discount?: number;
  minimum_stay?: number;
  months_notif_in_advance?: number;
}

const AdvertisementPropertiesComponent = ({
  updateTimings,
  updateDiscounts,
  trimester_discount,
  semester_discount,
  minimum_stay,
  months_notif_in_advance,
  timingsLoading,
  discountsLoading,
}: AdvertisementPropertiesComponentProps) => {
  const [minimumStay, setMinimumStay] = useState<number>(minimum_stay || 3);
  const [monthsInAdvance, setMonthsInAdvance] = useState<number>(months_notif_in_advance || 1);

  const [trimesterDiscount, setTrimesterDiscount] = useState<number>(trimester_discount || 0);
  const [semesterDiscount, setSemesterDiscount] = useState<number>(semester_discount || 0);

  const changeTrimesterDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const isNumber = isNumeric(value);
    if (isNumber) setTrimesterDiscount(Number(value));
  };

  const changeSemesterDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const isNumber = isNumeric(value);
    if (isNumber) setSemesterDiscount(Number(value));
  };

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:align-middle">
        <label className="mb-2 mt-2 block text-base lg:mb-0">Estadia mínima</label>
        <select
          className="h-12 w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2 lg:ml-20 lg:w-60"
          value={minimumStay}
          onChange={(e) => setMinimumStay(Number(e.target.value))}
        >
          {ESTADIA_MINIMA.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:align-middle">
        <label className="mb-2 mt-2 block text-base lg:mb-0">Tempo de antecedência</label>
        <select
          className="h-12 w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2 lg:ml-4 lg:w-60"
          value={monthsInAdvance}
          onChange={(e) => setMonthsInAdvance(Number(e.target.value))}
        >
          {TEMPO_ANTECEDENCIA.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-96 pb-4">
        <Button onClick={() => updateTimings(minimumStay, monthsInAdvance)} type="button" loading={timingsLoading}>
          Guardar alterações
        </Button>
      </div>

      <div className="mb-5 mt-4 flex flex-col gap-4">
        <div className="mt-4 text-2xl font-bold">Descontos (opcional)</div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:align-middle">
          <label className="block text-base lg:mb-0">Desconto trimestral</label>
          <div className="w-full lg:ml-12 lg:w-20">
            <Input
              name={""}
              labelText=""
              customCss="percent"
              onChange={(e) => changeTrimesterDiscount(e)}
              value={trimesterDiscount}
              pattern="[0-9]+"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:align-middle">
          <label className="block text-base lg:mb-0">Desconto semestral</label>
          <div className="w-full lg:ml-12 lg:w-20">
            <Input
              name={""}
              value={semesterDiscount}
              onChange={(e) => changeSemesterDiscount(e)}
              labelText=""
              customCss="percent"
              pattern="[0-9]+"
            />
          </div>
        </div>
        <div className="w-96 pb-4">
          <Button
            onClick={() => updateDiscounts(trimesterDiscount, semesterDiscount)}
            type="button"
            loading={discountsLoading}
          >
            Guardar alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { user } = session || { user: null };

  if (!session || !user)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const { data, error } = await supabase
    .from<"advertisements", Advertisements>(ADVERTISEMENT_TABLE_NAME)
    .select("*, reservations(*, tenant:tenant_id(*))")
    .eq(ADVERTISEMENT_PROPERTIES.HOST_ID, user.id);

  return {
    props: {
      initialSession: session,
      user: session.user,
      advertisements: error || !data ? [] : data,
    },
  };
};
