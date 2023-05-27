import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { GEO } from "../../models/utils";
import Button from "../utils/Button";

interface MainMapProps {
  currentMapCoords: GEO | null;
  showCenterMarker: boolean;
  draggableMarker?: boolean;
  allowZoom?: boolean;
  markers?: GEO[];
  onChangeMarker?: (lat: number, lng: number) => void;
}

let icon = new Icon({ iconUrl: "/icons/marker.svg", iconSize: [25, 41], iconAnchor: [12, 41] });

const MainMap = ({
  currentMapCoords,
  markers,
  draggableMarker = false,
  allowZoom = false,
  showCenterMarker = true,
  onChangeMarker,
}: MainMapProps) => {
  const [mapCenter, setMapCenter] = useState<GEO | null>(currentMapCoords);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(() => {});
  };

  useEffect(() => {
    if (currentMapCoords) {
      setMapCenter(currentMapCoords);
    }
  }, [currentMapCoords]);
  return (
    <>
      {mapCenter && (
        <MapContainer
          center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          maxZoom={allowZoom ? 18 : 13}
          className="z-50"
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/paulonotpablo/cl6ppz0xp001l14p3r271vry6/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <MapComponent
            currentMapCoords={currentMapCoords}
            markers={markers}
            draggableMarker={draggableMarker}
            showCenterMarker={showCenterMarker}
            onChangeMarker={onChangeMarker}
          />
        </MapContainer>
      )}
      {!mapCenter && (
        <div className="flex h-full justify-center self-center">
          <div className="my-auto w-32">
            <Button onClick={() => requestLocation()} type="button">
              Add location permissions
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const MapComponent = ({
  currentMapCoords,
  markers,
  draggableMarker,
  showCenterMarker,
  onChangeMarker,
}: MainMapProps) => {
  const [position, setPosition] = useState<GEO | null>(currentMapCoords);
  const map = useMap();

  useEffect(() => {
    if (currentMapCoords) {
      const { lat, lng } = currentMapCoords;
      map.panTo({ lat: lat, lng: lng });
      setPosition({ lat, lng });
    }
  }, [currentMapCoords, map]);

  return (
    <>
      {showCenterMarker && position && (
        <Marker
          position={{ lat: position.lat, lng: position.lng }}
          icon={icon}
          draggable={draggableMarker}
          key="center-marker"
          eventHandlers={{
            moveend: (e) => {
              try {
                const { lat, lng } = e.target.getLatLng();
                onChangeMarker && onChangeMarker(lat, lng);
              } catch {}
            },
          }}
        ></Marker>
      )}
      {markers &&
        markers.map((marker, index) => {
          if (marker) {
            const { lat, lng } = marker;
            return (
              <>
                <Marker position={{ lat, lng: lng }} key={index} icon={icon}></Marker>
              </>
            );
          }
        })}
    </>
  );
};

export default MainMap;
