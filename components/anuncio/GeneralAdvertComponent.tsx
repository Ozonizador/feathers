import dynamic from "next/dynamic";
import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useGetUserCoordinates } from "../../context/MainProvider";
import { Advertisement, ADVERTISEMENT_PROPERTIES, TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { REQUIRED_ERROR_MESSAGE } from "../../models/error";
import { CoordinatesAsArray } from "../../models/utils";
import { coordinateArrayToLatitude } from "../../utils/map-services";
import Input from "../utils/Input";

const MapWithNoSSR = dynamic(() => import("../../components/maps/MainMap"), {
  ssr: false,
});

interface GeneralAdvertComponentProps {
  advertisement: Advertisement;
  onChangeMarker?: (lat, lng) => void;
}

const GeneralAdvertComponent = ({ advertisement, onChangeMarker }: GeneralAdvertComponentProps) => {
  const userlocation = useGetUserCoordinates();
  const { control } = useFormContext();

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
        <div className="h-96 w-full px-1">
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
          <div>
            <label className="mb-1">Qual o seu tipo de espaço?</label>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.TYPE}
              defaultValue={"ENTIRE_SPACE"}
              control={control}
              render={({ field: { value, onChange } }) => (
                <select
                  className="w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3"
                  value={value}
                  onChange={onChange}
                >
                  {Object.keys(TYPE_ADVERTISEMENT).map((type, index) => {
                    return (
                      <option key={index} value={type}>
                        {TYPE_ADVERTISEMENT[type]}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>

          <div>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.STREET}
              rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
              control={control}
              defaultValue=""
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  label="street"
                  labelText="Rua *"
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.FLOOR}
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input label="floor" labelText="Andar" onChange={onChange} value={value} />
              )}
            />
          </div>
        </div>

        {/* col right */}
        <div className="w-full">
          <div>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.PLACE}
              rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
              control={control}
              defaultValue=""
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  label="place"
                  labelText="Localidade *"
                  customCss="icon"
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.STREET_NUMBER}
              rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
              control={control}
              defaultValue=""
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  label="street_number"
                  labelText="Número *"
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.POSTAL_CODE}
              rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
              control={control}
              defaultValue=""
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  label="postal_code"
                  labelText="Código Postal *"
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
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
