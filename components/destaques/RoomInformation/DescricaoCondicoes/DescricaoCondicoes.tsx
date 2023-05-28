import React from "react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

export default function DescricaoCondicoes() {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="flex flex-col gap-2 lg:w-2/3">
      <div className="flex text-2xl font-bold">Descrição</div>
      <div className="py-2">
        <div className="text-justify text-base text-secondary-500">{advertisement?.description || ""}</div>
      </div>
    </div>
  );
}
