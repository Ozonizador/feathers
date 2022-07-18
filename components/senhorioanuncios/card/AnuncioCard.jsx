/* PAGINA 51 DO XD */
import React from "react";
import Image from "next/image"
import img1 from "../../../public/images/bed3.jpeg"
import { BiInfoCircle } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import { AiOutlineWifi } from "react-icons/ai";
import { BsWater } from "react-icons/bs";
import { CgHome } from "react-icons/cg";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'


function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function ArchiveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function ArchiveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function MoveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function MoveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}

function DeleteInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function DeleteActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}


















const AnuncioCard = () => {
    return (
        <section className="w-full flex flex-col ">
            <div className="bg-white border-2 border-terciary-200 rounded-lg w-full">
                <div className="flex">
                    <div className="mr-4 w-44 h-40 ">
                        <Image src={img1} alt="Foto Quarto" height={245} width={140} className="rounded-l-lg object-contain" />
                    </div>
                    <div className="w-11/12">
                        <div className="flex flex-row w-full  justify-between pr-4 mt-3">
                            <div className="font-bold text-xl ">Quarto privado em Porto</div>


                            <div>
                                <div className="fixed top-16 w-56 text-right">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                Options
                                                <ChevronDownIcon
                                                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                    aria-hidden="true"
                                                />
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
                                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                {active ? (
                                                                    <EditActiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <EditInactiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                Edit
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>

                                                    </Menu.Item>
                                                </div>
                                                <div className="px-1 py-1">


                                                </div>
                                                <div className="px-1 py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
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
                            <div className="text-secondary-300 text-base mt-4 mb-1">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore</div>
                            <div className="font-bold text-xl text-primary-500">250€/mês</div>
                            <div className="flex ">
                                <div className="relative mb-3 mt-1 text-center text-base">
                                    <div className="flex items-center justify-center gap-2 align-middle text-base">
                                        Despesas incluídas
                                        <BiInfoCircle />
                                    </div>

                                    {/* PROBLEMA Z-INDEX */}
                                    {/* <div className="absolute bottom-6 left-1 z-30 bg-white">
                                        <div className="mb-2 mt-3 flex rounded-lg p-4 shadow-2xl">
                                            <div className="mx-4 flex flex-col items-center justify-center px-4 align-middle text-secondary-500">
                                                <FaRegLightbulb className=" h-12 w-12 p-2" />
                                                <div className="mt-2 text-sm ">
                                                    Eletricidade
                                                    <br />
                                                    incluído
                                                </div>
                                            </div>

                                            <div className="mr-4 flex flex-col items-center justify-center px-4 align-middle text-secondary-500">
                                                <AiOutlineFire className="   h-12 w-12 p-2" />
                                                <div className="mt-2 text-sm">
                                                    Gás
                                                    <br />
                                                    incluído
                                                </div>
                                            </div>

                                            <div className="mr-4 flex flex-col items-center justify-center px-4 align-middle text-secondary-500">
                                                <AiOutlineWifi className=" h-12 w-12 p-2" />
                                                <div className="mt-2 text-sm ">
                                                    Internet
                                                    <br />
                                                    incluído
                                                </div>
                                            </div>

                                            <div className="mr-2 flex flex-col items-center justify-center px-4  align-middle text-secondary-500">
                                                <BsWater className=" h-12 w-12 p-2" />
                                                <div className="mt-2 text-sm ">
                                                    Água
                                                    <br />
                                                    incluído
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="w-96 bg-black">
                dsçlfklçdskfçdlfksdçld
            </div>


        </section>
    );
};

export default AnuncioCard;
