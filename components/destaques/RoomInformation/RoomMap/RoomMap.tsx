import React from "react";
import dynamic from "next/dynamic";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { getCoordsFromPoint } from "../../../../services/mapService";
import { MapCoordinates } from "../../../../models/utils";

const MapWithNoSSR = dynamic(() => import("../../../../components/maps/MainMap"), {
  ssr: false,
});

export default function RoomMap() {
  const advertisement = useGetSingleAdvertisement();

  const geom = advertisement.geom as MapCoordinates;

  return (
    <section className="my-32">
      {geom !== null && (
        <>
          <div className="mb-5 text-2xl font-bold">Este espaço localiza-se nesta zona</div>

          <div className="h-64 w-3/5 rounded-md">
            <MapWithNoSSR currentMapCoords={geom.coordinates} />
          </div>
        </>
      )}
      {geom === null && <div>Localização não disponivel.</div>}
    </section>
  );
}
