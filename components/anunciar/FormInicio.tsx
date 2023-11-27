import React from "react";
import { useIncrementStep } from "../../context/AnunciarProvider";
import { useTranslation } from "next-i18next";
import {
  useAdvertisement,
  useSetAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import GeneralAdvertComponent from "../anuncio/GeneralAdvertComponent";
import { getResultsFromSearch } from "../../hooks/mapService";
import { ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import _ from "lodash";
import { MapCoordinates } from "../../models/utils";
import { coordinatesObjectToArray } from "../../utils/map-services";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../utils/Button";

type FormInicioProps = {
  street: string;
  place: string;
  street_number: string;
  postal_code: string;
  type: string;
  floor: string;
};

const FormInicio = () => {
  /* STEPS */
  const incrementStep = useIncrementStep();
  const { t } = useTranslation();

  /* ADVERTISEMENT */
  const advertisement = useAdvertisement();
  const changeAdvertisementProperty = useSetAdvertisementProperty();
  const setAdvertisement = useSetAdvertisement();

  /* Form */
  const methods = useForm<FormInicioProps>({
    defaultValues: {
      street: advertisement.street,
      place: advertisement.place,
      street_number: advertisement.street_number,
      type: advertisement.type,
      floor: advertisement.floor || undefined,
      postal_code: advertisement.postal_code,
    },
  });

  const nextStep = async (data: any) => {
    setAdvertisement({ ...advertisement, ...data });
    incrementStep();
  };

  const checkPossibilites = async () => {
    const { getValues } = methods;
    const { place, street_number, postal_code, street } = getValues();
    const { data, error } = await getResultsFromSearch(`${street} ${place} ${street_number} ${postal_code}`);

    if (!error && data && data.length > 0) {
      const feature = data[0];
      const geometry = feature.geometry as MapCoordinates;
      if (geometry) {
        changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, geometry);
      }
    }
  };

  const onChangeMarker = (lat: number, lng: number) => {
    const coordsArray = coordinatesObjectToArray({ lat, lng });
    let newCoordinates = { type: "Point", coordinates: coordsArray };
    changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, newCoordinates);
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="px-10">
          <section className="mt-10 flex w-full flex-col justify-center gap-8 lg:my-5">
            <GeneralAdvertComponent advertisement={advertisement} onChangeMarker={onChangeMarker} />
          </section>
          <div className="flex flex-col items-center gap-5 xl:flex-row">
            <div className="w-48 lg:w-1/3">
              <Button onClick={checkPossibilites} type="button">
                {t("update_map")}
              </Button>
            </div>
            <div className="w-48 lg:w-1/3">
              <Button type="button" onClick={methods.handleSubmit(nextStep)}>
                {t("next_step")} &#8594;
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default FormInicio;
