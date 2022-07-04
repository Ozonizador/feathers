import React from "react";

import Image from "next/image";
{
  /* AINDA PRECISA DE MUDANÇAS */
}
export const SearchHomeInput = () => {
  return (
    <>
      <div className="div1 relative my-2 lg:mx-2">
        <input type="text" className="bg-terciary-50 w-72 rounded-xl p-6" />
        <p className="absolute top-1/4 px-2">
          Encontrar <Image height={32} width={32} src="/images/icon-home1.svg" alt="" /> em...
        </p>
      </div>
      <div className="div2 relative my-2 lg:mx-2">
        <input type="text" className="bg-terciary-50 w-52 rounded-xl p-6" />
        <p className="absolute top-1/4 px-2">
          <Image height={32} width={32} src="/images/icon-arrow-right.svg" alt="" /> Entrada
        </p>
      </div>
      <div className="div3 relative my-2 lg:mx-2">
        <input type="text" className="bg-terciary-50 w-52 rounded-xl p-6" />
        <p className="absolute top-1/4 px-2">
          <Image height={32} width={32} src="/images/icon-arrow-left.svg" alt="" /> Saida
        </p>
      </div>
      <button className="h-16 w-32 rounded-lg bg-primary-500 px-6 transition">
        <Image height={32} width={32} src="/images/icon-search.svg" alt="" />
      </button>
    </>
  );
};

export default SearchHomeInput;
