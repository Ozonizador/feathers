import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { Coordinates, MapCoordinates } from "../../../../models/utils";

const MapWithNoSSR = dynamic(() => import("../../../../components/maps/MainMap"), {
  ssr: false,
});

export default function RoomMap() {
  const { latitude, longitude } = { latitude: 0, longitude: 0 };

  const currentMap = [latitude, longitude] as Coordinates;
  return (
    <section className="my-32">
      {latitude !== null && longitude !== null && (
        <>
          <div className="mb-5 text-2xl font-bold">Este espaço localiza-se nesta zona</div>

          <div className="h-64 w-3/5 rounded-md">
            <MapWithNoSSR currentMapCoords={currentMap} />
          </div>
        </>
      )}
      {latitude === null && longitude === null && <div>Localização não disponivel.</div>}
    </section>
  );
}
