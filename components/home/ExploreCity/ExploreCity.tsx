import React from "react";
import Image from "next/image";

const ExploreCity = () => {
  return (
    <section className="max-width">
      <div className="bg-terciary-300  lg:block">
        <div className="mx-auto p-4 text-center lg:px-8 lg:py-10">
          <h2 className="pb-20 text-5xl font-bold">Explore as nossas cidades + populares!</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <article className="group relative h-60 rounded-2xl bg-black">
              <Image src="/images/place-tomar.jpg" alt="tomar" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-all align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Tomar
              </div>
            </article>
            <article className="group relative h-60 rounded-2xl">
              <Image src="/images/peniche.jpg" alt="peniche" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-all align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Peniche
              </div>
            </article>
            <article className="group relative h-60 rounded-2xl">
              <Image src="/images/place-brazil.jpg" alt="maior" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-words align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Rio Maior
              </div>
            </article>
            <article className="group relative h-60 rounded-2xl">
              <Image src="/images/place-santarem.jpg" alt="santarem" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-all align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Santarem
              </div>
            </article>
            <article className="group relative h-60 rounded-2xl">
              <Image src="/images/place-abrantes.jpg" alt="abrantes" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-all align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Abrantes
              </div>
            </article>
            <article className="group relative h-60 rounded-2xl">
              <Image src="/images/place-leiria.jpg" alt="leiria" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-all align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Leiria
              </div>
            </article>
            <article className="group relative h-60 rounded-2xl">
              <Image src="/images/place-braga.jpg" alt="braga" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-all align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Braga
              </div>
            </article>
            <article className="group relative h-60 rounded-2xl">
              <Image src="/images/place-setubal.jpg" alt="setubal" layout="fill" className="rounded-2xl" />
              <div className="absolute flex h-full w-full flex-col justify-center break-all align-middle text-3xl font-bold text-white group-hover:text-7xl group-hover:text-neutral-200">
                Setubal
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCity;
