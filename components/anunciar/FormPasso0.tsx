import React, { useCallback, useEffect, useState } from "react";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useSetAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import { addAdvertisement } from "../../services/advertisementService";
import GeneralAdvertComponent from "../anuncio/GeneralAdvertComponent";
import { getResultsFromSearch } from "../../services/mapService";
import { toast } from "react-toastify";
import { ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import { MapCoordinates } from "../../models/utils";
import { debounceFn } from "../../utils/utils";

const FormPasso0 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  /* ADVERTISEMENT */
  const advertisement = useAdvertisement();
  const changeAdvertisementProperty = useSetAdvertisementProperty();
  const setAdvertisement = useSetAdvertisement();

  const nextStep = async (e) => {
    e.preventDefault();

    // confirmar se esta tudo preenchido
    const { type, street, place, streetNumber, postalCode } = advertisement;

    if (!type || !street || !place || !streetNumber || !postalCode) {
      toast.error("Campos por preencher.");
      return;
    }

    const { data, error } = await addAdvertisement(advertisement);
    if (data) {
      setAdvertisement(data);
      setCurrentStep(currentStep + 1);
    } else {
      toast.error("An error occured");
    }
  };

  const onChangeProperty = (property, value) => {
    changeAdvertisementProperty(property, value);
    debounceFn(checkPossibilites, 3000);
  };

  const checkPossibilites = () => {
    const street = `${advertisement.street} ${advertisement.place} ${advertisement.streetNumber} ${advertisement.postalCode}`;
    console.log(street);
    getResultsFromSearch(street)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const feature = data[0];
          const geometry = feature.geometry as MapCoordinates;
          console.log(street);
          changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, geometry.coordinates);
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <section className="mx-auto flex w-full flex-col justify-center gap-8 lg:my-5 lg:px-32">
        <GeneralAdvertComponent advertisement={advertisement} onChange={onChangeProperty} />
      </section>
      <div className="mt-1">
        <div className="flex lg:px-32">
          <button
            type="button"
            className="w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44"
            onClick={(e) => nextStep(e)}
          >
            Seguinte &#8594;
          </button>
        </div>
      </div>
    </>
  );
};

export default FormPasso0;
