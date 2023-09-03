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
import { useTranslation } from "next-i18next";

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
          label={t("admin:unidesk.common.panel")}
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
            label={t("advertisements:photo", { count: 2 })}
            activeLink={activeUrl === "advert_photos"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/conditions`}
            label="Condições e regras"
            activeLink={activeUrl === "advert_conditions"}
          ></MenuOption>
          <MenuOption
            url={`/unidesk/senhorio/${currentAdvertisement.slug}/prices`}
            label={t("advertisements:price", { count: 2 })}
            activeLink={activeUrl === "advert_prices"}
          ></MenuOption>
          <MenuOption url={""} label="admin:unidesk.common.contracts" blocked={true}></MenuOption>
        </MenuGrouper>
      )}

      <MenuGrouper title={t("inbox")} url={INBOX_URL} selectedGroup={activeSection === "inbox"} isCollapsed={false} />
      <MenuGrouper
        isCollapsed={true}
        title={"Uni-controlo"}
        selectedGroup={activeSection === "uni-controlo"}
        defaultOpen={activeSection === "uni-controlo"}
      >
        <MenuOption
          blocked={false}
          url={UNIDESK_SENHORIO_CALENDAR_URL}
          label="admin:unidesk.common.calendar"
          activeLink={activeUrl === "calendar"}
        />
        <MenuOption
          blocked={false}
          url={UNIDESK_SENHORIO_REVIEWS_URL}
          label={t("admin:unidesk.landlord.reviews")}
          activeLink={activeUrl === "reviews"}
        />
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
