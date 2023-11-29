import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

type CityProps = {
  image: string;
  title: string;
  url: string;
};

const CONFIG = [
  {
    title: "Tomar",
    image: "/images/place-tomar.jpg",
    url: "/procurar?city=Tomar",
  },
  {
    title: "Peniche",
    image: "/images/peniche.jpg",
    url: "/procurar?city=Peniche",
  },
  {
    title: "Leiria",
    image: "/images/place-leiria.jpg",
    url: "/procurar?city=Leiria",
  },
  {
    title: "Coimbra",
    image: "/images/place-santarem.jpg",
    url: "/procurar?city=Coimbra",
  },
  {
    title: "Abrantes",
    image: "/images/place-abrantes.jpg",
    url: "/procurar?city=Abrantes",
  },
  {
    title: "Rio Maior",
    image: "/images/place-brazil.jpg",
    url: `/procurar?city=Rio Maior`,
  },
  {
    title: "Porto",
    image: "/images/place-braga.jpg",
    url: "/procurar?city=Porto",
  },
  {
    title: "Caldas da Rainha",
    image: "/images/place-setubal.jpg",
    url: "/procurar?city=Caldas da Rainha",
  },
] as CityProps[];

const ExploreCity = () => {
  const { t } = useTranslation("index");
  return (
    <section className="max-width">
      <div className="bg-terciary-300  lg:block">
        <div className="mx-auto text-center lg:px-8 lg:py-10 xl:p-4">
          <h2 className="pb-20 text-5xl font-bold">{t("index:explore_city")}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {CONFIG.map((city, index) => (
              <ExploreCityItem key={index} title={city.title} image={city.image} url={city.url} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExploreCityItem = ({ title, url, image }: CityProps) => {
  return (
    <Link href={url}>
      <article className="group relative h-60 cursor-pointer rounded-2xl bg-black">
        <Image src={image} alt="tomar" fill className="rounded-2xl" />
        <div className="break-none absolute flex h-full w-full flex-col justify-center align-middle text-3xl font-bold text-white transition-all group-hover:text-[70px] group-hover:leading-none group-hover:text-neutral-200 group-hover:opacity-40">
          {title}
        </div>
      </article>
    </Link>
  );
};

export default ExploreCity;
