import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export default function HomeSection3() {
  return (
    <section>
      <div className="container mx-auto mb-28 ">
          <div className="flex justify-between align-middle mb-12 ">
            <h2 className="text-black text-5xl font-bold">Os quartos em destaque na tua área</h2>
            <Link href="/4_5" >
              <a className="flex align-middle items-center rounded-full bg-primary-300 px-4">
                Ver Mais
                <div>
                  <BsArrowRightShort className="bg-white text-primary-500 rounded-full ml-2" />
                </div>
              </a>
            </Link>
          </div>


          
          <div className="grid grid-cols-4 gap-8 ">
            <article className="p-8 relative rounded-3xl bg-gradient-to-r from-gray-400 bg-black transition bg-cover min-h-96 h-96" >
              <h2 className=" text-white text-2xl">Quarto Privado</h2>
              <p className="absolute bottom-8 right-8 text-white bold text-4xl">&euro;320</p>
            </article>

            <article className="p-8 relative rounded-3xl bg-gradient-to-r from-gray-400 bg-black transition bg-cover" >
              <h2 className=" text-white text-2xl">Quarto Privado</h2>
              <p className="absolute bottom-8 right-8 text-white bold text-4xl">&euro;320</p>
            </article>

            <article className="p-8 relative rounded-3xl bg-gradient-to-r from-gray-400 bg-black transition bg-cover" >
              <h2 className=" text-white text-2xl">Quarto Privado</h2>
              <p className="absolute bottom-8 right-8 text-white bold text-4xl">&euro;320</p>
            </article>

            <article className="p-8 relative rounded-3xl bg-gradient-to-r from-gray-400 bg-black transition bg-cover" >
              <h2 className=" text-white text-2xl">Quarto Privado</h2>
              <p className="absolute bottom-8 right-8 text-white bold text-4xl">&euro;320</p>
            </article>
          </div>
      </div>
    </section>
  );
}
