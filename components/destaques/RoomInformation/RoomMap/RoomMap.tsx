import React from "react";
import dynamic from "next/dynamic";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { coordinatesArrayToGeoPoint } from "../../../../utils/map-services";
import { CoordinatesAsArray } from "../../../../models/utils";
import { useTranslation } from "next-i18next";

const MapWithNoSSR = dynamic(() => import("../../../../components/maps/MainMap"), {
  ssr: false,
});

export default function RoomMap() {
  const { t } = useTranslation();
  const advertisement = useGetSingleAdvertisement();

  const geom = (advertisement?.geom as { type: string; coordinates: CoordinatesAsArray }) || undefined;

  const geoCoordinates = (geom && coordinatesArrayToGeoPoint(geom.coordinates)) || null;

  return (
    <section className="my-16">
      {geom !== null && geom?.coordinates !== null && (
        <>
          <div className="mb-5 text-2xl font-bold">{t("where_space_is")}</div>
          <div className="h-72 w-full rounded-md lg:h-72">
            <MapWithNoSSR currentMapCoords={geoCoordinates} showCenterMarker={true} />
          </div>
        </>
      )}
      {geom === null && <div>{t("location_not_available")}</div>}
    </section>
  );
}
