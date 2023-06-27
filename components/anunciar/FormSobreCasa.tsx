import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisement } from "../../context/AdvertisementController";
import AdvertisementInfoComponent from "../anuncio/AdvertisementInfoComponent";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";

type FormSobreCasa = {
  title: string;
  max_rooms: number;
  description: string;
  host_lives_property: boolean;
  type_host: "PARTICULAR" | "PROFISSIONAL";
};

const FormSobreCasa = () => {
  // contexts
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();
  const advertisement = useAdvertisement();
  const setAdvertisement = useSetAdvertisement();

  /* Form */
  const methods = useForm<FormSobreCasa>({
    defaultValues: {
      title: advertisement.title,
      description: advertisement.description,
      host_lives_property: advertisement.host_lives_property,
      type_host: advertisement.type_host || "PARTICULAR",
    },
  });

  const nextStep = async (data: any) => {
    setAdvertisement({ ...advertisement, ...data });
    incrementStep();
  };

  return (
    <FormProvider {...methods}>
      <section className="mx-auto w-full px-10 lg:container lg:w-5/6">
        <AdvertisementInfoComponent advertisement={advertisement} />

        <div className="mt-1 flex flex-col justify-center gap-5 lg:flex-row lg:px-32">
          <div className="mx-auto w-5/6 lg:w-2/3">
            <Button onClick={decrementStep} type="button">
              Voltar Atrás
            </Button>
          </div>
          <div className="mx-auto w-5/6 lg:w-2/3">
            <Button onClick={methods.handleSubmit(nextStep)} type="button">
              Seguinte &#8594;
            </Button>
          </div>
        </div>
      </section>
    </FormProvider>
  );
};

export default FormSobreCasa;
