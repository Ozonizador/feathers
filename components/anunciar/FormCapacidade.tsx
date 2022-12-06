import { useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import HouseCapacityComponent from "../anuncio/HouseCapacityComponent";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FormCapacidade = () => {
  const incrementStep = useIncrementStep();
  const advertisement = useAdvertisement();

  /* Form */
  const methods = useForm();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (data) => {
    const { error } = await updateAdvertisement({ ...data }, advertisement.id);
    if (error) return toast.error(error.message);
    incrementStep();
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

export default FormCapacidade;
