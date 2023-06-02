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
      <section className="mt-10 w-full px-10 lg:px-40">
        <HouseCapacityComponent advertisement={advertisement} />

        <div className="mt-1 flex flex-col gap-5 lg:flex-row">
          <div className="w-5/6 lg:w-40">
            <Button onClick={(e) => decrementStep()} type="button">
              Voltar Atrás
            </Button>
          </div>
          <div className="w-5/6 lg:w-40">
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
