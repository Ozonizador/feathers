import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapCoordinates } from "../../models/utils";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

interface MainMapProps {
  currentMap: MapCoordinates;
  markers?: any;
}

const MainMap = ({ currentMap, markers }: MainMapProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentMap) {
      setLoading(false);
    }
  }, [currentMap]);

  return (
    <>
      {loading && (
        <div className="mt-32 flex flex-1 justify-center">
          <Spinner color="info" aria-label="loading" size="lg" />
        </div>
      )}
      {!loading && (
        <MapContainer
          center={[currentMap.latitude, currentMap.longitude]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/paulonotpablo/cl6ppz0xp001l14p3r271vry6/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <Marker position={[51.505, -0.09]}>
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
