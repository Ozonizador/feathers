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
    image: "/images/tomar.webp",
    url: "/procurar?city=Tomar",
  },
  {
    title: "Peniche",
    image: "/images/peniche.webp",
    url: "/procurar?city=Peniche",
  },
  {
    title: "Leiria",
    image: "/images/leiria.webp",
    url: "/procurar?city=Leiria",
  },
  {
    title: "Coimbra",
    image: "/images/coimbra.webp",
    url: "/procurar?city=Coimbra",
  },
  {
    title: "Abrantes",
    image: "/images/abrantes.webp",
    url: "/procurar?city=Abrantes",
  },
  {
    title: "Rio Maior",
    image: "/images/riomaior.webp",
    url: `/procurar?city=Rio Maior`,
  },
  {
    title: "Porto",
    image: "/images/porto.webp",
    url: "/procurar?city=Porto",
  },
  {
    title: "Caldas da Rainha",
    image: "/images/caldas.webp",
    url: "/procurar?city=Caldas da Rainha",
  },
] as CityProps[];

const ExploreCity = () => {
  const { t } = useTranslation("index");
  return (
    <section className="max-width">
      <div className="lg:block">
        <div className="mx-auto text-center lg:px-8 lg:py-10 xl:p-4">
          <h2 className="pb-20 text-4xl font-bold">{t("index:explore_city")}</h2>
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
      <article className="group relative mx-auto h-60 w-60 cursor-pointer rounded-2xl bg-black lg:h-52 lg:w-52 ">
        <Image src={image} alt="tomar" fill className="rounded-2xl" />
        <div className="break-none bg-black bg-opacity-50 rounded-2xl absolute flex h-full w-full flex-col justify-center align-middle text-2xl font-bold text-white transition-all group-hover:text-[55px] group-hover:leading-none group-hover:text-neutral-200 group-hover:opacity-40">
          {title}
        </div>
      </article>
    </Link>
  );
};

export default ExploreCity;
