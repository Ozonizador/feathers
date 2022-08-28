import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { getCoordsFromPoint } from "../../services/mapService";
import { Icon } from "leaflet";
import { Coordinates, GEO } from "../../models/utils";

interface MainMapProps {
  currentMapCoords: Coordinates;
  markers?: Coordinates[];
  draggableMarker?: boolean;
}

const MainMap = ({ currentMapCoords, markers, draggableMarker = false }: MainMapProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [mapCenter, setMapCenter] = useState<GEO>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if (currentMapCoords) {
      const { latitude, longitude } = getCoordsFromPoint(currentMapCoords);
      setMapCenter({ latitude, longitude });
      setLoading(false);
    }
  }, [currentMapCoords]);

  let icon = new Icon({ iconUrl: "/icons/marker.svg", iconSize: [25, 41], iconAnchor: [12, 41] });

  const SetViewOnClick = ({ coords }) => {
    const map = useMap();
    if (coords) {
      map.setView(coords, map.getZoom());
    }
    return null;
  };

  return (
    <>
      {loading && (
        <div className="mt-32 flex flex-1 justify-center">
          <Spinner color="info" aria-label="loading" size="lg" />
        </div>
      )}
      {!loading && (
        <MapContainer
          center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/paulonotpablo/cl6ppz0xp001l14p3r271vry6/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />

          {markers &&
            markers.map((marker, index) => {
              if (marker) {
                const { latitude: markerLat, longitude: markerLong } = getCoordsFromPoint(marker);
                return (
                  <>
                    <Marker
                      position={[markerLat, markerLong]}
                      icon={icon}
                      draggable={draggableMarker}
                      key={index}
                    ></Marker>
                  </>
                );
              }
            })}
          <SetViewOnClick coords={{ lat: mapCenter.latitude, lng: mapCenter.longitude }} />
        </MapContainer>
      )}
    </>
  );
};

export default MainMap;
