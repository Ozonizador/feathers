/* PAGINA 51 DO XD */
import React, { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { BsFillHouseCheckFill, BsThreeDots } from "react-icons/bs";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Advertisement } from "../../../models/advertisement";
import { useRouter } from "next/router";
import { useSetSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import useAdvertisementService from "../../../hooks/advertisementService";
import { toast } from "react-toastify";
import ExpensesComponent from "../../anuncio/ExpensesComponent";
import { useTranslation } from "next-i18next";
import { CONTACTOS_URL } from "../../../models/paths";
import { TypeExpense } from "../../../models/advertisement";
import Link from "next/link";
import { url } from "inspector";

interface AnuncioCardProps {
  advertisement: Advertisement;
  refetchAdvertisements: () => void;
}

const AnuncioCard = ({ advertisement, refetchAdvertisements }: AnuncioCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const setMenuSelectedAdvertisement = useSetSelectedAnuncioMenuSenhorio();
  const { removeAdvertisement } = useAdvertisementService();

  const editAdvertisement = (event: React.MouseEvent, slug: string) => {
    event.preventDefault();
    setMenuSelectedAdvertisement(advertisement);
    router.push(`${slug}/details`, undefined, { locale: router.locale });
  };

  const deleteAdvertisement = async () => {
    const { error } = await removeAdvertisement(advertisement.id);
    error ? toast.error(t("messages:error.removing_advert")) : toast.success(t("messages:success.success"));
    if (!error) refetchAdvertisements();
  };

  const verifyAdvertisement = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push(CONTACTOS_URL);
  };

  return (
    <section>
      <div className="rounded-lg border-2 border-terciary-200 bg-white">
        <div className="w-full md:flex md:min-h-[220px] ">
          <div className="relative block sm:w-[100%] md:w-[40%]">
            <div className="h-52 w-[100%]">
              {advertisement.photos && advertisement.photos.length > 0 && (
                <Image
                  src={advertisement.photos[0].url}
                  className="rounded-bl-lg rounded-tl-lg"
                  alt="Foto Quarto"
                  fill
                  style={{ objectFit: "cover" }}
                  onClick={(e) => editAdvertisement(e, advertisement.slug)}
                />
              )}
            </div>
          </div>
          <div className="relative ml-3 min-h-[184px] py-2 sm:w-[100%]   md:w-[60%]">
            <div className="flex flex-row justify-between pr-2 lg:pr-0">
              <div className="text-lg font-bold">
                <Link href={`/anuncio/${encodeURIComponent(advertisement.slug)}`}>{advertisement.title}</Link>
              </div>
              <div>
                <div className="text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <div className="right-side-menu relative">
                      <Menu.Button className="inline-flex w-full justify-end rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <BsThreeDots />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-20 mt-2 w-[193px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-56">
                        <div className="px-0 py-1 md:px-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={(e) => editAdvertisement(e, advertisement.slug)}
                                className={`${
                                  active ? "bg-primary-500 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <MdModeEdit className="mr-2 h-5 w-5" aria-hidden="true" />
                                {t("edit")}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={(e) => verifyAdvertisement(e)}
                                className={`${
                                  active ? "bg-primary-500 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <BsFillHouseCheckFill className="mr-2 h-5 w-5" aria-hidden="true" />
                                {t("verify")}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => deleteAdvertisement()}
                                className={`${
                                  active ? "bg-primary-500 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <MdDelete className="mr-2 h-5 w-5" aria-hidden="true" />
                                {t("delete")}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="">
              <div className="mb-1 mt-4 line-clamp-3 text-base text-secondary-300">{advertisement.description}</div>
              <div className="text-md font-bold">
                <div className="text-primary-500">
                  {t("advertisements:price_month", { price: advertisement.month_rent })}
                </div>
                <div>
                  <ExpensesComponent expenses={advertisement.expenses}></ExpensesComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnuncioCard;
