import React from "react";

import Image from "next/image";
{
  /* AINDA PRECISA DE MUDANÇAS */
}
export const SearchHomeInput = () => {
  // let navigate = useNavigate();
  const routeChange = () => {
    let path = `/4_5`;
    // navigate(path);
  };

  return (
    <>
      <div className="div1 relative mx-2">
        <input type="text" className="w-72 rounded-xl bg-neutral-50 p-6" />
        <p className="absolute top-1/4 px-2">
          Encontrar <Image height={32} width={32} src="/images/icon-home1.svg" alt="" /> em...
        </p>
      </div>
      <div className="div2 relative mx-2">
        <input type="text" className="w-52 rounded-xl bg-neutral-50 p-6" />
        <p className="absolute top-1/4 px-2">
          <Image height={32} width={32} src="/images/icon-arrow-right.svg" alt="" /> Entrada
        </p>
      </div>
      <div className="div3 relative mx-2">
        <input type="text" className="w-52 rounded-xl bg-neutral-50 p-6" />
        <p className="absolute top-1/4 px-2">
          <Image height={32} width={32} src="/images/icon-arrow-left.svg" alt="" /> Saida
        </p>
      </div>
      <button onClick={routeChange} className="bg-primary-500 transition rounded-lg">
        <Image height={32} width={32} src="/images/icon-search.svg" alt="" />
      </button>
    </>
  );
};

export default SearchHomeInput;
