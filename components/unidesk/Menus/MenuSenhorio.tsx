import React from "react";
import { useSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import Menu, { MenuGrouper, MenuOption } from "../../menu/Menu";
import {
  INBOX_URL,
  NOTIFICATIONS_URL,
  UNICONTROLO_GUESTS_URL,
  UNIDESK_SENHORIO_CALENDAR_URL,
  UNIDESK_SENHORIO_PAINEL_URL,
  UNIDESK_SENHORIO_REVIEWS_URL,
} from "../../../models/paths";

type MenuSenhorioProps = {
  activeSection: "adverts" | "single_advert" | "inbox" | "uni-controlo" | "notifications";
  activeUrl:
    | "calendar"
    | "reviews"
    | "guests"
    | "advert_prices"
    | "advert_details"
    | "advert_photos"
    | "advert_conditions"
    | "main_panel"
    | "reservations";
};

const MenuSenhorio = ({ activeSection, activeUrl }: MenuSenhorioProps) => {
  const currentAdvertisement = useSelectedAnuncioMenuSenhorio();

  return (
    <Menu>
      <MenuGrouper
        title={"Anúncios"}
        selectedGroup={activeSection === "adverts"}
        isCollapsed={true}
        defaultOpen={activeSection === "adverts"}
      >
        <MenuOption
          url={UNIDESK_SENHORIO_PAINEL_URL}
          label={"Painel"}
          activeLink={activeUrl === "main_panel"}
        ></MenuOption>
      </MenuGrouper>
      {currentAdvertisement && (
        <MenuGrouper
          title={`Anúncio - ${currentAdvertisement.title || "#"}`}
          selectedGroup={activeSection === "single_advert"}
          isCollapsed={true}
        >
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/details`}
            label="Detalhes do anúncio"
            activeLink={activeUrl === "advert_details"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/photos`}
            label="Fotos"
            activeLink={activeUrl === "advert_photos"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/conditions`}
            label="Condições e regras"
            activeLink={activeUrl === "advert_conditions"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/prices`}
            label="Preços"
            activeLink={activeUrl === "advert_prices"}
          ></MenuOption>
          <MenuOption url={""} label="Informações contratuais" blocked={true}></MenuOption>
        </MenuGrouper>
      )}

      <MenuGrouper
        title={"Caixa de entrada"}
        url={INBOX_URL}
        selectedGroup={activeSection === "inbox"}
        isCollapsed={false}
      />
      <MenuGrouper
        isCollapsed={true}
        title={"Uni-controlo"}
        selectedGroup={activeSection === "uni-controlo"}
        defaultOpen={activeSection === "uni-controlo"}
      >
        <MenuOption
          blocked={false}
          url={UNIDESK_SENHORIO_CALENDAR_URL}
          label="Calendário"
          activeLink={activeUrl === "calendar"}
        />
        <MenuOption
          blocked={false}
          url={UNIDESK_SENHORIO_REVIEWS_URL}
          label="Reviews"
          activeLink={activeUrl === "reviews"}
        />
        <MenuOption blocked={false} url={UNICONTROLO_GUESTS_URL} label="Hóspedes" activeLink={activeUrl === "guests"} />
        <MenuOption blocked={true} url="" label="Transações" activeLink={false} />
        <MenuOption blocked={true} url="" label="Despesas" activeLink={false} />
        <MenuOption blocked={true} url="" label="Reparações" activeLink={false} />
      </MenuGrouper>
      <MenuGrouper
        title={"Notificações"}
        selectedGroup={activeSection === "notifications"}
        isCollapsed={false}
        url={NOTIFICATIONS_URL}
      />
    </Menu>
  );
};

export default MenuSenhorio;
