import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import { updateAdvertisement } from "../../services/advertisementService";
import HouseRulesComponent from "../anuncio/HouseRulesComponent";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const FormPasso4 = () => {
  const supabaseClient = useSupabaseClient();
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e) => {
    e.preventDefault();

    await updateAdvertisement(supabaseClient, advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-full lg:w-5/6">
      <div className="w-full">
        <div className="mb-28 font-bold text-gray-700 lg:text-2xl">Falemos agora sobre condições e regras da casa</div>

        <HouseRulesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

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

export default FormPasso4;
