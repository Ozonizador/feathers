import React from "react";

interface UnideskHeroProps {
  title: string;
}

const UnideskHero = ({ title }: UnideskHeroProps) => {
  return (
    <section>
      <div className="bg-hero-unidesk flex justify-center py-52 ">
        <div className="flex flex-col px-10 align-middle md:container">
          <h1 className="mb-0 text-center text-5xl font-normal leading-snug tracking-widest text-white lg:text-7xl">
            Uni - Desk
          </h1>
          <h2 className="mt-5 text-center text-4xl font-light text-white">{title}</h2>
        </div>
      </div>
    </section>
  );
};

export default UnideskHero;
