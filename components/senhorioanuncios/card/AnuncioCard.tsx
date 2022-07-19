/* PAGINA 51 DO XD */
import React, { Fragment } from "react";
import Image from "next/image";
import img1 from "../../../public/images/bed3.jpeg";
import { BiInfoCircle } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import RoomUtilitesPopover from "../../roomUtils/roomUtilitiesPopover";
import { BsThreeDots } from "react-icons/bs";
// import { Fragment } from 'react'

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

const AnuncioCard = () => {
  return (
    <section className="w-full ">
      <div className="w-full rounded-lg border-2 border-terciary-200 bg-white">
        <div className="flex">
          <div className="mr-4 h-40 w-32 ">
            <Image
              src={img1}
              alt="Foto Quarto"
              height={245}
              width={140}
              className="rounded-l-lg object-cover"
            />
          </div>
          <div className="w-11/12">
            <div className="mt-3 flex w-full  flex-row justify-between pr-4">
              <div className="text-xl font-bold ">Quarto privado em Porto</div>

              <div>
                <div className="top-16 w-56 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
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
                          <Menu.Item></Menu.Item>
                        </div>
                        <div className="px-1 py-1"></div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-violet-500 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <DeleteActiveIcon
                                    className="mr-2 h-5 w-5 text-violet-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <DeleteInactiveIcon
                                    className="mr-2 h-5 w-5 text-violet-400"
                                    aria-hidden="true"
                                  />
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
            <div className="w-5/6">
              <div className="mt-4 mb-1 text-base text-secondary-300">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              </div>
              <div className="text-xl font-bold text-primary-500">250€/mês</div>
              <div className="flex ">
                <div className="relative mb-3 mt-1 text-center text-base">
                  <div className="peer flex items-center justify-center gap-2 align-middle text-base">
                    Despesas incluídas
                    <BiInfoCircle />
                  </div>
                  <RoomUtilitesPopover expenses={{}} />
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
