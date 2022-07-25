import React from "react";

import Image from "next/image";
import Link from "next/link";
{
  /* AINDA PRECISA DE MUDANÇAS */
}
export const SearchInputField = () => {
  return (
    <>
      <div className="container lg:flex flex-row justify-center">
        <div className="relative my-2 lg:mx-2">
          <input type="text" className="bg-terciary-50 peer w-full rounded-xl border  p-5 lg:w-72 border-primary-500" />
          <p className="absolute top-1/4 px-2 peer-focus:hidden">
            Encontrar <Image height={32} width={32} src="/images/icon-home1.svg" alt="" /> em...
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <div className="relative my-2 lg:mx-2">
            <input type="text" className="bg-terciary-50 peer w-full rounded-xl border p-5 lg:w-52" />
            <p className="absolute top-1/4 px-2 peer-focus:hidden">
              <Image height={32} width={32} src="/images/icon-arrow-right.svg" alt="" /> Entrada
            </p>
          </div>
          <div className="relative my-2 lg:mx-2">
            <input type="text" className="bg-terciary-50 peer w-full rounded-xl border p-5 lg:w-52" />
            <p className="absolute top-1/4 px-2 peer-focus:hidden">
              <Image height={32} width={32} src="/images/icon-arrow-left.svg" alt="" /> Saida
            </p>
          </div>
        </div>
        <div className="my-2">
          <Link href="/procurar">
            <a>
              <button className="h-16 w-full rounded-lg bg-primary-500 px-6 transition lg:w-32">
                <Image
                  height={32}
                  width={32}
                  src="/images/icon-search.svg"
                  className="my-auto mx-auto"
                  alt=""
                />
              </button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchInputField;
