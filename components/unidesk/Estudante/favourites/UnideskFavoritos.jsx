import Image from "next/image";
import Link from "next/link";
import iconfavorito from "../../../../public/images/icon-pg14-2.svg";
import img1 from "../../../../public/images/bed3.jpeg";
import { BiInfoCircle } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import { AiOutlineWifi } from "react-icons/ai";
import { BsWater } from "react-icons/bs";
import { CgHome } from "react-icons/cg";

const UnideskFavoritos = () => {
    return (
        <section>
            <div className=" mx-auto mt-24 flex w-4/6 items-center align-middle">
                <div>
                    <Image src={iconfavorito} alt="Favoritos" height={55} width={55} />
                </div>
                <div className="ml-4 text-xl ">{"Unidesk > Favoritos"}</div>
            </div>

            <div className="container mx-auto my-32 w-4/6 rounded-2xl border border-terciary-500 pt-20">
                <div className="flex flex-col items-center justify-center align-middle">
                    <div>
                        <Image src={iconfavorito} alt="Favoritos" height={75} width={75} />
                    </div>
                    <div className="mt-9 text-2xl font-bold text-primary-500">Favoritos</div>
                </div>

                <div className="mx-auto mt-16  flex w-9/12 justify-center gap-10">
                    <div className="flex-1">
                        {/* CARD 1 */}
                        <div className="mb-10 h-40 w-full rounded-lg border-2 border-gray-200  bg-white">
                            <div className="flex">
                                <div className="">
                                    <Image
                                        src={img1}
                                        alt=""
                                        height="160"
                                        width="160"
                                        className="rounded-l-lg object-fill"
                                    ></Image>
                                </div>

                                <div className="ml-6 flex w-10 flex-auto flex-col ">
                                    <div className="my-2 text-xl font-bold">Título do anúncio</div>
                                    <div className=" mb-1 text-xl font-bold text-primary-500">400€/mês</div>

                                    <div className="flex ">
                                        <div className="relative  mb-2 text-center text-base">
                                            <div className="flex items-center justify-center gap-2 align-middle text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>

                                            {/* PROBLEMA Z-INDEX */}
                                            <div className="absolute bottom-6 left-1 -z-30">
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
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="mt-3 text-base text-gray-500">Ver mais</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="h-40 w-full rounded-lg border-2 border-gray-200 bg-white ">
                            <div className="flex">
                                <div className="">
                                    <Image
                                        src={img1}
                                        alt=""
                                        height="160"
                                        width="160"
                                        className="rounded-l-lg object-fill"
                                    ></Image>
                                </div>

                                <div className="ml-6 flex w-10 flex-auto flex-col ">
                                    <div className="my-2 text-xl font-bold">Título do anúncio</div>
                                    <div className=" mb-1 text-xl font-bold text-primary-500">400€/mês</div>

                                    <div className="flex ">
                                        <div className="relative  mb-2 text-center text-base">
                                            <div className="flex items-center justify-center gap-2 align-middle text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="mt-3 text-base text-gray-500">Ver mais</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        {/* CARD 3 */}
                        <div className="mb-10 h-40 w-full rounded-lg border-2 border-gray-200 bg-white">
                            <div className="flex">
                                <div className="">
                                    <Image
                                        src={img1}
                                        alt=""
                                        height="160"
                                        width="160"
                                        className="rounded-l-lg object-fill"
                                    ></Image>
                                </div>

                                <div className="ml-6 flex w-10 flex-auto flex-col ">
                                    <div className="my-2 text-xl font-bold">Título do anúncio</div>
                                    <div className=" mb-1 text-xl font-bold text-primary-500">400€/mês</div>

                                    <div className="flex ">
                                        <div className="relative  mb-2 text-center text-base">
                                            <div className="flex items-center justify-center gap-2 align-middle text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="mt-3 text-base text-gray-500">Ver mais</a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* CARD 4 */}
                        <div className="h-40 w-full rounded-lg border-2 border-gray-200 bg-white ">
                            <div className="flex">
                                <div className="">
                                    <Image
                                        src={img1}
                                        alt=""
                                        height="160"
                                        width="160"
                                        className="rounded-l-lg object-fill"
                                    ></Image>
                                </div>

                                <div className="ml-6 flex w-10 flex-auto flex-col ">
                                    <div className="my-2 text-xl font-bold">Título do anúncio</div>
                                    <div className=" mb-1 text-xl font-bold text-primary-500">400€/mês</div>

                                    <div className="flex ">
                                        <div className="relative  mb-2 text-center text-base">
                                            <div className="flex items-center justify-center gap-2 align-middle text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="mt-3 text-base text-gray-500">Ver mais</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 mb-20 flex justify-center">
                    <Link href="/4_5">
                        <a className="hover: flex w-1/5 items-center justify-center  rounded-xl bg-primary-500 p-5 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                            Encontrar{" "}
                            <span className="px-1">
                                <CgHome />
                            </span>{" "}
                            em...
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default UnideskFavoritos;
