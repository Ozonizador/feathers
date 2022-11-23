import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import useAdvertisementService from "../../hooks/advertisementService";
import AboutHouseComponent from "../anuncio/AboutHouseComponent";
import Button from "../utils/Button";

/* TODO MISSING LOGIC */

const FormPasso5 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (e) => {
    e.preventDefault();

    await updateAdvertisement(advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeAdvertisementProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-full lg:w-5/6">
      <div className="w-full">
        <div className="mb-28 text-center text-2xl font-bold text-gray-700 lg:text-left">Sobre a sua casa</div>
        <AboutHouseComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
      </div>
      <Button onClick={nextStep} type="button">
        Seguinte &#8594;
      </Button>
    </section>
  );
};

export default FormPasso5;
