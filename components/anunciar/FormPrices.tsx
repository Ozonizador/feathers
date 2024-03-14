import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import PricesComponent from "../anuncio/PricesComponent";
import Button from "../utils/Button";
import { useTranslation } from "next-i18next";
import React from "react";

const FormPrices = () => {
  const { t } = useTranslation();
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
      <div className="my-8 text-xl font-bold text-gray-700 ">{t("advertisements:add_advert.prices_title")}</div>
      <div className="flex flex-col">
        <PricesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <div className="mt-5 flex flex-col items-center gap-5 xl:flex-row">
        <div className="w-32">
          <Button onClick={decrementStep} type="button">
            {t("go_back")}
          </Button>
        </div>
        <div className="w-32">
          <Button onClick={nextStep} type="button">
            {t("next_step")} &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormPrices;
