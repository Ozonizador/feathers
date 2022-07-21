import { Accordion } from "flowbite-react";
import { useAdvertisement } from "../../context/AdvertisementController";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { updateAdvertisement } from "../../services/advertisementService";
import AboutHouseComponent from "../anuncio/AboutHouseComponent";

/* TODO MISSING LOGIC */

const FormPasso5 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();

  const nextStep = async (e) => {
    e.preventDefault();

    await updateAdvertisement(advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="w-full">
        <div className="mb-28 text-2xl font-bold text-gray-700">Sobre a sua casa</div>
        <AboutHouseComponent />
      </div>
      <button
        type="button"
        className="mt-10 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso5;
