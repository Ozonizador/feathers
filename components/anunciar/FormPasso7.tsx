import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import HostFlexTypeComponent from "../anuncio/HostFlexTypeComponent";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "../utils/Button";

const FormPasso7 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (e) => {
    e.preventDefault();

    const { data, error } = await updateAdvertisement(advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeTypeProperty = (typeFlex, value) => {
    setAdvertisementProperty(typeFlex, value);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="my-28 text-4xl font-bold text-gray-700">
        Azares acontecem e temos de estar preparados. Estabeleça a sua política de cancelamento.
      </div>

      <HostFlexTypeComponent advertisement={advertisement} onChange={changeTypeProperty} />

      <Button onClick={nextStep} type="button">
        Seguinte &#8594;
      </Button>
    </section>
  );
};

export default FormPasso7;
