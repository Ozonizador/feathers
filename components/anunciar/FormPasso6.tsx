import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import PricesComponent from "../anuncio/PricesComponent";
import Button from "../utils/Button";

const FormPasso6 = () => {
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

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-full lg:w-5/6">
      <div className="mb-28 text-2xl font-bold text-gray-700">Vamos a valores!</div>
      <div className="flex flex-col">
        <PricesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <Button onClick={nextStep} type="button">
        Seguinte &#8594;
      </Button>
    </section>
  );
};

export default FormPasso6;
