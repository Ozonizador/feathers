import React from "react";

import Image from "next/image";
import Link from "next/link";
{
  /* AINDA PRECISA DE MUDANÇAS */
}
export const SearchInputField = () => {
  return (
    <>
      <div className="relative my-2 lg:mx-2">
        <input type="text" className="bg-terciary-50 w-72 rounded-xl border p-5" />
        <p className="absolute top-1/4 px-2">
          Encontrar <Image height={32} width={32} src="/images/icon-home1.svg" alt="" /> em...
        </p>
      </div>
      <div className="relative my-2 lg:mx-2">
        <input type="text" className="bg-terciary-50 w-52 rounded-xl border p-5" />
        <p className="absolute top-1/4 px-2">
          <Image height={32} width={32} src="/images/icon-arrow-right.svg" alt="" /> Entrada
        </p>
      </div>
      <div className="relative my-2 lg:mx-2">
        <input type="text" className="bg-terciary-50 w-52 rounded-xl border p-5" />
        <p className="absolute top-1/4 px-2">
          <Image height={32} width={32} src="/images/icon-arrow-left.svg" alt="" /> Saida
        </p>
      </div>
      <div className="my-2 border">
        <Link href="/destaques">
          <a>
            <button className="h-16 w-32 rounded-lg bg-primary-500 px-6 transition">
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
    </>
  );
};

export default SearchInputField;
