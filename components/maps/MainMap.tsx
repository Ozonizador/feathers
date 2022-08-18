import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Coordinates } from "../../models/utils";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { getCoordsFromPoint } from "../../services/mapService";
import { Icon } from "leaflet";

interface MainMapProps {
  currentMapCoords: Coordinates;
  markers?: any;
}

const MainMap = ({ currentMapCoords, markers }: MainMapProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { latitude, longitude } = getCoordsFromPoint(currentMapCoords);
  useEffect(() => {
    if (currentMapCoords) {
      setLoading(false);
    }
  }, [currentMapCoords]);

  return (
    <>
      {loading && (
        <div className="mt-32 flex flex-1 justify-center">
          <Spinner color="info" aria-label="loading" size="lg" />
        </div>
      )}
      {!loading && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/paulonotpablo/cl6ppz0xp001l14p3r271vry6/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <Marker
            position={[latitude, longitude]}
            icon={new Icon({ iconUrl: "/images/5.png", iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default MainMap;
