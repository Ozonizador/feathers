import React from "react";
import { useState } from "react";
import { useSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import { useRouter } from "next/router";
import Menu, { MenuGrouper, MenuOption } from "../../menu/Menu";
import {
  UNICONTROLO_GUESTS_URL,
  UNIDESK_SENHORIO_CALENDAR_URL,
  UNIDESK_SENHORIO_REVIEWS_URL,
} from "../../../models/paths";

type MenuSenhorioProps = {
  activeSection: "adverts" | "single_advert" | "inbox" | "uni-controlo" | "notifications";
};

const MenuSenhorio = ({ activeSection }: MenuSenhorioProps) => {
  const router = useRouter();
  const [openUniControlo, setOpenUniControlo] = useState(false);
  const currentAdvertisement = useSelectedAnuncioMenuSenhorio();

  const checkActiveLink = (href: string) => {
    return router.asPath.includes(href);
  };
  return (
    <>
      <Menu>
        <MenuGrouper
          title={"Anúncios"}
          selectedGroup={activeSection === "adverts"}
          isCollapsible={false}
          isOpen={false}
        >
          <MenuOption
            url={"/unidesk/senhorio/advertisements"}
            label={"Painel"}
            activeLink={checkActiveLink("/unidesk/senhorio/advertisements")}
          ></MenuOption>
        </MenuGrouper>
        {currentAdvertisement && (
          <MenuGrouper
            title={`Anúncio - {currentAdvertisement.title || "#"}`}
            selectedGroup={activeSection === "single_advert"}
            isCollapsible={true}
            isOpen={false}
          >
            <MenuOption
              url={`/unidesk/senhorio/${currentAdvertisement.slug}/details`}
              label="Detalhes do anúncio"
            ></MenuOption>
            <MenuOption
              url={`/unidesk/senhorio/${currentAdvertisement.slug}/details`}
              label="Detalhes do anúncio"
            ></MenuOption>
            <MenuOption url={`/unidesk/senhorio/${currentAdvertisement.slug}/photos`} label="Fotos"></MenuOption>
            <MenuOption
              url={`/unidesk/senhorio/${currentAdvertisement.slug}/conditions`}
              label="Condições e regras"
            ></MenuOption>
            <MenuOption url={`/unidesk/senhorio/${currentAdvertisement.slug}/prices`} label="Preços"></MenuOption>
            <MenuOption url={""} label="Informações contratuais" blocked={true}></MenuOption>
          </MenuGrouper>
        )}

        <MenuGrouper
          title={"Caixa de entrada"}
          url={"/unidesk/inbox"}
          selectedGroup={activeSection === "inbox"}
          isCollapsible={false}
          isOpen={false}
        />
        <MenuGrouper
          isCollapsible={true}
          setOpen={() => setOpenUniControlo(!openUniControlo)}
          isOpen={openUniControlo}
          title={"Uni-controlo"}
          selectedGroup={activeSection === "uni-controlo"}
        >
          <MenuOption blocked={false} url={UNIDESK_SENHORIO_CALENDAR_URL} label="Calendário" activeLink={false} />
          <MenuOption blocked={false} url={UNIDESK_SENHORIO_REVIEWS_URL} label="Reviews" activeLink={false} />
          <MenuOption blocked={false} url={UNICONTROLO_GUESTS_URL} label="Hóspedes" activeLink={false} />
          <MenuOption blocked={true} url="" label="Transações" activeLink={false} />
          <MenuOption blocked={true} url="" label="Despesas" activeLink={false} />
          <MenuOption blocked={true} url="" label="Reparações" activeLink={false} />
        </MenuGrouper>
        <MenuGrouper
          title={"Notificações"}
          selectedGroup={activeSection === "notifications"}
          isCollapsible={false}
          isOpen={false}
          url={"/unidesk/notifications"}
        />
      </Menu>
    </>
  );
};

export default MenuSenhorio;
