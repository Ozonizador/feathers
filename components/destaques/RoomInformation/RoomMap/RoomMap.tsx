import React from "react";
import dynamic from "next/dynamic";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { coordinateArrayToLatitude } from "../../../../utils/map-services";

const MapWithNoSSR = dynamic(() => import("../../../../components/maps/MainMap"), {
  ssr: false,
});

export default function RoomMap() {
  const advertisement = useGetSingleAdvertisement();

  const geom = advertisement.geom;

  const geoCoordinates = coordinateArrayToLatitude(geom.coordinates);

  return (
    <section className="my-32">
      {geom !== null && geom.coordinates !== null && (
        <>
          <div className="mb-5 text-2xl font-bold">Este espaço localiza-se nesta zona</div>
          <div className="h-64 w-3/5 rounded-md">
            <MapWithNoSSR currentMapCoords={geoCoordinates} showCenterMarker={true} />
          </div>
        </>
      )}
      {geom === null && <div>Localização não disponivel.</div>}
    </section>
  );
}
