import React from "react";
import Image from "next/image";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import classNames from "classnames";
import { hostTranslate, hostTypeFlexDescription } from "../../../../helpers/advertisementHelper";
import { Gender } from "../../../../models/profile";
import { RiMailSendFill } from "react-icons/ri";
import { Card } from "flowbite-react";
import { useTranslation } from "next-i18next";

interface RoomSenhorioProps {
  responseRate: number;
}
export default function RoomSenhorio({ responseRate }: RoomSenhorioProps) {
  const { t } = useTranslation();
  const advertisement = useGetSingleAdvertisement();

  return (
    <section className="my-20">
      <div className="mb-5 text-2xl font-bold">{t("about_landlord")}</div>
      <div className="block max-w-md lg:hidden">
        <div>
          {advertisement && (
            <h1 className="mb-4 text-2xl font-bold">
              {t("hello_im", {
                context: advertisement.host?.gender == 2 ? "female" : "male",
                name: advertisement.host?.name,
              })}
            </h1>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-8 lg:w-11/12 lg:flex-row lg:items-end">
        <div>
          <div className="w-full lg:w-64">
            <Card href={`/perfil/${advertisement?.host?.slug}`}>
              <div className="flex justify-end px-4 pt-4 cursor-pointer"></div>
              <div className="flex flex-col items-center pb-10">
                <div className="rounded-full shadow-md" style={{ height: "96px", width: "96px" }}>
                  <Image
                    className="mb-3 rounded-full object-cover"
                    src={advertisement?.host?.avatar_url || "/icons/user/user.svg"}
                    alt="host"
                    width={0}
                    height={0}
                    style={{ height: "100%", width: "100%" }}
                    unoptimized={true}
                  />
                </div>
                <h5 className="my-1 text-xl font-medium text-gray-900 dark:text-white">
                  {advertisement?.host?.name || ""}
                </h5>
                {advertisement && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t("landlord_since", {
                      year: new Date(advertisement.host?.created_at).getFullYear(),
                      context: advertisement.host?.gender === Gender.female ? "female" : "male",
                    })}
                  </span>
                )}
                <hr />
                <div className="mt-4 flex items-center space-x-3 lg:mt-6">
                  <div className="">
                    <RiMailSendFill className=" text-4xl text-blue-600 " />
                  </div>
                  <div className="text-center">
                    {t("response_rate")}
                    <br /> {responseRate !== 0 ? responseRate : "0"}%
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex w-full flex-col lg:w-7/12">
          <div className="hidden max-w-md lg:block">
            <div>
              {advertisement && (
                <h1 className="mb-4 text-2xl font-bold">
                  {t("hello_im", {
                    context: advertisement.host?.gender == 2 ? "female" : "male",
                    name: advertisement.host?.name,
                  })}
                </h1>
              )}
            </div>
          </div>

          <div className="w-full">
            <Card>
              <h1 className="text-xl font-bold">{t("advertisements:add_advert.cancellation_policy")}</h1>
              <div className="flex flex-row items-start justify-start gap-4 align-top">
                <div
                  className={classNames("h-5 w-12 rounded-full ", {
                    "bg-orange-400": advertisement?.type_flex_host === "MODERATE",
                    "bg-yellow-300": advertisement?.type_flex_host === "FLEX",
                    "bg-green-500": advertisement?.type_flex_host === "SUPER_FLEX",
                    "bg-red-600": advertisement?.type_flex_host === "RIGID",
                  })}
                ></div>

                <div className="flex flex-col">
                  <h2 className="text-base font-bold">
                    {(advertisement && t(hostTranslate(advertisement?.type_flex_host))) || ""}
                  </h2>
                  <p className="text-base text-secondary-400">
                    {advertisement && t(hostTypeFlexDescription(advertisement?.type_flex_host || ""))}
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
