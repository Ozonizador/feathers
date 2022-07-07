import React from "react";
import Input from "../utils/Input";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";

const FormPasso1 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  /* ADVERTISEMENT */
  const advertisement = useAdvertisement();
  const changeAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="my-20 mx-auto grid grid-cols-2 justify-items-center  gap-4">
      <div className="w-3/4">
        <div className="mt-2">
          <label className="block ">Qual o seu tipo de espaço?</label>
          <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3">
            <option>Selecione</option>
            <option>Casa</option>
            <option>Apartamento</option>
          </select>
        </div>
        <div className="my-8">
          <Input
            label="street"
            labelText="Rua"
            value={advertisement.street}
            onChange={(e) => changeAdvertisementProperty("street", e.target.value)}
          />
        </div>
        <Input label="Andar" labelText="Andar" value={advertisement.floor} />

        <div className="mt-1">
          <div className="flex">
            <button
              type="button"
              className="mt-10 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
              onClick={(e) => nextStep(e)}
            >
              Seguinte &#8594;
            </button>
          </div>
        </div>
      </div>

      <div className="w-3/4">
        <Input
          label="Localidade"
          labelText="Localidade"
          customCss="icon"
          value={advertisement.place}
        />
        <div className="my-8">
          <Input label="Número" labelText="Número" value={advertisement.streetNumber} />
        </div>
        <Input label="Código Postal" labelText="Código Postal" value={advertisement.postalCode} />
      </div>
    </section>
  );
};

export default FormPasso1;
