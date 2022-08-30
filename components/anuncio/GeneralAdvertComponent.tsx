import dynamic from "next/dynamic";
import { useGetUserCoordinates } from "../../context/MainProvider";
import Advertisement, { ADVERTISEMENT_PROPERTIES, TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { GEO } from "../../models/utils";
import Input from "../utils/Input";

const MapWithNoSSR = dynamic(() => import("../../components/maps/MainMap"), {
  ssr: false,
});

interface GeneralAdvertComponentProps {
  advertisement: Advertisement;
  onChange: (property, value) => void;
  markerLocation?: GEO;
  onChangeMarker?: (lat, lng) => void;
}

const GeneralAdvertComponent = ({ advertisement, onChange, onChangeMarker }: GeneralAdvertComponentProps) => {
  const userlocation = useGetUserCoordinates();

  const createCurrentMapLocation = () => {
    if (advertisement.geom) {
      return advertisement.geom.coordinates as GEO;
    } else {
      return userlocation;
    }
  };

  return (
    <>
      {advertisement.geom !== null && (
        <>
          <div className="h-96 w-full px-6">
            <MapWithNoSSR
              currentMapCoords={createCurrentMapLocation()}
              draggableMarker={true}
              showCenterMarker={true}
              onChangeMarker={onChangeMarker}
            />
          </div>
        </>
      )}
      <div className="my-5 flex w-full flex-col  justify-between gap-5 lg:flex-row">
        {/* col left */}
        <div className="mt-2 w-full ">
          <div className="">
            <label className="mb-1">Qual o seu tipo de espaço?</label>
            <select
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE, e.target.value)}
              className="w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3"
            >
              {Object.keys(TYPE_ADVERTISEMENT).map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {TYPE_ADVERTISEMENT[type]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="">
            <Input
              label="street"
              margin-bottom="21px"
              labelText="Rua"
              value={advertisement.street}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.STREET, e.target.value)}
            />
          </div>

          <div>
            <Input
              label="floor"
              labelText="Andar"
              value={advertisement.floor}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.FLOOR, e.target.value)}
            />
          </div>
        </div>

        {/* col right */}
        <div className="w-full">
          <div>
            <Input
              label="place"
              labelText="Localidade"
              customCss="icon"
              value={advertisement.place}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.PLACE, e.target.value)}
            />
          </div>

          <div>
            <Input
              label="street_number"
              labelText="Número"
              value={advertisement.streetNumber}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.STREET_NUMBER, e.target.value)}
            />
          </div>

          <div>
            <Input
              label="postal_code"
              labelText="Código Postal"
              value={advertisement.postalCode}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.POSTAL_CODE, e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralAdvertComponent;
