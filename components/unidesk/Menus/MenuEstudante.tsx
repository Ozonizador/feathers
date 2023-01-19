import React from "react";
import { MenuItem } from "../../menu/Menu";
import { useRouter } from "next/router";
import { UNIDESK_STAY_URL } from "../../../models/paths";

const MenuEstudante = () => {
  const router = useRouter();

  const moveToMenuLink = (href: string) => {
    href && router.push(href);
  };

  const checkActiveLink = (href: string) => {
    return (href && router.asPath.includes(href)) || false;
  };

  return (
    <div className="rounded-2xl bg-terciary-600 p-2">
      <div className="flex justify-start border-b border-b-primary-500 px-2 align-middle">
        <h1 className="py-1 pl-1 text-xl font-bold">Minha estadia</h1>
      </div>
      <div className="mt-1 flex flex-col justify-start px-2">
        <div className="flex flex-col">
          <MenuItem
            clickOnLink={moveToMenuLink}
            url={UNIDESK_STAY_URL}
            label={"Informações gerais"}
            activeLink={checkActiveLink(UNIDESK_STAY_URL)}
          />
          <MenuItem
            blocked={true}
            clickOnLink={moveToMenuLink}
            url={""}
            label={"Renda"}
            activeLink={checkActiveLink("")}
          />
          <MenuItem
            blocked={true}
            clickOnLink={moveToMenuLink}
            url={""}
            label={"Reparações"}
            activeLink={checkActiveLink("")}
          />
          <MenuItem
            blocked={true}
            clickOnLink={moveToMenuLink}
            url={""}
            label={"Despesas"}
            activeLink={checkActiveLink("")}
          />
          <MenuItem
            blocked={true}
            clickOnLink={moveToMenuLink}
            url={""}
            label={"Informações contratuais"}
            activeLink={checkActiveLink("")}
          />
          <MenuItem
            clickOnLink={moveToMenuLink}
            url={"/unidesk/estudante/favourites"}
            label={"Favoritos"}
            activeLink={checkActiveLink("/unidesk/estudante/favourites")}
          />
          <MenuItem
            clickOnLink={moveToMenuLink}
            url={"/unidesk/inbox"}
            label={"Caixa de Entrada"}
            activeLink={checkActiveLink("/unidesk/inbox")}
          />
          <MenuItem
            clickOnLink={moveToMenuLink}
            url={"/unidesk/notifications"}
            label={"Notificações"}
            activeLink={checkActiveLink("/unidesk/notifications")}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuEstudante;
