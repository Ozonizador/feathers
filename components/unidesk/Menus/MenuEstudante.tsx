import React from "react";
import { useRouter } from "next/router";
import { INBOX_URL, NOTIFICATIONS_URL, UNIDESK_STAY_URL, UNIDESK_STUDENT_FAVOURITES_URL } from "../../../models/paths";
import Menu, { MenuGrouper, MenuOption } from "../../menu/Menu";
import { useTranslation } from "next-i18next";

type MenuEstudanteProps = {
  activeSection: "stay" | "favourites" | "inbox" | "notifications";
  activeUrl: "general" | "repairs" | "favourites";
};

const MenuEstudante = ({ activeSection, activeUrl }: MenuEstudanteProps) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuGrouper
        title={"Minha estadia"}
        selectedGroup={activeSection === "stay"}
        isCollapsed={true}
        defaultOpen={activeSection === "stay"}
      >
        <MenuOption
          url={UNIDESK_STAY_URL}
          label={"Informações gerais"}
          activeLink={activeUrl == "general"}
        ></MenuOption>
        <MenuOption blocked={true} url={""} label={"Renda"} />
        <MenuOption blocked={true} url={""} label={"Reparações"} />
        <MenuOption blocked={true} url={""} label={"Despesas"} />
        <MenuOption blocked={true} url={""} label={"Informações contratuais"} />
      </MenuGrouper>
      <MenuGrouper
        url={UNIDESK_STUDENT_FAVOURITES_URL}
        title={"Favoritos"}
        selectedGroup={activeSection == "favourites"}
        isCollapsed={false}
      />
      <MenuGrouper title={t("inbox")} url={INBOX_URL} selectedGroup={activeSection === "inbox"} isCollapsed={false} />
      <MenuGrouper
        title={t("notifications")}
        selectedGroup={activeSection === "notifications"}
        isCollapsed={false}
        url={NOTIFICATIONS_URL}
      />
    </Menu>
  );
};

export default MenuEstudante;
