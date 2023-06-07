import React from "react";
import dynamic from "next/dynamic";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { coordinateArrayToLatitude } from "../../../../utils/map-services";
import { CoordinatesAsArray } from "../../../../models/utils";

const MapWithNoSSR = dynamic(() => import("../../../../components/maps/MainMap"), {
  ssr: false,
});

export default function RoomMap() {
  const advertisement = useGetSingleAdvertisement();

  const geom = (advertisement?.geom as { type: string; coordinates: CoordinatesAsArray }) || undefined;

  const geoCoordinates = (geom && coordinateArrayToLatitude(geom.coordinates)) || null;

  return (
    <section className="my-32">
      {geom !== null && geom.coordinates !== null && (
        <>
          <div className="mb-5 text-2xl font-bold">Este espaço localiza-se nesta zona</div>
          <div className="h-72 w-full rounded-md lg:h-64 lg:w-3/5">
            <MapWithNoSSR currentMapCoords={geoCoordinates} showCenterMarker={true} />
          </div>
        </>
      )}
      {geom === null && <div>Localização não disponivel.</div>}
    </section>
  );
}
