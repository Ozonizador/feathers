import React from "react";
import Image from "next/image";
import SearchInputField from "../../search/SearchInputField";

const HomeSection1 = () => {
  return (
    <section>
      <div className="flex justify-center  bg-[url('/images/furniture5.jpg')] bg-cover px-1 py-52 ">
        <div className="flex flex-col px-4  align-middle md:container lg:px-10">
          <h1 className="mb-5 ml-2 text-4xl font-bold leading-snug  text-white lg:mx-0 lg:mb-0 lg:text-6xl">
            A tua{" "}
            <Image
              className="display: top-40;  relative  left-0 inline-block"
              src="/images/icon-home.svg"
              alt=""
              height={64}
              width={64}
            />{" "}
            à distancia de um <br className="hidden lg:block " />
            <span className="top-5 lg:relative">click!</span>
          </h1>
          <div className="flex flex-col gap-2 lg:flex-row">
            <SearchInputField />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection1;
