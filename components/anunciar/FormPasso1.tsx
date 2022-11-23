import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useSetAdvertisementProperty, useAdvertisement } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import HouseCapacityComponent from "../anuncio/HouseCapacityComponent";
import Button from "../utils/Button";

const FormPasso1 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (e) => {
    e.preventDefault();

    await updateAdvertisement({ tenant_number: advertisement.tenant_number }, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisementProperty(property, value);
  };

  return (
    <section className="w-full px-0 lg:px-40">
      <div className="flex justify-center">
        <HouseCapacityComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
      </div>

      <div>
        <Button onClick={nextStep} type="button">
          Seguinte &#8594;
        </Button>
      </div>
    </section>
  );
};

export default FormPasso1;
