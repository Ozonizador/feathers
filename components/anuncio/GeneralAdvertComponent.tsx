import dynamic from "next/dynamic";
import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useGetUserCoordinates } from "../../context/MainProvider";
import { Advertisement, ADVERTISEMENT_PROPERTIES, TYPE_ADVERTISEMENT } from "../../models/advertisement";
import { REQUIRED_ERROR_MESSAGE } from "../../models/error";
import { CoordinatesAsArray } from "../../models/utils";
import { coordinateArrayToLatitude } from "../../utils/map-services";
import Input from "../utils/Input";
import classNames from "classnames";

const MapWithNoSSR = dynamic(() => import("../../components/maps/MainMap"), {
  ssr: false,
});

interface GeneralAdvertComponentProps {
  advertisement: Advertisement;
  onChangeMarker?: (lat: number, lng: number) => void;
}

const GeneralAdvertComponent = ({ advertisement, onChangeMarker }: GeneralAdvertComponentProps) => {
  const userlocation = useGetUserCoordinates();
  const { control } = useFormContext();

  const createCurrentMapLocation = useCallback(() => {
    if (advertisement.geom) {
      const { lat, lng } = coordinateArrayToLatitude(
        (advertisement.geom as { type: string; coordinates: CoordinatesAsArray }).coordinates as CoordinatesAsArray
      );
      return { lat, lng };
    } else {
      return userlocation;
    }
  }, [advertisement.geom, userlocation]);

  return (
    <>
      <>
        <div
          className={classNames("w-full px-1", {
            "h-96": !!createCurrentMapLocation(),
          })}
        >
          <MapWithNoSSR
            currentMapCoords={createCurrentMapLocation()}
            draggableMarker={true}
            showCenterMarker={true}
            onChangeMarker={onChangeMarker}
            allowZoom={true}
          />
        </div>
      </>
      <div className="my-5 flex w-full flex-col justify-between lg:flex-row lg:gap-5">
        {/* col left */}
        <div className="mt-2 flex w-full flex-col gap-2 lg:mt-0">
          <div>
            <label className="mb-1">Qual o seu tipo de espaço?</label>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.TYPE}
              defaultValue={"ENTIRE_SPACE"}
              control={control}
              render={({ field: { value, onChange } }) => (
                <select
                  className="w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-2"
                  value={value}
                  onChange={onChange}
                >
                  {Object.keys(TYPE_ADVERTISEMENT).map((type, index) => {
                    return (
                      <option key={index} value={type}>
                        {TYPE_ADVERTISEMENT[type as keyof typeof TYPE_ADVERTISEMENT]}
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
                  name="street"
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
                <Input name="floor" labelText="Andar" onChange={onChange} value={value} />
              )}
            />
          </div>
        </div>

        {/* col right */}
        <div className="flex w-full flex-col gap-2">
          <div>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.PLACE}
              rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
              control={control}
              defaultValue=""
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="place"
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
                  name="street_number"
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
                  name="postal_code"
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
