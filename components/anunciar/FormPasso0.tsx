import React, { useState } from "react";
import Input from "../utils/Input";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useSetAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import { addAdvertisement } from "../../services/advertisementService";
import GeneralAdvertComponent from "../anuncio/GeneralAdvertComponent";

const FormPasso0 = () => {
  const [message, setMessage] = useState("");

  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  /* ADVERTISEMENT */
  const advertisement = useAdvertisement();
  const changeAdvertisementProperty = useSetAdvertisementProperty();
  const setAdvertisement = useSetAdvertisement();

  const nextStep = async (e) => {
    e.preventDefault();

    // confirmar se esta tudo preenchido
    const { type, street, floor, place, streetNumber, postalCode } = advertisement;

    if (!type || !street || !floor || !place || !streetNumber || !postalCode) {
      setMessage("Campos por preencher.");
      return;
    }

    const { data, error } = await addAdvertisement(advertisement);
    if (data) {
      setAdvertisement(data);
    }
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const onChangeProperty = (property, value) => {
    changeAdvertisementProperty(property, value);
  };

  return (
    <>
      <section className="my-20 mx-auto  flex w-3/4 justify-center ">
        <GeneralAdvertComponent advertisement={advertisement} onChange={onChangeProperty} />
      </section>
      <div className="mt-1">
        <div className="flex">
          <button
            type="button"
            className="mt-10 flex items-center rounded-md bg-primary-500 py-4 px-9 text-center uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
            onClick={(e) => nextStep(e)}
          >
            Seguinte &#8594;
          </button>
        </div>
        {message && <div className="text-red-600">{message}</div>}
      </div>
    </>
  );
};

export default FormPasso0;
