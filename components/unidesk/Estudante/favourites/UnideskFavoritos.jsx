
import Image from "next/image"
import Link from "next/link"
import iconfavorito from "../../../../public/images/icon-pg14-2.svg"
import img1 from "../../../../public/images/bed3.jpeg"
import { BiInfoCircle } from "react-icons/bi"
import { FaRegLightbulb } from "react-icons/fa"
import { AiOutlineFire } from "react-icons/ai"
import { AiOutlineWifi } from "react-icons/ai"
import { BsWater } from "react-icons/bs"
import { CgHome } from "react-icons/cg"


const UnideskFavoritos = () => {
    return (
        <section>
            <div className=" w-4/6 mx-auto flex align-middle items-center mt-24">
                <div>
                    <Image
                        src={iconfavorito}
                        alt="Favoritos"
                        height={55}
                        width={55}
                    />
                </div>
                <div className="text-xl ml-4 ">Unidesk > Favoritos</div>
            </div>



            <div className="container w-4/6 mx-auto my-32 pt-20 border border-terciary-500 rounded-2xl">
                <div className="flex justify-center align-middle items-center flex-col">
                    <div>
                        <Image
                            src={iconfavorito}
                            alt="Favoritos"
                            height={75}
                            width={75}
                        />
                    </div>
                    <div className="text-primary-500 font-bold text-2xl mt-9">Favoritos</div>
                </div>


                <div className="flex justify-center  mx-auto w-9/12 gap-10 mt-16">
                    <div className="flex-1">
                        {/* CARD 1 */}
                        <div className="w-full border-2 border-gray-200 rounded-lg bg-white h-40  mb-10">
                            <div className="flex">
                                <div className="">
                                    <Image src={img1} alt="" height="160" width="160" className="object-fill rounded-l-lg"></Image>
                                </div>

                                <div className="flex flex-col flex-auto w-10 ml-6 ">
                                    <div className="text-xl font-bold my-2">Título do anúncio</div>
                                    <div className=" text-primary-500 text-xl font-bold mb-1">400€/mês</div>

                                    <div className="flex ">
                                        <div className="text-base  text-center mb-2 relative">
                                            <div className="flex items-center align-middle gap-2 justify-center text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>

                                            {/* PROBLEMA Z-INDEX */}
                                            <div className="absolute bottom-6 left-1 z-50">
                                                <div className="flex mb-2 mt-3 shadow-2xl rounded-lg p-4">
                                                    <div className="flex flex-col items-center justify-center align-middle mx-4 text-secondary-500 px-4">
                                                        <FaRegLightbulb className=" w-12 h-12 p-2" />
                                                        <div className="mt-2 text-sm ">
                                                            Eletricidade<br />incluído
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-center justify-center align-middle mr-4 text-secondary-500 px-4">
                                                        <AiOutlineFire className="   w-12 h-12 p-2" />
                                                        <div className="mt-2 text-sm">
                                                            Gás<br />incluído
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-center justify-center align-middle mr-4 text-secondary-500 px-4">
                                                        <AiOutlineWifi className=" w-12 h-12 p-2" />
                                                        <div className="mt-2 text-sm ">
                                                            Internet<br />incluído
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-center justify-center align-middle mr-2  text-secondary-500 px-4">
                                                        <BsWater className=" w-12 h-12 p-2" />
                                                        <div className="mt-2 text-sm ">
                                                            Água<br />incluído
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="text-base text-gray-500 mt-3">
                                            Ver mais
                                        </a>
                                    </Link>

                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="w-full border-2 border-gray-200 rounded-lg bg-white h-40 ">
                            <div className="flex">
                                <div className="">
                                    <Image src={img1} alt="" height="160" width="160" className="object-fill rounded-l-lg"></Image>
                                </div>

                                <div className="flex flex-col flex-auto w-10 ml-6 ">
                                    <div className="text-xl font-bold my-2">Título do anúncio</div>
                                    <div className=" text-primary-500 text-xl font-bold mb-1">400€/mês</div>

                                    <div className="flex ">
                                        <div className="text-base  text-center mb-2 relative">
                                            <div className="flex items-center align-middle gap-2 justify-center text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="text-base text-gray-500 mt-3">
                                            Ver mais
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex-1">
                        {/* CARD 3 */}
                        <div className="w-full border-2 border-gray-200 rounded-lg bg-white h-40 mb-10">
                            <div className="flex">
                                <div className="">
                                    <Image src={img1} alt="" height="160" width="160" className="object-fill rounded-l-lg"></Image>
                                </div>

                                <div className="flex flex-col flex-auto w-10 ml-6 ">
                                    <div className="text-xl font-bold my-2">Título do anúncio</div>
                                    <div className=" text-primary-500 text-xl font-bold mb-1">400€/mês</div>

                                    <div className="flex ">
                                        <div className="text-base  text-center mb-2 relative">
                                            <div className="flex items-center align-middle gap-2 justify-center text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="text-base text-gray-500 mt-3">
                                            Ver mais
                                        </a>
                                    </Link>

                                </div>
                            </div>
                        </div>

                        {/* CARD 4 */}
                        <div className="w-full border-2 border-gray-200 rounded-lg bg-white h-40 ">
                            <div className="flex">
                                <div className="">
                                    <Image src={img1} alt="" height="160" width="160" className="object-fill rounded-l-lg"></Image>
                                </div>

                                <div className="flex flex-col flex-auto w-10 ml-6 ">
                                    <div className="text-xl font-bold my-2">Título do anúncio</div>
                                    <div className=" text-primary-500 text-xl font-bold mb-1">400€/mês</div>

                                    <div className="flex ">
                                        <div className="text-base  text-center mb-2 relative">
                                            <div className="flex items-center align-middle gap-2 justify-center text-base">
                                                Despesas incluídas
                                                <BiInfoCircle />
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="">
                                        <a className="text-base text-gray-500 mt-3">
                                            Ver mais
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-12 mb-20">
                    <Link href="/4_5">
                        <a className="hover: flex w-1/5 items-center justify-center  rounded-xl bg-primary-500 p-5 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                            Encontrar{" "}<span className="px-1"><CgHome /></span>{" "}em...
                        </a>
                    </Link>
                </div>


            </div>

        </section>
    );
};

export default UnideskFavoritos;