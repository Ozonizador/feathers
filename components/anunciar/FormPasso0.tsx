import React, { useCallback } from "react";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useSetAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import { addAdvertisement } from "../../services/advertisementService";
import GeneralAdvertComponent from "../anuncio/GeneralAdvertComponent";
import { toast } from "react-toastify";
import { getResultsFromSearch } from "../../services/mapService";
import { ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import _ from "lodash";
import { MapCoordinates } from "../../models/utils";

const SEARCH_PROPERTIES = [
  ADVERTISEMENT_PROPERTIES.PLACE,
  ADVERTISEMENT_PROPERTIES.POSTAL_CODE,
  ADVERTISEMENT_PROPERTIES.STREET_NUMBER,
  ADVERTISEMENT_PROPERTIES.STREET,
];
const FormPasso0 = () => {
  /* STEPS */
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
    if (SEARCH_PROPERTIES.includes(property)) {
      // console.log("aaaab");
      //  searchByAddress();
    }
  };

  const checkPossibilites = async (address) => {
    console.log(address);
    const { data, error } = await getResultsFromSearch(address);

    if (!error && data && data.length > 0) {
      const feature = data[0];
      const geometry = feature.geometry as MapCoordinates;
      changeAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GEOM, geometry);
    }
  };

  const searchByAddress = _.debounce(checkPossibilites, 400);

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
