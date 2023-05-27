import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CgHome } from "react-icons/cg";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import useAdvertisementService from "../../../../hooks/advertisementService";
import { Advertisement, TYPE_ADVERTISEMENT } from "../../../../models/advertisement";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { PROCURAR_ADVERT_URL } from "../../../../models/paths";

export default function RoomSemelhantes() {
  const advertisement = useGetSingleAdvertisement();
  const { getSimilarAdvertisements } = useAdvertisementService();

  const [loading, setLoading] = useState<boolean>(false);
  const [similarAdverts, setSimilarAdverts] = useState<Pick<Advertisement, "photos" | "type" | "place">[]>([]);

  const getSimilarAdverts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getSimilarAdvertisements();
    if (!error && data) setSimilarAdverts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getSimilarAdverts();
  }, [getSimilarAdverts]);

  return (
    <>
      {loading && (
        <div className="mt-32 flex flex-1 justify-center">
          <Spinner color="info" aria-label="loading" size="lg" />
        </div>
      )}
      {!loading && similarAdverts && similarAdverts.length > 0 && (
        <section className="mb-40">
          <div className="mb-5 text-2xl font-bold">Casas semelhantes</div>
          <div className="flex flex-col lg:flex-row">
            {similarAdverts &&
              similarAdverts.map((advert, index) => {
                return (
                  <div key={index}>
                    <article className="relative h-56 w-40 rounded-lg lg:h-56  lg:w-48">
                      <Image src={advert.photos[0].url} alt="" layout="responsive" height="200" width="200" />
                      <h2 className=" mt-3 p-3 text-base text-white">{TYPE_ADVERTISEMENT[advert.type]}</h2>
                      <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
                    </article>
                  </div>
                );
              })}
          </div>

          <Link href={PROCURAR_ADVERT_URL}>
            <a className="hover: lg_mt-0 mt-10 flex w-full items-center justify-center  rounded-md bg-primary-500 p-5 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl lg:w-96">
              Encontrar mais
              <span className="px-1">
                <CgHome />
              </span>{" "}
              em {advertisement.place}
            </a>
          </Link>
        </section>
      )}
    </>
  );
}
