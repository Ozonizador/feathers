import dynamic from "next/dynamic";
import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useGetUserCoordinates } from "../../context/MainProvider";
import { Advertisement, ADVERTISEMENT_PROPERTIES, TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { CoordinatesAsArray } from "../../models/utils";
import { coordinateArrayToLatitude } from "../../utils/map-services";
import Input from "../utils/Input";

const MapWithNoSSR = dynamic(() => import("../../components/maps/MainMap"), {
  ssr: false,
});

interface GeneralAdvertComponentProps {
  advertisement: Advertisement;
  onChange: (property: string, value: unknown) => void;
  onChangeMarker?: (lat, lng) => void;
}

const GeneralAdvertComponent = ({ advertisement, onChange, onChangeMarker }: GeneralAdvertComponentProps) => {
  const userlocation = useGetUserCoordinates();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  const createCurrentMapLocation = useCallback(() => {
    if (advertisement.geom) {
      const { lat, lng } = coordinateArrayToLatitude(advertisement.geom.coordinates as CoordinatesAsArray);
      return { lat, lng };
    } else {
      return userlocation;
    }
  }, [advertisement.geom, userlocation]);

  return (
    <>
      <>
        <div className="h-96 w-full px-6">
          <MapWithNoSSR
            currentMapCoords={createCurrentMapLocation()}
            draggableMarker={true}
            showCenterMarker={true}
            onChangeMarker={onChangeMarker}
            allowZoom={true}
          />
        </div>
      </>
      <div className="my-5 flex w-full flex-col justify-between gap-5 lg:flex-row">
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

          <div>
            <Controller
              name="street"
              rules={{ required: true }}
              render={() => (
                <Input
                  label="street"
                  labelText="Rua *"
                  value={advertisement.street}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.STREET, e.target.value)}
                  errorMessage={errors.street ? (errors.street.message as string) : null}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="floor"
              rules={{ required: true }}
              render={() => (
                <Input
                  label="floor"
                  labelText="Andar"
                  value={advertisement.floor}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.FLOOR, e.target.value)}
                />
              )}
            />
          </div>
        </div>

        {/* col right */}
        <div className="w-full">
          <div>
            <Controller
              name="place"
              rules={{ required: true }}
              render={() => (
                <Input
                  label="place"
                  labelText="Localidade *"
                  customCss="icon"
                  value={advertisement.place}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.PLACE, e.target.value)}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="street_number"
              rules={{ required: true }}
              render={() => (
                <Input
                  label="street_number"
                  labelText="Número *"
                  value={advertisement.street_number}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.STREET_NUMBER, e.target.value)}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="postal_code"
              render={() => (
                <Input
                  label="postal_code"
                  labelText="Código Postal *"
                  value={advertisement.postal_code}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.POSTAL_CODE, e.target.value)}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralAdvertComponent;
