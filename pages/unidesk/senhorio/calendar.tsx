import { createPagesServerClient, User } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CalendarComponent } from "../../../components/calendar/CalendarComponent";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import Button from "../../../components/utils/Button";
import Input from "../../../components/utils/Input";
import IconReviews from "../../../public/images/icon-pg37-1.svg";
import PopoverSelect, { PopoverOption } from "../../../components/utils/PopoverSelect";
import {
  Advertisement,
  Advertisements,
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
} from "../../../models/advertisement";
import { ReservationWithTenant } from "../../../models/reservation";
import { trpc } from "../../../utils/trpc";
import { isNumeric } from "../../../utils/utils";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";
import { UNIDESK_URL } from "../../../models/paths";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ESTADIA_MINIMA = [
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
];

const TEMPO_ANTECEDENCIA = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
];

const breadcrumbPaths = [
  { url: UNIDESK_URL, label: "uni-desk" },
  { url: "", label: "admin:calendar.calendar" },
] as BreadcrumbPath[];

type AdvertisementWithReservation = Advertisement & { reservations: ReservationWithTenant[] };

type CalendarPageProps = {
  advertisements: AdvertisementWithReservation[];
  user: User;
};

const CalendarPage = ({ advertisements }: CalendarPageProps) => {
  const { t } = useTranslation();
  const [selectedAdvertisement, setSelectedAdvertisement] = useState<AdvertisementWithReservation | undefined>(
    (advertisements && advertisements[0]) || undefined
  );
  const [loadingButtons, setLoadingButtons] = useState<{ timingsLoading: boolean; discountsLoading: boolean }>({
    timingsLoading: false,
    discountsLoading: false,
  });

  const popoverOptions = advertisements.map((advertisement) => ({
    value: advertisement.slug,
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
          if (data.error) return toast.error(t("messages:errors.saving_user_info"));
          toast.success(t("messages:success.success"));
        },
        onError: () => {
          toast.error(t("messages:errors.saving_user_info"));
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
          if (data.error) return toast.error(t("messages:errors.saving_user_info"));
          toast.success(t("messages:success.success"));
        },
        onError: () => {
          toast.error(t("messages:errors.saving_user_info"));
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
    <section className="max-width">
      <Breadcrumbs paths={breadcrumbPaths} icon={IconReviews} />
      <UnideskStructure>
        <UnideskStructure.Menu>
          <MenuSenhorio activeSection="uni-controlo" activeUrl="calendar" />
        </UnideskStructure.Menu>
        <UnideskStructure.Content>
          <div>
            <div>
              <PopoverSelect
                title={selectedAdvertisement?.title || ""}
                options={popoverOptions || []}
                onClick={() => changeAdvertisementCalendar}
                selectedOption={selectedAdvertisement?.slug}
              />
            </div>
          </div>
          {selectedAdvertisement && (
            <div className="mt-4 flex flex-col gap-2 px-2">
              <h2 className="text-2xl font-black text-black">{t("admin:calendar.calendar")}</h2>
              <h4 className="text-xl text-primary-500">{t("admin:calendar.description_update")}</h4>
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
    </section>
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
  const { t } = useTranslation();
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
        <label className="mb-2 mt-2 block text-base lg:mb-0">{t("admin:calendar.minimum_stay")}</label>
        <select
          className="h-12 w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2 lg:ml-20 lg:w-60"
          value={minimumStay}
          onChange={(e) => setMinimumStay(Number(e.target.value))}
        >
          {ESTADIA_MINIMA.map((option) => (
            <option key={option.value} value={option.value}>
              {t("admin:calendar.monthWithCount", { count: option.value })}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:align-middle">
        <label className="mb-2 mt-2 block text-base lg:mb-0">{t("admin:calendar.advance_time")}</label>
        <select
          className="h-12 w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2 lg:ml-4 lg:w-60"
          value={monthsInAdvance}
          onChange={(e) => setMonthsInAdvance(Number(e.target.value))}
        >
          {TEMPO_ANTECEDENCIA.map((option) => (
            <option key={option.value} value={option.value}>
              {t("admin:calendar.monthWithCount", { count: option.value })}
            </option>
          ))}
        </select>
      </div>

      <div className="w-96 pb-4">
        <Button onClick={() => updateTimings(minimumStay, monthsInAdvance)} type="button" loading={timingsLoading}>
          {t("save_changes")}
        </Button>
      </div>

      <div className="mb-5 mt-4 flex flex-col gap-4">
        <div className="mt-4 text-2xl font-bold">{t("admin:calendar.discounts")}</div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:align-middle">
          <label className="block text-base lg:mb-0">{t("admin:calendar.trimester_discount")}</label>
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
          <label className="block text-base lg:mb-0">{t("admin:calendar.semester_discount")}</label>
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
            {t("save_changes")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
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
        destination: `auth/login`,
        permanent: false,
        locale: locale,
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
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
