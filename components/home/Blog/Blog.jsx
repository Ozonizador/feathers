import React from "react";

export default function Blog() {
  return (
    <section className="pb-10">
      <div>
        <h2 className="my-10 text-5xl font-bold text-black">Blog</h2>
        <div className=" grid gap-8 lg:grid-cols-4">
          <article className="rounded-2xl bg-primary-300 h-96 w-64 bg-cover bg-center p-7 duration-200 ease-in  hover:drop-shadow-xl">
            <h2 className="mt-60 mb-6 text-2xl text-white">5 dicas importantes para os senhorios</h2>

          </article>

          <article className="rounded-2xl bg-primary-300 h-96 w-64 bg-cover bg-center p-7 duration-200 ease-in  hover:drop-shadow-xl">
            <h2 className="mt-36 mb-6 text-2xl text-white">Quarto Privado</h2>
            <p className="text-base text-white">
              O mercado imobiliário e o de arrendamento são dois sectores que andam de mão dada e que são óptimos
              investimentos,
            </p>
          </article>

          <article className="rounded-2xl bg-primary-300 h-96 w-64 bg-cover bg-center p-7 duration-200 ease-in  hover:drop-shadow-xl">
            <h2 className="mt-36 mb-6 text-2xl text-white">Quarto Privado</h2>
            <p className="text-base text-white">
              O mercado imobiliário e o de arrendamento são dois sectores que andam de mão dada e que são óptimos
              investimentos,
            </p>
          </article>

          <article className="rounded-2xl bg-primary-300 h-96 w-64 bg-cover bg-center p-7 duration-200 ease-in  hover:drop-shadow-xl">
            <h2 className="mt-36 mb-6 text-2xl text-white">Quarto Privado</h2>
            <p className="text-base text-white">
              O mercado imobiliário e o de arrendamento são dois sectores que andam de mão dada e que são óptimos
              investimentos,
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
