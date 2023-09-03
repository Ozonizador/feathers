import React from "react";
import { MenuSectionCard } from "../../components/MenuSectionCard";
import { useTranslation } from "next-i18next";

const optionAnuncios = [
  {
    link: "unidesk/senhorio/advertisements",
    blocked: false,
    text: "admin:unidesk.common.panel",
  },
  {
    blocked: true,
    text: "admin:unidesk.common.contracts",
  },
  {
    link: "/unidesk/senhorio/reservas",
    blocked: false,
    text: "reservation_other",
  },
  {
    link: "unidesk/senhorio/calendar",
    blocked: false,
    text: "admin:unidesk.common.calendar",
  },
  {
    link: "unidesk/senhorio/reviews",
    blocked: false,
    text: "admin:unidesk.landlord.reviews",
  },
] as { link?: string; blocked: boolean; text: string }[];

const optionUniControl = [
  {
    link: "/unidesk/unicontrolo/guests",
    blocked: false,
    text: "guest_other",
  },
  {
    blocked: true,
    text: "admin:unidesk.landlord.transactions",
  },
  {
    blocked: true,
    text: "admin:unidesk.student.expenses",
  },
  {
    blocked: true,
    text: "admin:unidesk.student.repairs",
  },
] as { link?: string; blocked: boolean; text: string }[];

const UnideskOptions = () => {
  const { t } = useTranslation();
  return (
    <section className="container mx-auto my-32 flex flex-col gap-7 lg:flex-row">
      <MenuSectionCard topIcon={{ text: "Anúncios", image: "/images/icon-pg37-1.svg" }} options={optionAnuncios} />

      <MenuSectionCard
        topIcon={{ text: t("inbox"), image: "/images/iconCaixa.svg", link: "/unidesk/inbox" }}
        options={[]}
      />

      <MenuSectionCard
        topIcon={{ text: "Uni-controlo", image: "/images/icon-pg37-2.svg" }}
        options={optionUniControl}
      />

      <MenuSectionCard
        topIcon={{ link: "/unidesk/notifications", text: t("notifications"), image: "/images/notificationsIcon.svg" }}
        options={[]}
      />
    </section>
  );
};

export default UnideskOptions;
