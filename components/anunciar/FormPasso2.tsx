import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import { useState } from "react";
import { updateAdvertisement } from "../../services/advertisementService";
import AdvertisementInfoComponent from "../anuncio/AdvertisementInfoComponent";
import { toast } from "react-toastify";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const FormPasso2 = () => {
  const supabaseClient = useSupabaseClient();
  // contexts
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();
  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e) => {
    e.preventDefault();

    // confirmar se esta tudo preenchido
    const { title, description } = advertisement;

    if (!title || !description) {
      toast.error("Campos por preencher.");
      return;
    }

    // proximo passo
    const { data, error } = await updateAdvertisement(supabaseClient, advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="mx-auto my-20 w-full lg:container lg:w-5/6">
      <AdvertisementInfoComponent advertisement={advertisement} onChange={changeTypeProperty} />

      <button
        type="button"
        className="mt-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44"
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso2;
