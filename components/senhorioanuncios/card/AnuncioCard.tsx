/* PAGINA 51 DO XD */
import React, { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { Advertisement } from "../../../models/advertisement";
import { useRouter } from "next/router";
import { useSetSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import useAdvertisementService from "../../../hooks/advertisementService";
import { toast } from "react-toastify";
import ExpensesComponent from "../../anuncio/ExpensesComponent";
import { useTranslation } from "next-i18next";
import { CONTACTOS_URL } from "../../../models/paths";
import { TypeExpense } from "../../../models/advertisement"

function EditInactiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#ffffff" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

function EditActiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#c48b60" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

function VerifyActiveIcon(props:any) {
  return (
    <img {...props} src="/images/homeSection2-1.svg" alt="" />
  );
}

function DeleteInactiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#EDE9FE" stroke="#000000" strokeWidth="2" />
      <path d="M3 6H17" stroke="#000000" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#c48b60" stroke="#ffffff" strokeWidth="2" />
      <path d="M3 6H17" stroke="#ffffff" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

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
        <div className="w-full lg:flex">
          <div className="relative hidden h-52 w-52 lg:block">
            {advertisement.photos && advertisement.photos.length > 0 && (
              <Image src={advertisement.photos[0].url} alt="Foto Quarto" fill style={{ objectFit: "cover" }} onClick={(e) => editAdvertisement(e, advertisement.slug)}/>
            )}
          </div>
          <div className="ml-3 w-full py-2 relative">
            <div className="flex flex-row justify-between pr-2 lg:pr-0">
              <div className="text-xl font-bold">{advertisement.title}</div>

              <div>
                <div className="text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                      <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={(e) => editAdvertisement(e, advertisement.slug)}
                                className={`${
                                  active ? "bg-primary-500 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <EditActiveIcon className="mr-2 h-5 w-5 text-black" aria-hidden="true" />
                                ) : (
                                  <EditInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                )}
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
                                 {active ? (
                                  <VerifyActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <VerifyActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                )}
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
                                {active ? (
                                  <DeleteActiveIcon className="mr-2 h-5 w-5 text-black " aria-hidden="true" />
                                ) : (
                                  <DeleteInactiveIcon className="mr-2 h-5 w-5 text-black" aria-hidden="true" />
                                )}
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
            <div className="w-96">
              <div className="mb-1 mt-4 line-clamp-3 text-base text-secondary-300">{advertisement.description}</div>
              <div className="text-xl font-bold absolute bottom-3">
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
