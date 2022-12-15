import { useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisement } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import HouseCapacityComponent from "../anuncio/HouseCapacityComponent";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FormCapacidade = () => {
  const incrementStep = useIncrementStep();
  const advertisement = useAdvertisement();
  const setAdvertisement = useSetAdvertisement();

  /* Form */
  const methods = useForm();

  const nextStep = async (data) => {
    setAdvertisement({ ...advertisement, ...data });
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
