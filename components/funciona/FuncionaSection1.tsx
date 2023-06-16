import React from "react";

export default function FuncionaSection1() {
  return (
    <section>
      <div className="container-fluid flex justify-center   bg-[url('/images/back.png')] bg-cover py-24 lg:py-52 ">
        <div className="md:containerflex-row flex flex-col gap-10 px-5 text-center align-middle">
          <h1 className="text-6xl font-black text-white">Como funciona</h1>
          <p className="text-xl text-white">
            Tem uma propriedade para arrendar? Explicamos como
            <br />
            pode rentabilizá-la
          </p>
        </div>
      </div>
    </section>
  );
}
