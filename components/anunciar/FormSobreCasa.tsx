import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisement } from "../../context/AdvertisementController";
import AdvertisementInfoComponent from "../anuncio/AdvertisementInfoComponent";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";

interface FormSobreCasa {
  title: string;
  max_rooms: number;
  description: string;
  host_lives_property: boolean;
  type_host: "PARTICULAR" | "PROFISSIONAL";
}

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
      max_rooms: advertisement.max_rooms,
      description: advertisement.description,
      host_lives_property: advertisement.host_lives_property,
      type_host: advertisement.type_host || "PARTICULAR",
    },
  });

  const nextStep = async (data) => {
    setAdvertisement({ ...advertisement, ...data });
    incrementStep();
  };

  return (
    <FormProvider {...methods}>
      <section className="mx-auto w-full lg:container lg:w-5/6">
        <AdvertisementInfoComponent advertisement={advertisement} />

        <div className="flex gap-2">
          <div className="w-1/2">
            <Button onClick={(e) => decrementStep()} type="button">
              Voltar Atrás
            </Button>
          </div>
          <div className="w-1/2">
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
