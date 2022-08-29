import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { GEO } from "../../models/utils";

interface MainMapProps {
  currentMapCoords: GEO;
  showCenterMarker: boolean;
  draggableMarker?: boolean;
  allowZoom?: boolean;
  markers?: GEO[];
}

const MainMap = ({
  currentMapCoords,
  markers,
  draggableMarker = false,
  allowZoom = false,
  showCenterMarker = true,
}: MainMapProps) => {
  const [mapCenter, setMapCenter] = useState<GEO | null>(null);

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : <Marker position={position} icon={icon} draggable={draggableMarker}></Marker>;
  };

  let icon = new Icon({ iconUrl: "/icons/marker.svg", iconSize: [25, 41], iconAnchor: [12, 41] });

  useEffect(() => {
    if (currentMapCoords !== null) {
      setMapCenter(currentMapCoords);
    }
  }, [currentMapCoords]);

  return (
    <>
      {mapCenter && (
        <MapContainer
          center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
          zoom={13}
          scrollWheelZoom={allowZoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/paulonotpablo/cl6ppz0xp001l14p3r271vry6/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />

          {markers &&
            markers.map((marker, index) => {
              if (marker) {
                const { latitude, longitude } = marker;
                return (
                  <>
                    <Marker position={{ lat: latitude, lng: longitude }} key={index}></Marker>
                  </>
                );
              }
            })}
          <LocationMarker />
        </MapContainer>
      )}
      {/* )} */}
    </>
  );
};

export default MainMap;
