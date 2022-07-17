import Image from "next/image";
import Link from "next/link";
import iconfavorito from "../../../../public/images/icon-pg14-2.svg";
import img1 from "../../../../public/images/bed3.jpeg";
import { BiInfoCircle } from "react-icons/bi";
import { CgHome } from "react-icons/cg";
import RoomUtilitesPopover from "../../../roomUtils/roomUtilitiesPopover";
import { useEffect, useState } from "react";

const UnideskFavoritos = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserFavourites = async () => {};
  useEffect(() => {
    setIsLoading(true);
  }, []);

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

                      <RoomUtilitesPopover expenses={{}} />
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
