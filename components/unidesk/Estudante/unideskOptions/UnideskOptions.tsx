import React from "react";
import { UNIDESK_STAY_URL } from "../../../../models/paths";
import { MenuSectionCard } from "../../components/MenuSectionCard";
import { useTranslation } from "next-i18next";

const unideskOptions = [
  {
    link: UNIDESK_STAY_URL,
    blocked: false,
    text: "Informações gerais",
  },
  {
    blocked: true,
    text: "Renda",
  },
  {
    blocked: true,
    text: "Reparações",
  },
  {
    blocked: true,
    text: "Despesas",
  },
  {
    blocked: true,
    text: "Informações contratuais",
  },
] as { link?: string; blocked: boolean; text: string }[];

const UnideskOptions = () => {
  const { t } = useTranslation();
  return (
    <section className="container mx-auto my-32 flex flex-col gap-7 lg:flex-row">
      <MenuSectionCard topIcon={{ text: t("my_stay"), image: "/images/icon-pg14-1.svg" }} options={unideskOptions} />

      <MenuSectionCard
        topIcon={{ link: "/unidesk/estudante/favourites", text: t("favourites"), image: "/images/icon-pg14-2.svg" }}
        options={[]}
      />

      <MenuSectionCard
        topIcon={{ text: t("inbox"), image: "/images/iconCaixa.svg", link: "/unidesk/inbox" }}
        options={[]}
      />

      <MenuSectionCard
        topIcon={{ link: "/unidesk/notifications", text: t("notifications"), image: "/images/notificationsIcon.svg" }}
        options={[]}
      />
    </section>
  );
};

export default UnideskOptions;
