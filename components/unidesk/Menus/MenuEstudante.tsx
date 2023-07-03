import React from "react";
import { useRouter } from "next/router";
import { INBOX_URL, NOTIFICATIONS_URL, UNIDESK_STAY_URL, UNIDESK_STUDENT_FAVOURITES_URL } from "../../../models/paths";
import Menu, { MenuGrouper, MenuOption } from "../../menu/Menu";

type MenuEstudanteProps = {
  activeSection: "stay" | "favourites" | "inbox" | "notifications";
  activeUrl: "general" | "repairs" | "favourites";
};

const MenuEstudante = ({ activeSection, activeUrl }: MenuEstudanteProps) => {
  const router = useRouter();

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
      <MenuGrouper
        title={"Caixa de entrada"}
        url={INBOX_URL}
        selectedGroup={activeSection === "inbox"}
        isCollapsed={false}
      />
      <MenuGrouper
        title={"Notificações"}
        selectedGroup={activeSection === "notifications"}
        isCollapsed={false}
        url={NOTIFICATIONS_URL}
      />
    </Menu>
  );
};

export default MenuEstudante;
