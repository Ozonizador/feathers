import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisement } from "../../context/AdvertisementController";
import HouseCapacityComponent from "../anuncio/HouseCapacityComponent";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";

const FormCapacidade = () => {
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();
  const advertisement = useAdvertisement();
  const setAdvertisement = useSetAdvertisement();

  /* Form */
  const methods = useForm();

  const nextStep = async (data: any) => {
    setAdvertisement({ ...advertisement, ...data });
    incrementStep();
  };

  return (
    <FormProvider {...methods}>
      <section className="mt-10 w-full lg:px-20">
        <HouseCapacityComponent advertisement={advertisement} />

        <div className="flex flex-row gap-5 lg:flex-row">
          <div className="w-48">
            <Button onClick={decrementStep} type="button">
              Voltar Atrás
            </Button>
          </div>
          <div className="w-48">
            <Button type="button" onClick={methods.handleSubmit(nextStep)}>
              Seguinte &#8594;
            </Button>
          </div>
        </div>
      </section>
    </FormProvider>
  );
};

export default FormCapacidade;
