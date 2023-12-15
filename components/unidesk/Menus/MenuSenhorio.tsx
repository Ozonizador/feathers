import React from "react";
import { useSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import Menu, { MenuGrouper, MenuOption } from "../../menu/Menu";
import {
  INBOX_URL,
  NOTIFICATIONS_URL,
  UNICONTROLO_GUESTS_URL,
  UNIDESK_SENHORIO_CALENDAR_URL,
  UNIDESK_SENHORIO_PAINEL_URL,
  UNIDESK_SENHORIO_RESERVAS_URL,
  UNIDESK_SENHORIO_REVIEWS_URL,
} from "../../../models/paths";
import { useTranslation } from "next-i18next";
const isUrlInbox = INBOX_URL;
const menuPropValue = isUrlInbox ? 'yes' : 'no';
const modifiedURL = isUrlInbox ? `${INBOX_URL}?menu=${menuPropValue}` : INBOX_URL;

console.log(modifiedURL, "modified URL");
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
  | "reservations"
  |"inbox";
};

const MenuSenhorio = ({ activeSection, activeUrl }: MenuSenhorioProps) => {
  const currentAdvertisement = useSelectedAnuncioMenuSenhorio();
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuGrouper
        title={t("advertisement", { count: 2 })}
        selectedGroup={activeSection === "adverts"}
        isCollapsed={true}
        defaultOpen={activeSection === "adverts"}
      >
        <MenuOption
          url={UNIDESK_SENHORIO_PAINEL_URL}
          label={t("admin:unidesk.general.panel")}
          activeLink={activeUrl === "main_panel"}
        />
        <MenuOption
          url={UNIDESK_SENHORIO_RESERVAS_URL}
          label={t("admin:unidesk.general.reservations")}
          activeLink={activeUrl === "reservations"}
        />
        <MenuOption
          blocked={false}
          url={UNIDESK_SENHORIO_CALENDAR_URL}
          label="admin:unidesk.general.calendar"
          activeLink={activeUrl === "calendar"}
        />
        <MenuOption
          blocked={false}
          url={UNIDESK_SENHORIO_REVIEWS_URL}
          label={t("admin:unidesk.landlord.reviews")}
          activeLink={activeUrl === "reviews"}
        />
      </MenuGrouper>
      {currentAdvertisement && (
        <MenuGrouper
          title={`Anúncio - ${currentAdvertisement.title || "#"}`}
          selectedGroup={activeSection === "single_advert"}
          isCollapsed={true}
          defaultOpen={activeSection === "single_advert"}
        >
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/details`}
            label="Detalhes do anúncio"
            activeLink={activeUrl === "advert_details"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/photos`}
            label={t("advertisements:photo", { count: 2 })}
            activeLink={activeUrl === "advert_photos"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/conditions`}
            label={t("advertisements:conditions_and_rules")}
            activeLink={activeUrl === "advert_conditions"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/prices`}
            label={t("advertisements:price", { count: 2 })}
            activeLink={activeUrl === "advert_prices"}
          ></MenuOption>
          <MenuOption url={""} label="admin:unidesk.general.contracts" blocked={true}></MenuOption>
        </MenuGrouper>
      )}


      <MenuGrouper title={t("inbox")} url={modifiedURL} selectedGroup={activeSection === "inbox"} isCollapsed={false} />
      <MenuGrouper
        isCollapsed={true}
        title={"uni-controlo"}
        selectedGroup={activeSection === "uni-controlo"}
        defaultOpen={activeSection === "uni-controlo"}
      >
        <MenuOption
          blocked={false}
          url={UNICONTROLO_GUESTS_URL}
          label={t("guest", { count: 2 })}
          activeLink={activeUrl === "guests"}
        />
        <MenuOption blocked={true} url="" label={t("admin:unidesk.landlord.transactions")} activeLink={false} />
        <MenuOption blocked={true} url="" label={t("admin:unidesk.student.expenses")} activeLink={false} />
        <MenuOption blocked={true} url="" label={t("admin:unidesk.student.repairs")} activeLink={false} />
      </MenuGrouper>
      <MenuGrouper
        title={t("notifications")}
        selectedGroup={activeSection === "notifications"}
        isCollapsed={false}
        url={NOTIFICATIONS_URL}
      />
    </Menu>
  );
};

export default MenuSenhorio;
