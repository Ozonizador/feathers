import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { DragEndEvent, Icon } from "leaflet";
import { GEO } from "../../models/utils";

interface MainMapProps {
  currentMapCoords: GEO;
  showCenterMarker: boolean;
  draggableMarker?: boolean;
  allowZoom?: boolean;
  markers?: GEO[];
  onChangeMarker?: (lat, lng) => void;
}

const MainMap = ({
  currentMapCoords,
  markers,
  draggableMarker = false,
  allowZoom = false,
  showCenterMarker = true,
  onChangeMarker,
}: MainMapProps) => {
  const [mapCenter, setMapCenter] = useState<GEO | null>(null);

  let icon = new Icon({ iconUrl: "/icons/marker.svg", iconSize: [25, 41], iconAnchor: [12, 41] });

  useEffect(() => {
    if (currentMapCoords !== null) {
      setMapCenter(currentMapCoords);
    }
  }, [currentMapCoords]);

  const MapComponent = () => {
    const map = useMap();

    useEffect(() => {}, []);

    return (
      <>
        {showCenterMarker && (
          <Marker
            position={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
            icon={icon}
            draggable={draggableMarker}
            eventHandlers={{
              moveend: (e) => {
                try {
                  const { lat, lng } = e.target.getLatLng();
                  onChangeMarker(lat, lng);
                } catch {}
                const target = e.type;
              },
            }}
          ></Marker>
        )}
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
      </>
    );
  };

  return (
    <>
      {mapCenter && (
        <MapContainer
          center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
          zoom={13}
          scrollWheelZoom={allowZoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={allowZoom}
          maxZoom={allowZoom ? 1 : 13}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/paulonotpablo/cl6ppz0xp001l14p3r271vry6/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <MapComponent />
        </MapContainer>
      )}
    </>
  );
};

export default MainMap;
