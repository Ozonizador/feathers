import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { CgArrowDown, CgArrowRight } from "react-icons/cg";
import { FcLock } from "react-icons/fc";
import classNames from "classnames";

type UnideskMenuSectionOption = {
  blocked: boolean;
  link?: string;
  text: string;
};

interface SectionCardProps {
  topIcon: { link?: string; image: string; text: string };
  options: UnideskMenuSectionOption[];
}

export const MenuSectionCard = ({ topIcon, options }: SectionCardProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(true);

  return (
    <div className="flex cursor-pointer flex-col gap-5 rounded-2xl bg-white p-5 drop-shadow-2xl lg:w-2/6 lg:pb-10">
      <div className="flex lg:block">
        {topIcon && (
          <>
            {topIcon.link ? (
              <Link href={topIcon.link}>
                <div className="flex w-full flex-row items-center align-middle lg:flex-col lg:pt-12">
                  <div className="relative h-8 w-8 lg:h-20 lg:w-20">
                    <Image src={topIcon.image} alt="" layout="fill"></Image>
                  </div>
                  <h1 className="ml-2 text-center text-xl font-bold text-primary-500 lg:mt-4 lg:ml-0 lg:text-2xl">
                    {topIcon.text}
                  </h1>
                  {options && options.length > 0 && (
                    <div className="my-auto ml-auto lg:hidden">
                      {openMenu && <CgArrowDown onClick={() => setOpenMenu(false)} size={24} />}
                      {!openMenu && <CgArrowRight onClick={() => setOpenMenu(true)} size={24} />}
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <div className="flex w-full flex-row justify-center lg:flex-col lg:pt-12">
                <div className="relative h-8 w-8 lg:mx-auto lg:h-20 lg:w-20">
                  <Image src={topIcon.image} alt="" layout="fill"></Image>
                </div>
                <h1 className="my-auto ml-2 text-center text-xl font-bold text-primary-500 lg:ml-0 lg:mt-4 lg:text-2xl">
                  {topIcon.text}
                </h1>
                <div className="my-auto ml-auto lg:hidden">
                  {openMenu && <CgArrowDown onClick={() => setOpenMenu(false)} size={24} />}
                  {!openMenu && <CgArrowRight onClick={() => setOpenMenu(true)} size={24} />}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {options && options.length > 0 && (
        <div
          className={classNames("mt-2 flex flex-col justify-start gap-5 transition-all ease-in", {
            hidden: !openMenu,
            block: openMenu,
          })}
        >
          {options &&
            options.map((option, index) => {
              return option.blocked ? (
                <div className="flex flex-1 items-center" key={index}>
                  <FcLock size="24" />
                  <p className="ml-3 text-base font-bold">{option.text}</p>
                </div>
              ) : (
                <Link href={option.link} key={index}>
                  <a className="text-xl font-bold">{option.text}</a>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};
