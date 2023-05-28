import React from "react";
import Image from "next/image";

interface HomeSection2CardsProps {
  img: string;
  icon: string;
  heading: string;
  text: string;
}

const HomeSection2Cards = ({ img, icon, heading, text }: HomeSection2CardsProps) => {
  return (
    <>
      <div className="hidden w-full lg:block">
        <article className="card mb-8 flex w-full items-center justify-between rounded-2xl bg-white p-5 drop-shadow-xl">
          <Image src={img} alt="" height={109} width={109}></Image>
          <div className="mx-5">
            <Image src={icon} alt="" height={48} width={48}></Image>
          </div>
          <div className="w-full">
            <h2 className="mb-4 text-2xl font-bold text-secondary-600">{heading}</h2>
            <p className="text-secondary-400">{text}</p>
          </div>
        </article>
      </div>

      <div className="block lg:hidden">
        <article className="card  mb-8 w-full rounded-2xl bg-white p-5 drop-shadow-xl">
          <Image src={img} alt="" height={109} width={109}></Image>
          <div className="mt-2 flex flex-col">
            <div className="flex flex-row items-center align-middle">
              <div className="mr-3 ">
                <Image src={icon} alt="" height={48} width={48}></Image>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-secondary-600">{heading}</h2>
              </div>
            </div>
            <p className="mt-4 text-secondary-400">{text}</p>
          </div>
        </article>
      </div>
    </>
  );
};

export default HomeSection2Cards;
