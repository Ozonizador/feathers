import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import PricesComponent from "../anuncio/PricesComponent";
import Button from "../utils/Button";
import React from "react";

const FormPrices = () => {
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    incrementStep();
  };

  const changeTypeProperty = (label: string, value: any) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="mx-auto my-10 w-full px-5 lg:w-5/6 lg:px-0">
      <div className="my-10 text-xl font-bold text-gray-700 lg:text-2xl">Vamos a valores!</div>
      <div className="flex flex-col">
        <PricesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <div className="mt-5 flex gap-5">
        <div className="w-48">
          <Button onClick={decrementStep} type="button">
            Voltar Atrás
          </Button>
        </div>
        <div className="w-48">
          <Button onClick={nextStep} type="button">
            Seguinte &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormPrices;
