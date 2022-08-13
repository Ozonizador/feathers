import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { MapCoordinates } from "../../../../models/utils";

const MapWithNoSSR = dynamic(() => import("../../../../components/maps/MainMap"), {
  ssr: false,
});

export default function RoomMap() {
  const { latitude, longitude } = useGetSingleAdvertisement();

  const currentMap = { latitude, longitude } as MapCoordinates;
  return (
    <section className="my-32">
      {latitude !== null && longitude !== null && (
        <>
          <div className="mb-5 text-2xl font-bold">Este espaço localiza-se nesta zona</div>

          <div className="h-64 w-3/5 rounded-md">
            <MapWithNoSSR currentMap={currentMap} />
          </div>
        </>
      )}
      {latitude === null && longitude === null && <div>Localização não disponivel.</div>}
    </section>
  );
}
