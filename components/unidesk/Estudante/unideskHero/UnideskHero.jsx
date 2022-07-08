import React from "react";

const UnideskHero = ({ title }) => {
  return (
    <section>
      <div className="bg-hero-unidesk flex justify-center  py-52 ">
        <div className="flex flex-col px-10 align-middle md:container">
          <h1 className="mb-0 text-center text-7xl font-normal leading-snug tracking-widest text-white">
            Uni - Desk
          </h1>
          <h2 className="text-center text-4xl font-normal text-white">{title}</h2>
        </div>
      </div>
    </section>
  );
};

export default UnideskHero;