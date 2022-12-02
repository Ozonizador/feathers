import React from "react";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
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

const FormPasso0 = () => {
  /* STEPS */
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  /* ADVERTISEMENT */
  const advertisement = useAdvertisement();
  const changeAdvertisementProperty = useSetAdvertisementProperty();
  const setAdvertisement = useSetAdvertisement();

  /* Services */
  const { addAdvertisement } = useAdvertisementService();

  /* Form */
  const methods = useForm();

  const nextStep = async (e) => {
    e.preventDefault();

    // confirmar se esta tudo preenchido
    const { type, street, place, street_number, postal_code } = advertisement;

    if (!type || !street || !place || !street_number || !postal_code) {
      toast.error("Campos por preencher.");
      return;
    }

    const { data, error } = await addAdvertisement(advertisement);
    if (!error) {
      setAdvertisement(data);
      setCurrentStep(currentStep + 1);
    } else {
      toast.error(error.message);
    }
  };

  const onChangeProperty = (property: string, value: any) => {
    changeAdvertisementProperty(property, value);
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
          <GeneralAdvertComponent
            advertisement={advertisement}
            onChange={onChangeProperty}
            onChangeMarker={onChangeMarker}
          />
        </section>
        <div className="mt-1">
          <div className="flex gap-5 lg:px-32">
            <Button onClick={checkPossibilites} type="button">
              Atualizar No Mapa
            </Button>
            <Button onClick={methods.handleSubmit(nextStep)} type="button">
              Seguinte &#8594;
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default FormPasso0;
