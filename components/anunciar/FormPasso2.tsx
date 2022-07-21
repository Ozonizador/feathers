import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import {
  useAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import { useState } from "react";
import { updateAdvertisement } from "../../services/advertisementService";
import AdvertisementInfoComponent from "../anuncio/AdvertisementInfoComponent";

const FormPasso2 = () => {
  const [message, setMessage] = useState("");

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
      setMessage("Campos por preencher.");
      return;
    }

    // proximo passo
    const { data, error } = await updateAdvertisement(advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <AdvertisementInfoComponent advertisement={advertisement} onChange={changeTypeProperty} />

      <button
        type="button"
        className="mt-20 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
      {message && <div className="text-red-600">{message}</div>}
    </section>
  );
};

export default FormPasso2;
