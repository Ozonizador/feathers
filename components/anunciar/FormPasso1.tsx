import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useSetAdvertisementProperty, useAdvertisement } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import HouseCapacityComponent from "../anuncio/HouseCapacityComponent";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";

const FormPasso1 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();

  /* Form */
  const methods = useForm();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (data) => {
    await updateAdvertisement({ ...data }, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <FormProvider {...methods}>
      <section className="w-full px-0 lg:px-40">
        <HouseCapacityComponent advertisement={advertisement} />

        <div className="w-1/2">
          <Button onClick={methods.handleSubmit(nextStep)} type="button">
            Seguinte &#8594;
          </Button>
        </div>
      </section>
    </FormProvider>
  );
};

export default FormPasso1;
