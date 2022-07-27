import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import RoomCard from "./RoomCard";
import { getFilteredAdvertisements, PAGE_NUMBER_COUNT } from "../../../services/advertisementService";
import Advertisement from "../../../models/advertisement";
import { Pagination, Spinner } from "flowbite-react";
import Link from "next/link";

interface ProcurarPagination {
  advertisements: Advertisement[];
  count: number;
}

export default function ProcurarSection() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [advertisementsInfo, setAdvertisementsInfo] = useState<ProcurarPagination>({ count: 0, advertisements: [] });

  const getAdvertisements = useCallback(async () => {
    const { data, error, count } = await getFilteredAdvertisements(page, null);
    if (!error) {
      setAdvertisementsInfo({ advertisements: data, count });
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    getAdvertisements();
  }, [getAdvertisements]);

  return (
    <>
      <div className="mt-5 flex flex-1 px-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full lg:w-full">
            <div className="flex flex-row justify-between">
              <div className="text-sm font-bold lg:text-2xl">
                23 espaços <span className="font-normal text-gray-400">disponíveis para Peniche</span>{" "}
              </div>
              <div className="mb-2">
                <select className="w-36 rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3 text-sm  lg:w-60">
                  <option>Ordenar Por</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                </select>
              </div>
            </div>

            <div className=" mr-0 flex-row lg:flex">
              <select className="mb-3 mr-4 w-full rounded-md border border-solid border-terciary-500 bg-white  py-4 text-sm lg:w-52">
                <option>Tipo de espaço</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </select>
              <div className="flex flex-row justify-start gap-4">
                <div className="flex-1">
                  <select className="w-full rounded-md  border border-solid border-terciary-500 bg-white py-4  text-sm lg:w-52">
                    <option>Preço</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select className="w-full rounded-md  border border-solid border-terciary-500 bg-white py-4  text-sm lg:w-52">
                    <option>Comodidades</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
                </div>
              </div>

              <div className="my-2 ml-auto mt-0">
                <Link href="/procurar">
                  <a>
                    <button className="mt-4  h-14 w-1/2 rounded-lg bg-primary-500 px-6 text-white transition lg:mt-0 lg:w-full">
                      Mais Filtros
                    </button>
                  </a>
                </Link>
              </div>
            </div>

            {isLoading && (
              <div className="mt-32 flex flex-1 justify-center">
                <Spinner color="info" aria-label="loading" size="lg" />
              </div>
            )}
            {!isLoading && (
              <>
                <div>
                  {advertisementsInfo.advertisements &&
                    advertisementsInfo.advertisements.map((advertisement, index) => {
                      return (
                        <Link href={`/anuncio/${advertisement.id}`} key={index}>
                          <a>
                            <div>
                              <RoomCard advertisement={advertisement} />
                            </div>
                          </a>
                        </Link>
                      );
                    })}
                </div>
              </>
            )}
          </div>

          {isLoading && (
            <div className="mt-32 flex flex-1 justify-center">
              <Spinner color="info" aria-label="loading" size="lg" />
            </div>
          )}
          {!isLoading && (
            <>
              <div>
                {advertisementsInfo.advertisements &&
                  advertisementsInfo.advertisements.map((advertisement, index) => {
                    return (
                      <Link href={`/anuncio/${advertisement.id}`} key={index}>
                        <a>
                          <div>
                            <RoomCard advertisement={advertisement} />
                          </div>
                        </a>
                      </Link>
                    );
                  })}
              </div>
              <div></div>

              {advertisementsInfo.advertisements.length !== 0 &&
                advertisementsInfo.count !== advertisementsInfo.advertisements.length && (
                  <div className="row mb-5">
                    <div className="col-md-2"></div>
                    <div className="flex flex-1 justify-around px-5">
                      <Pagination
                        currentPage={page}
                        totalPages={advertisementsInfo.count / PAGE_NUMBER_COUNT}
                        onPageChange={(page) => setPage(page)}
                      />
                    </div>
                    <div className="col-md-5"></div>
                  </div>
                )}
            </>
          )}
        </div>
        <div className="w-1/2 px-5 lg:block">
          <Image src="/images/homemap.png" layout="responsive" height="100%" width="100%" alt="" />
        </div>
      </div>
    </>
  );
}
