import React from "react";
import { Card } from "flowbite-react/lib/esm/components";
import Image from "next/image";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import classNames from "classnames";
import { hostTranslate, hostTypeFlexDescription } from "../../../../helpers/advertisementHelper";
import { FlexHostType } from "../../../../models/advertisement";
import { Gender } from "../../../../models/profile";

export default function RoomSenhorio() {
  const advertisement = useGetSingleAdvertisement();
  return (
    <section className="my-20">
      <div className="mb-5 text-2xl font-bold">Sobre o seu senhorio</div>

      <div className="block max-w-md lg:hidden">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Olá, sou a {advertisement.host.name}!</h1>
          <p className="text-secondary-400">{advertisement.host.description}</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8 lg:w-11/12 lg:flex-row lg:items-end">
        <div className="max-w-md">
          <div className="w-full lg:w-64">
            <Card>
              <div className="flex justify-end px-4 pt-4"></div>
              <div className="flex flex-col items-center pb-10">
                <Image
                  className="mb-3 h-24 w-24 rounded-full shadow-lg"
                  src={
                    advertisement.host.avatar_url
                      ? advertisement.host.avatar_url
                      : "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  }
                  alt="Bonnie image"
                  height={96}
                  width={96}
                  unoptimized={true}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{advertisement.host.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{`${
                  advertisement.host.gender === Gender.female ? "Senhoria" : "Senhorio"
                } desde ${new Date(advertisement.host.created_at).getFullYear()}`}</span>
                <hr />
                {/* <div className="mt-4 flex items-center space-x-3 lg:mt-6">
                  <div className="">
                    <RiMailSendFill className=" text-4xl text-blue-600 " />
                  </div>
                  <div className="">
                    Taxa de resposta <br /> 90%
                  </div>
                </div> */}
              </div>
            </Card>
          </div>
        </div>

        <div className="flex w-full flex-col lg:w-7/12">
          <div className="hidden max-w-md lg:block">
            <div>
              <h1 className="mb-4 text-2xl font-bold">Olá, sou a {advertisement.host.name}!</h1>
              <p className="text-secondary-400">{advertisement.host.description}</p>
            </div>
          </div>

          <div className="mt-8 w-full">
            <Card>
              <h1 className="text-xl font-bold">Política de Cancelamento</h1>

              <div className="flex flex-row items-start justify-start gap-4 align-top">
                <div
                  className={classNames("h-5 w-12 rounded-full ", {
                    "bg-orange-400": advertisement.type_flex_host === FlexHostType.MODERATE,
                    "bg-yellow-300": advertisement.type_flex_host === FlexHostType.FLEX,
                    "bg-green-500": advertisement.type_flex_host === FlexHostType.SUPER_FLEX,
                    "bg-red-600": advertisement.type_flex_host === FlexHostType.RIGID,
                  })}
                ></div>

                <div className="flex flex-col">
                  <h2 className="text-base font-bold">{hostTranslate(advertisement.type_flex_host)}</h2>
                  <p className="text-base text-secondary-400">
                    {hostTypeFlexDescription(advertisement.type_flex_host)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
