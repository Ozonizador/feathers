import React from "react";
import { useIncrementStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useSetAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import GeneralAdvertComponent from "../anuncio/GeneralAdvertComponent";
import { toast } from "react-toastify";
import { getResultsFromSearch } from "../../hooks/mapService";
import { ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import _ from "lodash";
import { MapCoordinates } from "../../models/utils";
import { coordinatesObjectToArray } from "../../utils/map-services";
import useAdvertisementService from "../../hooks/advertisementService";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../utils/Button";

const FormInicio = () => {
  /* STEPS */
  const incrementStep = useIncrementStep();

  /* ADVERTISEMENT */
  const advertisement = useAdvertisement();
  const changeAdvertisementProperty = useSetAdvertisementProperty();
  const setAdvertisement = useSetAdvertisement();

  /* Services */
  const { addAdvertisement } = useAdvertisementService();

  /* Form */
  const methods = useForm();

  const nextStep = async (data) => {
    const { data: advertisementInfo, error } = await addAdvertisement({ ...advertisement, ...data });
    if (error) return toast.error(error.message);

    setAdvertisement(advertisementInfo);
    incrementStep();
  };

  const checkPossibilites = async () => {
    const { street, place, street_number, postal_code } = advertisement;
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
        <section className="mx-auto flex w-full flex-col justify-center gap-8 lg:my-5 lg:px-32">
          <GeneralAdvertComponent advertisement={advertisement} onChangeMarker={onChangeMarker} />
        </section>
        <div className="mt-1">
          <div className="flex gap-5 lg:px-32">
            <Button onClick={checkPossibilites} type="button">
              Atualizar No Mapa
            </Button>
            <Button type="button" onClick={methods.handleSubmit(nextStep)}>
              Seguinte &#8594;
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default FormInicio;
