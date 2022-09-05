import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export default function HomeSection3() {
  return (
    <section>
      <div className="mb-28 mt-5">
        <div className="hidden lg:block">
          <div className="mb-12 flex justify-between align-middle">
            <h2 className="text-5xl font-bold text-black">Os quartos em destaque na tua área</h2>

            <Link href="/procurar">
              <a className="flex items-center rounded-full bg-primary-300 px-4 align-middle">
                Ver Mais
                <div>
                  <BsArrowRightShort className="ml-2 rounded-full bg-white text-primary-500" />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <h2 className="mb-8 text-4xl font-bold text-black lg:hidden">Os quartos em destaque na tua área</h2>

        <div className="grid gap-8 lg:grid-cols-4 lg:h-96">
          <article className="min-h-96 relative h-96 rounded-3xl bg-black bg-gradient-to-r from-gray-400 bg-cover p-8 transition lg:h-3/4">
            <h2 className=" text-xl text-white">Quarto Privado</h2>
            <p className="bold absolute bottom-8 right-8 text-4xl text-white">&euro;320</p>
          </article>

          <article className="min-h-96 relative h-96 rounded-3xl bg-black bg-gradient-to-r from-gray-400 bg-cover p-8 transition lg:h-3/4">
            <h2 className=" text-xl text-white">Quarto Privado</h2>
            <p className="bold absolute bottom-8 right-8 text-4xl text-white">&euro;320</p>
          </article>

          <article className="min-h-96 relative h-96 rounded-3xl bg-black bg-gradient-to-r from-gray-400 bg-cover p-8 transition lg:h-3/4">
            <h2 className=" text-xl text-white">Quarto Privado</h2>
            <p className="bold absolute bottom-8 right-8 text-4xl text-white">&euro;320</p>
          </article>

          <article className="min-h-96 relative h-96 rounded-3xl bg-black bg-gradient-to-r from-gray-400 bg-cover p-8 transition lg:h-3/4">
            <h2 className=" text-xl text-white">Quarto Privado</h2>
            <p className="bold absolute bottom-8 right-8 text-4xl text-white">&euro;320</p>
          </article>
        </div>

        <div className="block lg:hidden">
          <div className="mb-12 mt-10 flex justify-center align-middle">
            <Link href="/procurar">
              <a className="flex w-full items-center justify-center rounded-full bg-primary-300 px-4 py-3 align-middle">
                Ver Mais
                <div>
                  <BsArrowRightShort className="ml-2 rounded-full bg-white text-primary-500" />
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
