import React from "react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { useTranslation } from "next-i18next";

export default function DescricaoCondicoes() {
  const { t } = useTranslation();
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="flex flex-col gap-2 lg:w-2/3">
      <div className="flex text-2xl font-bold">{t("description")}</div>
      <div className="py-2">
        <div className="text-justify text-base text-secondary-500">{advertisement?.description || ""} {advertisement?.host_lives_property ? t("advertisements:lives_in_property") : ""}</div>
      </div>
    </div>
  );
}
