import React, { useEffect, useState } from "react";
import Image from "next/image";
import RoomCard from "./RoomCard";
import { getAdvertisementsFromDB } from "../../../services/advertisementService";
import Advertisement from "../../../models/advertisement";
import { Pagination, Spinner } from "flowbite-react";
import Link from "next/link";

export default function ProcurarSection() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  const getAdvertisements = async () => {
    const { data, error } = await getAdvertisementsFromDB();
    setAdvertisements(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getAdvertisements();
  }, []);

  return (
    <>
      <div className="mt-5 flex flex-1 px-10">
        <div className="w-1/2">
          <div className="row">
            <div className="flex flex-1">
              <h2 className="heading text-bold text-2xl">Pertence Onde Tu Quiseres!</h2>

              <div className="ml-auto mb-2">
                <select className="w-60 rounded-md  border border-solid border-terciary-500 bg-white py-2 px-3 text-base ">
                  <option>Ordenar Por</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                </select>

                {/* <select className="w-32 rounded-sm border border-gray-500 ">
                  <option>Ordenar Por</option>
                  <option>...</option>
                </select> */}
              </div>
            </div>
          </div>

          <div className="mb-3 grid grid-cols-4 items-center justify-between gap-2 py-5 align-middle">
            <div className="">
              <select className="w-full rounded-md  border border-solid border-terciary-500 bg-white py-4  text-sm">
                <option>Tipo de espaço</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </select>
              {/* 
              <select className="w-32">
                <option>Tipo De Espaço</option>
              </select> */}
            </div>

            <div>
              <select className="w-full rounded-md  border border-solid border-terciary-500 bg-white py-4  text-sm">
                <option>Preço</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </select>

              {/* <select className="w-32">
                <option>Preço</option>
              </select> */}
            </div>

            <div>
              <select className="w-full rounded-md  border border-solid border-terciary-500 bg-white py-4  text-sm">
                <option>Comodidades</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </select>

              {/* <select className="w-32">
                <option>Comodidades</option>
              </select> */}
            </div>

            <div className="text-end">
              <Link href="/">
                <a className="rounded-md bg-primary-500 py-4 px-7 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                  Mais Filtros
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
                {advertisements &&
                  advertisements.map((advertisement, index) => {
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

              <div className="row mb-5">
                <div className="col-md-2"></div>
                <div className="flex flex-1 justify-around px-5">
                  <Pagination currentPage={1} totalPages={100} onPageChange={() => {}} />
                </div>
                <div className="col-md-5"></div>
              </div>
            </>
          )}
        </div>
        <div className="w-1/2 px-5">
          <Image src="/images/homemap.png" layout="responsive" height="100%" width="100%" alt="" />
        </div>
      </div>
    </>
  );
}
