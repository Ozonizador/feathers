/* PAGINA 51 DO XD */
import React, { Fragment } from "react";
import Image from "next/image";
import { BiInfoCircle } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import RoomUtilitesPopover from "../../roomUtils/roomUtilitiesPopover";
import { BsThreeDots } from "react-icons/bs";
import Advertisement from "../../../models/advertisement";
import { useRouter } from "next/router";
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";
import { useSetSelectedAnuncioMenuSenhorio } from "../../../context/MenuSenhorioAnuncioProvider";
import { checkIfExpensesIncluded } from "../../../helpers/advertisementHelper";

function EditInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="10" height="10" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

interface AnuncioCardProps {
  advertisement: Advertisement;
}

const AnuncioCard = ({ advertisement }: AnuncioCardProps) => {
  const router = useRouter();
  const setMenuSelectedAdvertisement = useSetSelectedAnuncioMenuSenhorio();

  const editAdvertisement = (event, id: string) => {
    event.preventDefault();
    setMenuSelectedAdvertisement(advertisement);
    router.push(`/unidesk/senhorio/${id}/details`);
  };

  return (
    <section>
      <div className="rounded-lg border-2 border-terciary-200 bg-white">
        <div className="w-full lg:flex">
          <div className="min-h-40 min-w-52 hidden lg:block">
            <Image
              src={(advertisement.photos && advertisement.photos[0]?.url) || NoPhotoAvailable}
              alt="Foto Quarto"
              height={160}
              width={208}
              className="rounded-l-lg object-cover"
            />
          </div>
          <div className="ml-3 py-2">
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
                                onClick={(e) => editAdvertisement(e, advertisement.id)}
                                className={`${
                                  active ? "bg-violet-500 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <EditInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                )}
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-violet-500 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <DeleteActiveIcon className="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                                ) : (
                                  <DeleteInactiveIcon className="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                                )}
                                Delete
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
              <div className="mt-4 mb-1 text-base text-secondary-300 line-clamp-3">{advertisement.description}</div>
              <div className="text-xl font-bold text-primary-500">{`${advertisement.month_rent}€/mês`}</div>
              <div>
                <div className="relative mb-3 mt-1 text-center text-base">
                  <div className="peer flex gap-1 align-middle text-base">
                    {checkIfExpensesIncluded(advertisement.expenses.services)} <BiInfoCircle className="my-auto" />
                  </div>
                  <RoomUtilitesPopover expenses={advertisement.expenses} />
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
