import React from "react";
import { MenuSectionCard } from "../../components/MenuSectionCard";

const optionAnuncios = [
  {
    link: "unidesk/senhorio/advertisements",
    blocked: false,
    text: "Painel",
  },
  {
    blocked: true,
    text: "Informações contratuais",
  },
  {
    link: "/unidesk/senhorio/reservas",
    blocked: false,
    text: "Reservas",
  },
  {
    link: "unidesk/senhorio/calendar",
    blocked: false,
    text: "Calendário",
  },
  {
    link: "unidesk/senhorio/reviews",
    blocked: false,
    text: "Reviews",
  },
] as { link?: string; blocked: boolean; text: string }[];

const optionUniControl = [
  {
    link: "/unidesk/unicontrolo/guests",
    blocked: false,
    text: "Hóspedes",
  },
  {
    blocked: true,
    text: "Transações",
  },
  {
    blocked: true,
    text: "Despesas",
  },
  {
    blocked: true,
    text: "Reparações",
  },
] as { link?: string; blocked: boolean; text: string }[];

const UnideskOptions = () => {
  return (
    <section className="container mx-auto my-32 flex flex-col gap-7 lg:flex-row">
      <MenuSectionCard topIcon={{ text: "Anúncios", image: "/images/icon-pg37-1.svg" }} options={optionAnuncios} />

      <MenuSectionCard
        topIcon={{ text: "Caixa de entrada", image: "/images/iconCaixa.svg", link: "/unidesk/inbox" }}
        options={[]}
      />

      <MenuSectionCard
        topIcon={{ text: "Uni-controlo", image: "/images/icon-pg37-2.svg" }}
        options={optionUniControl}
      />

      <MenuSectionCard
        topIcon={{ link: "/unidesk/notifications", text: "Notificações", image: "/images/notificationsIcon.svg" }}
        options={[]}
      />
    </section>
  );
};

export default UnideskOptions;
