import React from "react";
import { useState } from "react";
import { useSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import { useRouter } from "next/router";
import { MenuItem, MenuItemCollapsible } from "../../menu/Menu";

const MenuSenhorio = () => {
  const router = useRouter();
  const [openUniControlo, setOpenUniControlo] = useState(true);
  const currentAdvertisement = useSelectedAnuncioMenuSenhorio();

  const moveToMenuLink = (href: string) => {
    href && router.push(href);
  };

  const checkActiveLink = (href: string) => {
    return router.asPath.includes(href);
  };
  return (
    <>
      <div className="rounded-2xl bg-terciary-600 p-4">
        <div className="rounded-2xl bg-primary-300 p-4">
          <div className="mx-auto h-fit w-80 rounded-2xl bg-terciary-600 p-2">
            <div className="flex justify-start border border-b-primary-500 px-2 align-middle">
              <h1 className="py-1 text-xl font-bold">Anúncios</h1>
            </div>
            <div className="mt-2 flex flex-col px-2">
              <MenuItem
                clickOnLink={moveToMenuLink}
                url={"/unidesk/senhorio/advertisements"}
                label={"Painel"}
                activeLink={checkActiveLink("/unidesk/senhorio/advertisements")}
              />

              {currentAdvertisement && (
                <div className="flex flex-col px-2">
                  <div className="mt-2 flex flex-1 items-center justify-between">
                    Anúncio - {currentAdvertisement.title || "#"}
                  </div>
                  <div className="ml-5 mt-2">
                    <MenuItem
                      url={`/unidesk/senhorio/${currentAdvertisement.slug}/details`}
                      label="Detalhes do anúncio"
                      clickOnLink={moveToMenuLink}
                      child={true}
                    />
                    <MenuItem
                      url={`/unidesk/senhorio/${currentAdvertisement.slug}/photos`}
                      label="Fotos"
                      clickOnLink={moveToMenuLink}
                      child={true}
                    />
                    <MenuItem
                      url={`/unidesk/senhorio/${currentAdvertisement.slug}/conditions`}
                      label="Condições e regras"
                      clickOnLink={moveToMenuLink}
                      child={true}
                    />
                    <MenuItem
                      url={`/unidesk/senhorio/${currentAdvertisement.slug}/prices`}
                      label="Preços"
                      clickOnLink={moveToMenuLink}
                      child={true}
                    />
                    <MenuItem
                      url={""}
                      label="Informações contratuais"
                      blocked={true}
                      clickOnLink={moveToMenuLink}
                      child={true}
                    />
                  </div>
                </div>
              )}

              <MenuItem
                clickOnLink={moveToMenuLink}
                url={"/unidesk/inbox"}
                label={"Caixa de entrada"}
                activeLink={checkActiveLink("/unidesk/inbox")}
              />
              <div className="mt-1 px-2">
                <MenuItemCollapsible
                  setOpen={() => setOpenUniControlo(!openUniControlo)}
                  isOpen={openUniControlo}
                  title={"Uni-controlo"}
                >
                  <div className="mt-2 flex items-center justify-start align-middle">
                    <div className="ml-5 flex flex-col text-base">
                      <MenuItem
                        url="/unidesk/unicontrolo/guests"
                        label="Hóspedes"
                        clickOnLink={moveToMenuLink}
                        child={true}
                      />
                      <MenuItem blocked={true} url="" label="Transações" clickOnLink={() => {}} child={true} />
                      <MenuItem blocked={true} url="" label="Despesas" clickOnLink={() => {}} child={true} />
                      <MenuItem blocked={true} url="" label="Reparações" clickOnLink={() => {}} child={true} />
                    </div>
                  </div>
                </MenuItemCollapsible>
              </div>
              <MenuItem
                clickOnLink={moveToMenuLink}
                url={"/unidesk/notifications"}
                label={"Notificações"}
                activeLink={checkActiveLink("/unidesk/notifications")}
                blocked={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSenhorio;
